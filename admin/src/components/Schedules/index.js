import React, { useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { auth, useNotification } from '@strapi/helper-plugin';
import styled from '@emotion/styled';

import { 
  Box, 
  VisuallyHidden, 
  Typography,
  EmptyStateLayout,
  Button,
  Table, 
  Thead, 
  Tr, 
  Th,
  TFooter,
  Loader
} from '@strapi/design-system';

import { Plus } from '@strapi/icons';

import { sortBy } from 'lodash';
import Schedule from './Schedule';
import Modal from './Modal';

import api from '../../api';


const defaultTimetable = {}
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'holiday']

days.forEach( day => {
  defaultTimetable[day] = {
    opened: false,
    automatic: {
      enabled: true,
      settings: {
        start: "09:00",
        end: "19:00",
        duration: "01:00"
      }
    },
    "manual": {
      "enabled": false,
      "settings": []
    }
  }
})


const LoaderContainer = styled(Box)(({ theme }) => `
    display: grid;
    place-items: center;
`)

const Schedules = () => {

  const { formatMessage } = useIntl()
  const toggleNotification = useNotification();

  const [ schedules, setSchedules ] = useState([])
  const [ editInd, setEditInd ] = useState(null)
  const [loading, setLoading] = useState(true)

  const getSchedules = async () => {
    const { data } = await api.getSchedules()
    setSchedules( sortBy(data, ['order']) )
    setLoading(false)
  }
  
  const handleOrdering = async (droppedItem) => {

    // ignore drop outside droppable container
    if (!droppedItem.destination) return

    let updatedSchedules = [...schedules]

    const [reorderedItem] = updatedSchedules.splice(droppedItem.source.index, 1)

    updatedSchedules.splice(droppedItem.destination.index, 0, reorderedItem)
    
    updatedSchedules = updatedSchedules.map( (el, ind ) => {
      el.order = ind
      return el
    })
    
    setSchedules(updatedSchedules)

    const { data } = await api.updateSchedules(updatedSchedules)
    
    if (data.length !== updatedSchedules.length) {
      toggleNotification({
        type: 'warning',
        message: formatMessage({
          id: 'strapi-reservations.settings.error.order',
          defaultMessage: 'Sorry, we encountered an error while trying to order a schedules. Please refresh the page and try again.'
        })
      })
    }
  };

  const handleDelete = async ( id ) => {
    const { data } = await api.deleteSchedule(id)
    if (data.id) {
      setSchedules( schedule =>  schedules.filter( schedule => schedule.id === data.id ? false : true ))
      setEditInd(null)
    } else {
      toggleNotification({
        type: 'warning',
        message: formatMessage({
          id: 'strapi-reservations.settings.error.delete',
          defaultMessage: 'Sorry, we encountered an error while trying to delete a schedule. Please refresh the page and try again.'
        })
      })
    }
  }

  const handleCreate = ( data ) => {
    setSchedules(schedules => [...schedules, data])
  }

  const handleUpdate = ( id, data ) => {
    setSchedules(schedules => schedules.map( schedule => schedule.id === id ? data : schedule ))
  }
  
  const handleSave = async ( scheduleData ) => {
    const user = auth.getUserInfo()
    
    if (scheduleData.id) {
      // update
      const { data } = await api.updateSchedule({
        updated_by_id: user.id,
        ...scheduleData,
      })
      if (data.id) {
        handleUpdate(data.id, data)
        return data.id
      }
    } else {
      // create new
      const { data } = await api.createSchedule({
        created_by_id: user.id,
        updated_by_id: user.id,
        ...scheduleData,
      })
      if (data.id) {
        handleCreate(data)
        return data.id
      }
    }
  }
  
  useEffect(() => {
   getSchedules()
  }, [])

  if (loading) {
    return (
      <LoaderContainer>
        <Loader>Loading content...</Loader>
      </LoaderContainer>
    )
  }

  return (
    <>
      {
        (schedules.length === 0) ?
        <Box padding={8} background="neutral100">
          <EmptyStateLayout
            icon={''}
            content={formatMessage({
              id: 'strapi-reservations.settings.schedules.emptySchedules.content',
              defaultMessage: `You don't have any schedules defined yet.`
            })}
            action={
              <Button variant="secondary" startIcon={<Plus />} onClick={() => setEditInd(schedules.length)}>
                <FormattedMessage
                  id={'strapi-reservations.settings.schedules.emptySchedules.button'}
                  defaultMessage={'Create first schedule'}
                />
              </Button>
            } 
          />
        </Box>
          :
          <Box padding={8} background="neutral100">
          <Table 
            style={{tableLayout: 'fixed'}} 
            colCount={4} rowCount={schedules.length + 1} 
            footer={
              <TFooter onClick={() => setEditInd(schedules.length)} icon={<Plus />}>
                <FormattedMessage
                  id='strapi-reservatiions.settings.schedules.addNew'
                  defaultMessage={'Add a new schedule'}
                />
              </TFooter>
            }>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">
                    <FormattedMessage id={'strapi-reservations.settings.schedules.table.header.label'} defaultMessage={'Label'} />
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    <FormattedMessage id={'strapi-reservations.settings.schedules.table.header.starDate'} defaultMessage={'Start Date'} />
                  </Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">
                    <FormattedMessage id={'strapi-reservations.settings.schedules.table.header.endDate'} defaultMessage={'End Date'} />
                  </Typography>
                </Th>
                <Th>
                  <VisuallyHidden>
                    <FormattedMessage id={'strapi-reservations.settings.schedules.table.header.actions'} defaultMessage={'Actions'} />
                  </VisuallyHidden>
                </Th>
              </Tr>
            </Thead>
            <DragDropContext 
              onDragEnd={handleOrdering}
            >
              <Droppable droppableId={'schedules-droppable'}>
                {( provided ) => (
                  <tbody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {schedules.map((schedule, index) => (
                      <Schedule
                        key={schedule.id}
                        index={index}
                        data={schedule}
                        onClickDelete={() => handleDelete(schedule.id)}
                        onClickEdit={() => setEditInd( index )}
                      />
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </DragDropContext>
          </Table>
        </Box>
      }

      { editInd !== null && 
        <Modal 
          create={schedules.length === editInd}
          data={schedules.length === editInd ? {
            label: '',
            start: undefined,
            end: undefined,
            yearless: false,
            timetable: {...defaultTimetable},
            order: schedules.length
          } : schedules[editInd]}
          onCloseModal={() => setEditInd(null)}
          onSaveModal={handleSave}
          title={schedules.length === editInd ? formatMessage({
            id: 'strapi-reservations.settings.schedules.modal.title.new',
            defaultMessage: 'Add new schedule'
          }) : formatMessage({
            id: 'strapi-reservations.settings.schedules.modal.title.edit',
            defaultMessage: 'Edit schedule'
          })}
        />
      }
    </>
    

      

    
  );
};

export default Schedules;

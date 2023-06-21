/* eslint-disable import/no-cycle */
import React, {useState} from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import {
  Button,
  Flex,
  TimePicker,
  EmptyStateLayout,
  Box,
  Tag
} from '@strapi/design-system';

import Plus from '@strapi/icons/Plus';
import Cross from '@strapi/icons/Cross';
import EmptyDocuments from '@strapi/icons/EmptyDocuments';

const ManualSlots = ({
  handleChange,
  data,
  day
}) => {

  const { formatMessage } = useIntl()

  const [time, setTime] = useState(undefined)

  const handleCreateSlot = () => {
    if ( time && data.indexOf(time) === -1) {
      const updatedSlots = [...data, time]
      handleChange(`timetable.${day}.manual.settings`, updatedSlots)
      setTime(undefined)
    }
  }
  
  const handleDeleteSlot = (time) => {
    const updatedSlots = [...data]
    updatedSlots.splice(updatedSlots.indexOf(time), 1)
    handleChange(`timetable.${day}.manual.settings`, updatedSlots)
  }

  return (
    <Box marginTop={6}>  
      
      <Box marginTop={6} marginBottom={6}>
        { data.length === 0 ?
          <EmptyStateLayout 
            background="neutral100" 
            content={formatMessage({
              id: 'strapi-reservations.settings.schedule.modal.timetable.manualMode.emptySlots',
              defaultMessage: `You don't have any slots yet ...`
            })}
            icon={<EmptyDocuments style={{width: 'auto'}} />}
          /> : 
          <Flex gap={3}>
            {data.map( time => <Tag onClick={() => handleDeleteSlot(time)} key={time} icon={<Cross aria-hidden />}>{time}</Tag>)}
          </Flex>
        }
      </Box>

      <Flex gap={4} alignItems={'flex-end'}>
        <TimePicker
          style={{flexGrow: 1}} 
          label={formatMessage({
            id: 'strapi-reservations.settings.schedule.modal.timetable.manualMode.timeInputLabel',
            defaultMessage: 'Time'
          })} 
          id="manualTimeSlots.time" 
          onChange={setTime} 
          value={time} 
          step={15}
        />
        <Button endIcon={<Plus />} size="L" onClick={handleCreateSlot}> 
          <FormattedMessage 
            id={'strapi-reservations.settings.schedule.modal.timetable.manualMode.addButton'}
            defaultMessage={'Add'}
          />
        </Button>
      </Flex>
    </Box>
  );
};

export default ManualSlots;

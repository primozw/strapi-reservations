/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import {
  Box,
  Grid,
  GridItem,
  DatePicker,
  TextInput,
  ModalLayout, 
  ModalBody, 
  ModalHeader,
  ModalFooter,
  Typography,
  Button,
  ToggleInput
} from '@strapi/design-system';
import { useNotification } from '@strapi/helper-plugin';

import { set } from 'lodash';

import dayjs from 'dayjs';
import Timetable from './Timetable';

const Modal = ({
  data,
  title,
  create,
  onCloseModal,
  onSaveModal,
}) => {

  const { formatMessage } = useIntl()
  const toggleNotification = useNotification();

  const [ updatedData, setUpdatedData ] = useState({...data})
  const [ errors, setErrors ] = useState({required: [], validated: true})
  const [ saving, setSaving] = useState(false)
  

  const requiredFieldMsg = formatMessage({
    id: 'strapi-reservations.settings.schedule.modal.error.required',
    defaultMessage: 'Required field'
  })
  const formatFieldMsg = formatMessage({
    id: 'strapi-reservations.settings.schedule.modal.error.format',
    defaultMessage: 'The starting date has to be before ending date'
  })

  const validateData = ( data ) => {
    const required = []
    let validated = true

    if (!data.label) required.push('label')
    if (!data.start) required.push('start')
    if (!data.end) required.push('end')

    if (data.start && data.end) {
      validated = dayjs(data.start).isBefore(data.end, 'day')
    }
    setErrors({
      required,
      validated
    })
    return required.length === 0 && validated
  }

  const checkError = ( key, data ) => {
    let validated
    if (!data[key]) {
      setErrors(errors => ({
        ...errors,
        required: [...errors.required, key],
      }))
      return false
    } else {
      if ((key === 'start' && data.end) || ( key === 'end' && data.start)){
        validated = dayjs(data.start).isBefore(data.end, 'day')
      } else {
        validated = true
      }
      setErrors(errors => ({
        required: [...errors.required.filter(n => n !== key)],
        validated
      }))
      return true
    }

  }
  
  const handleChange = (key, value) => {
    const _update = {...updatedData};
    set(_update, key, value);
    setUpdatedData(_update);
    return _update
  }
  
  const handleFieldChange = (key, value) => {
    const _update = handleChange(key, value)
    checkError(key, _update)
  }

  const handleSave = async () => {
    //validation
    const validated = validateData(updatedData)
    if ( validated ){
      const id = await onSaveModal(updatedData)
      if ( id ) {
        onCloseModal()
      } else {
        toggleNotification({
          type: 'warning',
          message: formatMessage({
            id: 'strapi-reservations.settings.error.creating',
            defaultMessage: 'Sorry, we encountered an error while trying to create/update a schedule. Please refresh the page and try again.'
          })
        })
      }
    }
  }

  return (
    <ModalLayout 
      onClose={onCloseModal} 
      labelledBy={formatMessage({
        id: 'strapi-reservations.settings.schedule.modal.title',
        defaultMessage: 'Add new schedule'
      })}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2">{title}</Typography>
      </ModalHeader>
      <ModalBody>
        <Box>
          <Grid gap={7}>
            <GridItem col={6} xs={12} s={6}>
              <TextInput
                required={true}
                placeholder={formatMessage({
                  id: 'strapi-reservations.settings.schedule.modal.label.placeholder',
                  defaultMessage: 'Select a name for a schedule'
                })}
                label={formatMessage({
                  id: 'strapi-reservations.settings.schedule.modal.label.label',
                  defaultMessage: 'Label'
                })}
                name={`modal-schedule-label`} 
                error={errors.required.indexOf('label') === -1 ? false : requiredFieldMsg} 
                onChange={e => handleFieldChange('label', e.target.value)} 
                value={updatedData.label} 
              />
            </GridItem>
            <GridItem col={6} xs={12} s={6}>
              <ToggleInput 
                label={formatMessage({
                  id: `strapi-reservations.settings.schedule.modal.yearless.label`,
                  defaultMessage: `Yearless`
                })} 
                name="slotsMode" 
                onLabel={formatMessage({
                  id: `strapi-reservations.settings.schedule.modal.yearless.on`,
                  defaultMessage: `On`
                })}
                offLabel={formatMessage({
                  id: `strapi-reservations.settings.schedule.modal.yearless.off`,
                  defaultMessage: `Off`
                })}
                hint={formatMessage({
                  id: `strapi-reservations.settings.schedule.modal.yearless.hint`,
                  defaultMessage: `Schedule will be available for all years, regardless of selected years in start and end date.`
                })}
                checked={updatedData.yearless} 
                onChange={(e) => handleFieldChange('yearless', e.target.checked)} 

              />
            </GridItem>
          </Grid>
          <Grid gap={7} marginBottom={4} marginTop={4}>
            <GridItem col={6} xs={12} s={6}>
              <DatePicker
                required={true}
                onChange={(e) => handleFieldChange('start', dayjs(e).format('YYYY-MM-DD'))} 
                selectedDate={updatedData.start ? dayjs(updatedData.start).toDate() : undefined} 
                label={formatMessage({
                  id: 'strapi-reservations.settings.schedule.modal.start.label',
                  defaultMessage: 'Start Date'
                })}  
                name={`modal-schedule-starting-date`} 
                clearLabel={formatMessage({
                  id: 'strapi-reservations.settings.schedule.modal.clearDate',
                  defaultMessage: 'Clear the date'
                })} 
                onClear={() => handleFieldChange('start', undefined)} 
                selectedDateLabel={formattedDate => `Current starting date is ${formattedDate}`}
                error={errors.required.indexOf('start') === -1 ? 
                  errors.validated ? null : formatFieldMsg
                 : requiredFieldMsg} 
              />
            </GridItem>
            <GridItem col={6} xs={12} s={6}>
              <DatePicker
                required={true}
                onChange={(e) => handleFieldChange('end', dayjs(e).format('YYYY-MM-DD'))} 
                selectedDate={updatedData.end ? dayjs(updatedData.end).toDate() : undefined} 
                label={formatMessage({
                  id: 'strapi-reservations.settings.schedule.modal.end.label',
                  defaultMessage: 'End Date'
                })}  
                name={`modal-schedule-ending-date`} 
                clearLabel={formatMessage({
                  id: 'strapi-reservations.settings.schedule.modal.clearDate',
                  defaultMessage: 'Clear the date'
                })} 
                onClear={() => handleFieldChange('end', undefined)} 
                selectedDateLabel={formattedDate => `Current ending date is ${formattedDate}`}
                error={errors.required.indexOf('end') === -1 ? 
                  errors.validated ? null : formatFieldMsg
                 : requiredFieldMsg} 
              />
            </GridItem>
          </Grid>
        </Box>
        <Timetable handleChange={handleChange} timetable={updatedData.timetable} />
      </ModalBody>
      <ModalFooter 
        startActions={
          <Button onClick={() => onCloseModal()} variant="tertiary">
            <FormattedMessage 
              id={'strapi-reservations.settings.schedule.modal.cancelBtn'}
              defaultMessage={'Cancel'}
            />
          </Button>
        } 
        endActions={
          <Button 
            variant="secondary" 
            onClick={handleSave}
            loading={saving}
          >
            {create ? 
              <FormattedMessage 
                id={'strapi-reservations.settings.schedule.modal.addBtn'}
                defaultMessage={'Add schedule'}
              />
            :
              <FormattedMessage 
                id={'strapi-reservations.settings.schedule.modal.confirmBtn'}
                defaultMessage={'Save'}
              />
            }
          </Button>
        } 
      />
    </ModalLayout>


    
  );
};

export default Modal;

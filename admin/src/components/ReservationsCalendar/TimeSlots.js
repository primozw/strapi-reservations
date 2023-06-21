import React from 'react';
import PropTypes from 'prop-types';

import { 
  Button, 
  Flex,
} from '@strapi/design-system';

/**
 * Return new date object with the given time
 * @param {object} date dayjs object
 * @param {string} time time in format HH:mm, eg. 18:00
 * @returns dayjs object
 */
const setTime = ( date, time) => {
  const [hour, minute] = time.split(':');
  return date.hour(parseInt(hour)).minute(parseInt(minute))
}

const TimeSlots = ({ 
  slotsData, 
  selectedDate, 
  selectedTerm,
  savedDate,
  onClick
}) => {

  if (!slotsData || slotsData.length === 0) {
    return null
  }

  const slots = slotsData.map( slot => {
    const term = setTime(selectedDate, slot.time)
    const isSameAsSelectedTerm = selectedTerm && term.format() === selectedTerm.format()
    const isSameAsSaved = savedDate && savedDate.format() === term.format()
    
    // disabled if already taken but not from this reservation
    const disabled = !slot.available && !isSameAsSaved 
    const variant = isSameAsSelectedTerm ? 'default' : 'secondary'

    return (
      <Button 
        disabled={disabled}
        size={'L'}
        onClick={() => onClick(term)}
        variant={variant}
      >
        {slot.time}
      </Button>
    )
  })

  return (
    <Flex 
      wrap={'wrap'}
      gap={3}
    >
      {slots}
    </Flex>
  )

}
export default TimeSlots
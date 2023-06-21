import React from 'react';
import PropTypes from 'prop-types';

import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';

import { useTheme } from '@strapi/design-system'


function CalendarDay(props) {
  const { 
    disabledDays = [],
    reservedDays = [],
    day, 
    outsideCurrentMonth, 
    ...other } = props;

  const isReserved =
    !props.outsideCurrentMonth && reservedDays.indexOf(props.day.date())  !== -1;

  const isDisabled =
    !props.outsideCurrentMonth && disabledDays.indexOf(props.day.date()) !== -1;

  const theme = useTheme()
  
  return (
    <Badge
      key={props.day.toString()}
      variant="dot" 
      invisible={!isReserved}
      overlap="circular"
      color="secondary"
      sx = {{
        '& .MuiBadge-dot': {
          backgroundColor: theme.colors.buttonPrimary500
        }
      }}
    >
      <PickersDay 
        {...other} 
        outsideCurrentMonth={outsideCurrentMonth} 
        day={day} 
        disabled={isDisabled}
        sx={{
          '&.Mui-selected': {
            backgroundColor: `${theme.colors.buttonPrimary600} !important`
          },
          '&.Mui-selected:hover': {
            backgroundColor:  `${theme.colors.buttonPrimary500} !important`
          }
        }}
      />
    </Badge>
  );
}

CalendarDay.propTypes = {
  /**
   * The date to show.
   */
  day: PropTypes.object.isRequired,
  disabledDays: PropTypes.arrayOf(PropTypes.number),
  reservedDays: PropTypes.arrayOf(PropTypes.number),
  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: PropTypes.bool.isRequired,
};

export default CalendarDay
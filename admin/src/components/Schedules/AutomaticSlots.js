/* eslint-disable import/no-cycle */
import React from 'react';
import { useIntl } from 'react-intl';
import {
  GridItem,
  Grid,
  TimePicker
} from '@strapi/design-system';

const AutomaticSlots = ({
  handleChange,
  data,
  day
}) => {

  const { formatMessage } = useIntl()

  return (
    <Grid gap={6} marginBottom={4} marginTop={6}>
      <GridItem col={6} xs={12} s={6}>
        <TimePicker 
          label={formatMessage({
            id: 'strapi-reservations.settings.schedule.modal.timetable.automaticMode.start',
            defaultMessage: 'Opening time'
          })} 
          id="automaticTimeSlots.start" 
          onChange={(value) => handleChange(`timetable.${day}.automatic.settings.start`, value)} 
          value={data.start} 
          step={60}
        />
      </GridItem>
      <GridItem col={6} xs={12} s={6}>
        <TimePicker 
          label={formatMessage({
            id: 'strapi-reservations.settings.schedule.modal.timetable.automaticMode.end',
            defaultMessage: 'Closing time'
          })} 
          id="automaticTimeSlots.end" 
          onChange={(value) => handleChange(`timetable.${day}.automatic.settings.end`, value)} 
          value={data.end} 
          step={60}
        />
      </GridItem>
      <GridItem col={6} xs={12} s={6}>
        <TimePicker 
          label={formatMessage({
            id: 'strapi-reservations.settings.schedule.modal.timetable.automaticMode.duration',
            defaultMessage: 'Duration'
          })} 
          id="automaticTimeSlots.duration" 
          onChange={(value) => handleChange(`timetable.${day}.automatic.settings.duration`, value)} 
          value={data.duration} 
          step={60}
        />
      </GridItem>
    </Grid>
  );
};

export default AutomaticSlots;

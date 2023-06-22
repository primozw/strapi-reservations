// admin/src/pages/Settings/index.js
import React, { useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { 
  Box,
  Typography,
  Grid,
  GridItem,
  ToggleInput,
  TimePicker,
  NumberInput
} from '@strapi/design-system';

import ColorPickerInput from './../../components/ColorPickerInput'



const CalendarSettings = ({settings, handleSettings}) => {

  const { formatMessage } = useIntl();

  return (
    <Box marginBottom={8} marginTop={8}>
      <Typography
        as={'h2'}
        variant={'beta'}
      >
        <FormattedMessage 
          id={'strapi-reservations.settings.calendar.title'}
          defaultMessage={'Calendar Settings'}
        />
      </Typography>

      <Grid gap={7} marginBottom={4} marginTop={4}>
        <GridItem col={4} xs={12} s={6}>
          <ToggleInput 
            label={formatMessage({
              id: `strapi-reservations.settings.calendar.dayView.label`,
              defaultMessage: `Day View`
            })}
            name="calendar-day-view" 
            onLabel={formatMessage({
              id: `strapi-reservations.settings.calendar.dayView.on`,
              defaultMessage: `On`
            })}
            offLabel={formatMessage({
              id: `strapi-reservations.settings.calendar.dayView.off`,
              defaultMessage: `Off`
            })}
            checked={settings.dayView} 
            onChange={e => handleSettings({prop: 'dayView', value: e.target.checked})} 
          />
        </GridItem>
        <GridItem col={4} xs={12} s={6}>
          <ToggleInput 
            label={formatMessage({
              id: `strapi-reservations.settings.calendar.weekView.label`,
              defaultMessage: `Week View`
            })}
            name="calendar-week-view" 
            onLabel={formatMessage({
              id: `strapi-reservations.settings.calendar.weekView.on`,
              defaultMessage: `On`
            })}
            offLabel={formatMessage({
              id: `strapi-reservations.settings.calendar.weekView.off`,
              defaultMessage: `Off`
            })}
            checked={settings.weekView} 
            onChange={e => handleSettings({prop: 'weekView', value: e.target.checked})} 
          />
        </GridItem>
        <GridItem col={4} xs={12} s={6}>
          <ToggleInput 
            label={formatMessage({
              id: `strapi-reservations.settings.calendar.monthView.label`,
              defaultMessage: `Month View`
            })}
            name="calendar-month-view" 
            onLabel={formatMessage({
              id: `strapi-reservations.settings.calendar.monthView.on`,
              defaultMessage: `On`
            })}
            offLabel={formatMessage({
              id: `strapi-reservations.settings.calendar.monthView.off`,
              defaultMessage: `Off`
            })}
            checked={settings.monthView} 
            onChange={e => handleSettings({prop: 'monthView', value: e.target.checked})} 
          />
        </GridItem>
      </Grid>
      <Grid gap={7} marginBottom={4} marginTop={4}>
        <GridItem col={4} xs={12} s={6}>
          <TimePicker 
            label={formatMessage({
              id: 'strapi-reservations.settings.calendar.startHour',
              defaultMessage: 'Start Hour'
            })} 
            onChange={(value) => handleSettings({prop: 'startHour', value})} 
            value={settings.startHour} 
            step={15}
          />   
        </GridItem>
        <GridItem col={4} xs={12} s={6}>
          <TimePicker 
            label={formatMessage({
              id: 'strapi-reservations.settings.calendar.endHour',
              defaultMessage: 'End Hour'
            })} 
            onChange={(value) => handleSettings({prop: 'endHour', value})} 
            value={settings.endHour} 
            step={15}
          />   
        </GridItem>
        <GridItem col={4} xs={12} s={6}>
          <NumberInput 
            label={formatMessage({
              id: 'strapi-reservations.settings.calendar.cellDuration',
              defaultMessage: 'Cell Duration'
            })}
            name={'strapi-reservations.settings.calendar.cellDuration'}
            onValueChange={(value) => handleSettings({prop: 'cellDuration', value})} 
            value={settings.cellDuration} 
            step={15}
          />   
        </GridItem>
      </Grid>

      <Grid gap={7} marginBottom={4} marginTop={4}>
        <GridItem col={4} xs={12} s={6}>
          <ColorPickerInput
            intlLabel={{ id: 'strapi-reservations.settings.colors.draftColor.label', defaultMessage: 'Draft Color' }}
            onChange= {(e) => handleSettings({prop: 'draftColor', value: e.target.value})}
            name={'settings.colors.draftColor.label'}
            value={settings.draftColor}
          />
        </GridItem>
        <GridItem col={4} xs={12} s={6}>
        <ColorPickerInput
              intlLabel={{ id: 'strapi-reservations.settings.colors.confirmedColor.label', defaultMessage: 'Confirmed Color' }}
              onChange= {(e) => handleSettings({prop: 'confirmedColor', value: e.target.value})}
              name={'settings.colors.confirmedColor.label'}
              value={settings.confirmedColor}
          />
        </GridItem>
      </Grid>



    </Box>
  );
};

export default CalendarSettings;
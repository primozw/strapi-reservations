// admin/src/pages/Settings/index.js
import React, { useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import styled from '@emotion/styled'

import { 
  Box,
  Typography,
  Grid,
  GridItem,
  ToggleInput
} from '@strapi/design-system';

import { 
  MultiSelect, 
  MultiSelectOption,
  SingleSelect,
  SingleSelectOption,
} from '@strapi/design-system/Select';

const Holidays = require('date-holidays')
const hd = new Holidays()

const HolidaysSettings = ({settings, handleSettings}) => {

  const { holidayLocalize, holidayTypes, enableHoliday } = settings

  const { formatMessage } = useIntl();
  const countries = hd.getCountries()

  const [states, setStates] = useState()
  const [regions, setRegions] = useState()

  const countryHandler = ( countryCode ) => {
    handleSettings({prop: 'holidayLocalize', value: {
      country: countryCode,
      state: null,
      region: null
    } })
    setStates(hd.getStates(countryCode))
    setRegions(null)
  }
  
  const stateHandler = ( stateCode ) => {
    handleSettings({prop: 'holidayLocalize', value: {
      ...holidayLocalize,
      state: stateCode,
      region: null,
    } })
    setRegions(hd.getRegions(holidayLocalize.country, stateCode))
  }

  const regionHandler = ( regionCode ) => {
    handleSettings({prop: 'holidayLocalize', value: {
      ...holidayLocalize,
      region: regionCode
    } })
  }

  useEffect(() => {
    if (holidayLocalize.country) {
      setStates(hd.getStates(holidayLocalize.country))
    }
    if (holidayLocalize.state) {
      setRegions(hd.getRegions(holidayLocalize.country, holidayLocalize.state))
    }
  }, [])

  return (
    <Box marginBottom={8} marginTop={8}>
      <Typography
        as={'h2'}
        variant={'beta'}
      >
        <FormattedMessage 
          id={'strapi-reservations.settings.holidays.title'}
          defaultMessage={'Holiday Settings'}
        />
      </Typography>

      <Grid gap={7} marginBottom={4} marginTop={4}>
        <GridItem col={4} xs={12} s={6}>
          <ToggleInput 
            label={formatMessage({
              id: `strapi-reservations.settings.holidays.enable.label`,
              defaultMessage: `Turn on holidays`
            })}
            hint={formatMessage({
              id: `strapi-reservations.settings.holidays.enable.hint`,
              defaultMessage: `Holiday schedules will have precedence over daily schedules.`
            })}
            name="enableHoliday" 
            onLabel={formatMessage({
              id: `strapi-reservations.settings.holidays.enable.on`,
              defaultMessage: `On`
            })}
            offLabel={formatMessage({
              id: `strapi-reservations.settings.holidays.enable.off`,
              defaultMessage: `Off`
            })}
            checked={enableHoliday} 
            onChange={e => handleSettings({prop: 'enableHoliday', value: e.target.checked})} 
          />
        </GridItem>
      </Grid>

      <Grid gap={7} marginBottom={4} marginTop={4}>
        <GridItem col={4} xs={12} s={6}>
          {/*  Country */}
          <SingleSelect 
            label={formatMessage({id: 'strapi-reservations.settings.holidays.country.label', defaultMessage: 'Country'})}
            placeholder={formatMessage({id: 'strapi-reservations.settings.holidays.country.placeholder', defaultMessage: 'Select a country ...'})}
            onClear={ () => countryHandler(null)}  
            onChange={ countryHandler }
            value={holidayLocalize.country}
          >
            {Object.keys(countries).sort().map(countryCode => (
              <SingleSelectOption key={countryCode} value={countryCode}>{countries[countryCode]}</SingleSelectOption>
            ))}
          </SingleSelect>
        </GridItem>
        <GridItem col={4} xs={12} s={6}>
          {/* State */}
          {states && <SingleSelect 
            label={formatMessage({id: 'strapi-reservations.settings.holidays.state.label', defaultMessage: 'State'})}
            placeholder={formatMessage({id: 'strapi-reservations.settings.holidays.state.placeholder', defaultMessage: 'Select a state ...'})}
            onClear={ () => stateHandler(null)}  
            onChange={ stateHandler }
            value={holidayLocalize.state}
          >
            {Object.keys(states).sort().map(stateCode => (
              <SingleSelectOption key={stateCode} value={stateCode}>{states[stateCode]}</SingleSelectOption>
            ))}
          </SingleSelect>}
        </GridItem>
        <GridItem col={4} xs={12} s={6}>
          {/* Region */}
          {regions && <SingleSelect 
            label={formatMessage({id: 'strapi-reservations.settings.holidays.region.label', defaultMessage: 'Region'})}
            placeholder={formatMessage({id: 'strapi-reservations.settings.holidays.region.placeholder', defaultMessage: 'Select a region ...'})}
            onClear={ () => regionHandler(null)}  
            onChange={ regionHandler }
            value={holidayLocalize.region}
          >
            {Object.keys(regions).sort().map(regionCode => (
              <SingleSelectOption key={regionCode} value={regionCode}>{regions[regionCode]}</SingleSelectOption>
            ))}
          </SingleSelect>}  
        </GridItem>
      </Grid>

      <Grid gap={7} marginBottom={4} marginTop={4}>
        <GridItem col={4} xs={12} s={6}>
          <MultiSelect 
          label={formatMessage({id: 'strapi-reservations.settings.holidays.types.label', defaultMessage: 'Types of holidays'})}
          placeholder={formatMessage({id: 'strapi-reservations.settings.holidays.types.placeholder', defaultMessage: 'Select types of holidays ...'})}
          value={holidayTypes} 
          onChange={ value => handleSettings({prop: 'holidayTypes', value: value })}
          onClear={ value => handleSettings({prop: 'holidayTypes', value: undefined })}  
          withTags
        >
            <MultiSelectOption value="public">Public</MultiSelectOption>
            <MultiSelectOption value="bank">Bank</MultiSelectOption>
            <MultiSelectOption value="school">School</MultiSelectOption>
            <MultiSelectOption value="optional">Optional</MultiSelectOption>
            <MultiSelectOption value="observance">Observance</MultiSelectOption>
          </MultiSelect>
        </GridItem>
      </Grid>


    </Box>
  );
};

export default HolidaysSettings;
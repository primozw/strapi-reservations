/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useIntl, FormattedMessage } from 'react-intl';
import {
  Box,
  Typography,
  Accordion, 
  AccordionToggle, 
  AccordionContent, 
  AccordionGroup,
  Switch,
  ToggleInput
} from '@strapi/design-system';

import AutomaticSlots from './AutomaticSlots';
import ManualSlots from './ManualSlots';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'holiday']

const AccordionContainer = styled('div')(({ theme }) => `
    
`)
const SwitchContainer = styled('div')(({ theme }) => `
    & button > div {
      flex-direction: row-reverse;
      gap: 0.75rem;
      font-size: 0.85rem;
    }
`)


const Timetable = ({
  timetable,
  handleChange
}) => {

  const { formatMessage } = useIntl()
  const [ expanded, setExpanded ] = useState(false)


  const handleToggle = ( day ) => {
    if (timetable[day].opened) {
      setExpanded(day)
    }
  }

  const handleSwitchChange = ( day ) => {
    if (!timetable[day].opened) {
      setExpanded(day)
    } else if ( expanded === day){
      setExpanded(false)
    }
    handleChange(`timetable.${day}.opened`, !timetable[day].opened)
  }

  const handleTimeSlotsMode = (day, automaticMode ) => {
    if (automaticMode){
      handleChange(`timetable.${day}.automatic.enabled`, true)
      handleChange(`timetable.${day}.manual.enabled`, false)
    } else {
      handleChange(`timetable.${day}.automatic.enabled`, false)
      handleChange(`timetable.${day}.manual.enabled`, true)
    }
  }

  return (
    <Box marginBottom={4} marginTop={8}>
      <Box marginBottom={4}>
        <Typography
            as={'h2'}
            variant={'delta'}
          >
            <FormattedMessage
              id={'strapi-reservations.settings.schedules.modal.timetable.title'}
              defaultMessage={'Timetable'}
            />
        </Typography>
      </Box>

      <AccordionGroup>
        {days.map(( day, i ) => {

          let timeSlotsMode = null

          if (timetable[day].automatic.enabled) {
            timeSlotsMode = true
          } else if (timetable[day].manual.enabled) {
            timeSlotsMode = false
          }


          return (
            <AccordionContainer key={day}>
              <Accordion
                expanded={expanded === day}
                onToggle={() => handleToggle(day)}
                id={day}
                size="S"
                variant="secondary"
              >
                
                  <AccordionToggle
                    style={{textTransform: 'uppercase'}}
                    title={formatMessage({
                      id: `strapi-reservations.settings.schedule.modal.timetable.days.${day}`,
                      defaultMessage: `${day}`
                    })}
                    togglePosition="left"
                    action={
                      <SwitchContainer>
                        <Switch
                          label="Activate the microphone"
                          selected={timetable[day].opened}
                          onChange={() => handleSwitchChange(day)}
                          visibleLabels
                          onLabel={formatMessage({
                            id: `strapi-reservations.settings.schedule.modal.timetable.days.toggleBtn.on`,
                            defaultMessage: `Opened`
                          })}
                          offLabel={formatMessage({
                            id: `strapi-reservations.settings.schedule.modal.timetable.days.toggleBtn.off`,
                            defaultMessage: `Closed`
                          })}
                        />
                      </SwitchContainer>
                    }
                  />
                
                <AccordionContent>
                    <Box padding={6}>
                      <ToggleInput 
                        label={formatMessage({
                          id: `strapi-reservations.settings.schedule.modal.timetable.days.toggleBtn.slotsMode`,
                          defaultMessage: `Time slots creation`
                        })} 
                        name="slotsMode" 
                        onLabel={formatMessage({
                          id: `strapi-reservations.settings.schedule.modal.timetable.days.toggleBtn.slotsMode.automatic`,
                          defaultMessage: `Automatic`
                        })}
                        offLabel={formatMessage({
                          id: `strapi-reservations.settings.schedule.modal.timetable.days.toggleBtn.slotsMode.manual`,
                          defaultMessage: `Manual`
                        })}
                        checked={timeSlotsMode} 
                        onChange={e => handleTimeSlotsMode(day, e.target.checked)} 
                      />
                    
                      
                      {/* Automatic slots creation */}
                      {timetable[day].automatic.enabled && 
                        <AutomaticSlots data={timetable[day].automatic.settings} handleChange={handleChange} day={day} />
                      }

                      {/* Automatic slots creation */}
                      {timetable[day].manual.enabled && 
                        <ManualSlots data={timetable[day].manual.settings} handleChange={handleChange} day={day} />
                      }
                        
                    </Box>
                </AccordionContent>
              </Accordion>
            </AccordionContainer>
          )
        })}
      </AccordionGroup>
    </Box>
  );
};

export default Timetable;

import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage, useIntl } from 'react-intl';

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import dayjs from 'dayjs';
import 'dayjs/locale/sl';

import api from '../../api'

import CalendarDay from './CalendarDay';
import TimeSlots from './TimeSlots';

import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { 
  Flex,
  Box, 
  Status,
  Typography,
  Link
 } from '@strapi/design-system';

 import { Information } from '@strapi/icons';
 import styled from '@emotion/styled';

 const AlertIconWrapper = styled(Flex)`
 svg {
   height: 100%;
   width: 100%;

   path {
     fill: currentColor;
   }
 }
`;


export default function ReservationsCalendar(props) {

  const {
    description,
    disabled,
    error,
    intlLabel,
    name,
    onChange,
    placeholder,
    required,
    value
  } = props

  const initialValue = value ? dayjs(value) : dayjs()

  const savedDate = React.useRef(value ? dayjs(value) : null)
  const requestAbortController = React.useRef(null)

  const [isLoading, setIsLoading] = React.useState(false)
  const [monthlyData, setMonthlyData] = React.useState(null)
  const [disabledDays, setDisabledDays] = React.useState([])
  const [reservedDays, setReservedDays] = React.useState([])
  const [selectedDay, setSelectedDay] = React.useState(value ? dayjs(value) : null)
  const [selectedTerm, setSelectedTerm] = React.useState( value ? dayjs(value) : null )
  const [month, setMonth] = React.useState(initialValue.startOf('month'))

  const { formatMessage, locale } = useIntl()
  const { slug } = useCMEditViewDataManager()

  if (slug !== 'plugin::strapi-reservations.reservation') return null

  const fetchData = (date) => {
    const controller = new AbortController();
    api.getMonthlyTimeSlots(date.format('MM-DD-YYYY'), {
      signal: controller.signal,
    })
      .then(({ data }) => {
        // set time slots
        setMonthlyData(data)
        console.log(data)

        // set non available days and days with reservations
        const disabledDays = []
        const daysWithReservations = []
        for (const [key, day] of Object.entries(data)) {
          if ( !day.slots || day.slots.length === 0 ) {
            disabledDays.push(parseInt(key))
          }
          if (day.reservations) {
            daysWithReservations.push(parseInt(key))
          }
        }
        setDisabledDays(disabledDays);
        setReservedDays(daysWithReservations)
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  // only on initial load
  React.useEffect(() => {
    fetchData(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  // every render
  React.useEffect(() => {
    if (error) {
      console.log(error)
    }
  }, [error])

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);

    setMonth(date)
    setDisabledDays([]);
    setReservedDays([]);

    fetchData(date);
  };

  const handleChange = (date, selectionState) => {
    setSelectedDay(date)
  }


  return (
    <>
      {error && <Status variant="danger" size="S" showBullet={false}>
        <Typography fontWeight="bold">
          {formatMessage({
            id: 'strapi-reservations.reservations.editView.timeSlotCalendar.errorMessage',
            defaultMessage: 'Date and time slot has to be selected.'
          })}
        </Typography>
      </Status>}
      <Flex gap={6} wrap={'wrap'} alignItems={'flex-start'}>
        <Box style={{
            flex: '0 0 320px',
        }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <DateCalendar
              defaultValue={value ? initialValue : undefined}
              loading={isLoading}
              onMonthChange={handleMonthChange}
              renderLoading={() => <DayCalendarSkeleton />}
              slots={{
                day: CalendarDay,
              }}
              views={['day']} 
              slotProps={{
                day: {
                  disabledDays,
                  reservedDays
                },
              }}
              onChange={handleChange}
            />
          </LocalizationProvider>
        </Box>
        <Box style={{
          flex: '1 1 200px',
          maxWidth: '400px'
        }}>
          {/* 
            if date is selected
            if selected date is within the current month
            if data are available
          */}
          { ( 
            monthlyData && 
            selectedDay && 
            selectedDay.startOf('month').format() === month.format() 
            ) && <TimeSlots 
              slotsData={monthlyData[selectedDay.date()].slots} 
              selectedDate={selectedDay}
              savedDate={savedDate.current}
              selectedTerm={selectedTerm}
              onClick={( term ) => {
                setSelectedTerm(term)
                const e = onChange({
                  target: {
                    name, 
                    value: term.format(), 
                    type: 'text',
                  }
                })
              }}
            />}
            {monthlyData && Object.values(monthlyData).every((d) => !d.slots ) && 
              <Flex
                alignItems="flex-start"
                padding={5}
                background={'primary100'}
                borderColor={'primary200'}
                boxShadow="filterShadow"
                gap={3}
                hasRadius
              > 
                <AlertIconWrapper height={`${20 / 16}rem`} shrink={0} width={`${20 / 16}rem`}>
                  <Information aria-hidden />
                </AlertIconWrapper>
                <Box>
                  <Typography as="p" textColor="neutral800">
                    <FormattedMessage
                      id='strapi-reservations.reservations.editView.timeSlotCalendar.noSlots.content'
                      defaultMessage={'There is no time slots available for this months.'}
                    />
                  </Typography>
                  <Link to={'/settings/strapi-reservations'}>
                    <FormattedMessage
                      id='strapi-reservations.reservations.editView.timeSlotCalendar.noSlots.link'
                      defaultMessage={'Define schedule in the settings'}
                    />
                  </Link>
                </Box>
              </Flex>
            }
        </Box>
      </Flex>
    </>
    
    
   
  );
}

import React, {memo, useState, useEffect} from "react";
import { useIntl } from 'react-intl';

// Strapi
import {
  LinkButton,
  Box,
  Loader,
  Typography,
  Flex,
  Button,
  DatePicker,
  IconButton,
  useTheme,
} from "@strapi/design-system";

import { Illo } from "@strapi/design-system/EmptyStateLayout/story-assets/Illo.js"
import {BaseHeaderLayout, ContentLayout} from "@strapi/design-system/Layout"
import {Select, Option} from "@strapi/design-system/Select"
import {Cog, Plus, ChevronLeft, ChevronRight} from "@strapi/icons"

import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import {ViewState} from "@devexpress/dx-react-scheduler";

import styled from 'styled-components'

import api from "../../api";

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

import Appointment from "../../components/HomepageCalendar/Appointment";
import WeekViewCell from "../../components/HomepageCalendar/WeekViewCell";
import AppointmentContent from "../../components/HomepageCalendar/AppointmentContent";
import MonthViewCell from "../../components/HomepageCalendar/MonthViewCell";


const SettingsIcon = () => (
  <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.68 9.192c-.6.276-2.114 1.18-2.306 1.303a.792.792 0 0 0-.374.68v1.65a.797.797 0 0 0 .384.687c.254.16 1.73 1.042 2.306 1.303l.744 1.8c-.24.634-.67 2.333-.72 2.554a.797.797 0 0 0 .216.744l1.167 1.166a.801.801 0 0 0 .744.216l.03-.008c.36-.092 1.946-.498 2.523-.712l1.8.744c.276.6 1.181 2.115 1.304 2.307a.805.805 0 0 0 .679.374h1.649a.797.797 0 0 0 .686-.384c.16-.254 1.042-1.73 1.303-2.306l1.8-.744c.634.24 2.333.67 2.554.72a.797.797 0 0 0 .744-.216l1.166-1.167a.803.803 0 0 0 .216-.744l-.008-.03c-.092-.36-.498-1.946-.712-2.523l.744-1.8c.6-.276 2.115-1.181 2.307-1.304a.804.804 0 0 0 .374-.679v-1.649a.796.796 0 0 0-.382-.679c-.254-.16-1.73-1.041-2.306-1.303l-.744-1.8c.24-.634.67-2.333.72-2.554a.796.796 0 0 0-.216-.744l-1.166-1.173a.802.802 0 0 0-.744-.216l-.03.008c-.361.092-1.947.498-2.524.712l-1.8-.744c-.276-.6-1.18-2.115-1.303-2.307a.803.803 0 0 0-.68-.374h-1.65a.797.797 0 0 0-.68.382c-.16.254-1.041 1.73-1.303 2.306l-1.8.744c-.634-.24-2.333-.67-2.554-.72a.797.797 0 0 0-.744.216L2.921 4.094a.802.802 0 0 0-.216.744l.008.03c.092.361.498 1.947.712 2.524l-.744 1.8ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill="#212134"></path>
  </svg>
)

const LoaderContainer = styled(Box)(({ theme }) => `
    display: grid;
    place-items: center;
    height: 100vh;
`)

const Container = styled(Box)(({ theme }) => `
    a {
      text-decoration: none;
    }
    .Cell-highlightedText {
      color: ${theme.colors.primary500} !important;
      border-color: ${theme.colors.primary500} !important;
    }
    .Cell-today {
      background-color: ${theme.colors.primary500} !important;
    }
    .MuiTableCell-root:focus {
      background-color: ${theme.colors.primary100} !important;
    }
    #calendar a,
    #calendar a > span {
      width: 100%;
      height: 100%;
    }
    .VerticalAppointment-content, .HorizontalAppointment-content {
      color: inherit !important;
    }
`)



function HomePage() {

  const [state, setState] = useState({
    date: dayjs().format("ll"),
    view: "Month",
  });
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);
  const [data, setData] = useState([]);

  const { formatMessage, formatDate, locale } = useIntl();
  const theme = useTheme()

  const load = date => {
    api.getReservations(dayjs(date, 'll').toDate()).then(r => {
      setData(r.data);
      setLoading(false);
    });
  };

  const initialLoad = () => {
    api.getReservations().then(r => {
      setData(r.data);
      // console.log(r.data)
    });
    api.getSettings().then(r => {
      if (r.data) {
        setSettings(r.data);
        setState(s => ({...s, view: r.data.defaultView}));
      }
      setLoading(false);
    });
  };

  const cellClickHandler = (e) => {
    console.log(e)
  }

  React.useEffect(() => {
    load(state.date)
  },[state.date])

  useEffect(() => {
    initialLoad();
  }, []);

  if (!settings || loading) {
    return (
      <LoaderContainer>
        <Loader>Loading content...</Loader>
      </LoaderContainer>
    )
  }

  const {monthView, weekView, dayView} = settings;
  const multipleViews = monthView && weekView || monthView && dayView || weekView && dayView;
  
  const primaryAction =  (
    <Flex gap={3}>
      <LinkButton 
        startIcon={<SettingsIcon />}
        variant={'secondary'}
        to={`/settings/strapi-reservations`}
      >
        {formatMessage({ id: 'strapi-reservations.calendar.action.settings', defaultMessage: 'Settings' })}
      </LinkButton>
      <LinkButton 
        startIcon={<Plus/>} 
        to={`/content-manager/collectionType/plugin::strapi-reservations.reservation/create`}
      >
        {formatMessage({ id: 'strapi-reservations.calendar.action.create-entry', defaultMessage: 'Create Reservation' })}
      </LinkButton>
    </Flex>
  )
  

  return (
    <Container>
      <BaseHeaderLayout 
        title={formatMessage({ id: 'strapi-reservations.calendar.title', defaultMessage: 'Reservations Calendar' })} 
        as="h2" 
        primaryAction={primaryAction}
      />
      <ContentLayout>
        <Box id="calendar" background="neutral0" shadow="filterShadow" padding={[5, 8]} hasRadius>
          <Flex justifyContent="space-between" style={{marginBottom: 10}}>
            <Flex>
              <IconButton noBorder onClick={() => setState(s => ({...s, date: dayjs(s.date).subtract(1, s.view.toLowerCase()).format("ll")}))} icon={<ChevronLeft/>}/>
              <Box paddingLeft={1} paddingRight={1}>
                <DatePicker selectedDateLabel={() => {
                }} name="date" aria-label={formatMessage({ id: 'strapi-reservations.calendar.action.select-date',  defaultMessage: 'Select Date' })} value={state.date} onChange={e => setState(s => ({...s, date: dayjs(e).format("ll")}))}/>
              </Box>
              <IconButton noBorder onClick={() => setState(s => ({...s, date: dayjs(s.date).add(1, s.view.toLowerCase()).format("ll")}))} icon={<ChevronRight/>}/>
              <Box>
                {settings.todayButton &&
                  <Button variant="secondary" size="L" onClick={() => setState(s => ({...s, date: dayjs().format("ll")}))}>{formatMessage({ id: 'strapi-reservations.calendar.action.today',  defaultMessage: 'Today' })}</Button>
                }
              </Box>
            </Flex>
            <Box style={{width: 220}}>
              {multipleViews &&
                <Select aria-label="Select View" value={state.view} onChange={e => setState(s => ({...s, view: e}))}>
                  {settings.monthView && <Option value="Month">{formatMessage({ id: 'strapi-reservations.calendar.action.month', defaultMessage: 'Month' })}</Option>}
                  {settings.weekView && <Option value="Week">{formatMessage({ id: 'strapi-reservations.calendar.action.week',  defaultMessage: 'Week' })}</Option>}
                  {settings.dayView && <Option value="Day">{formatMessage({ id: 'strapi-reservations.calendar.action.day',  defaultMessage: 'Day' })}</Option>}
                </Select>
              }
            </Box>
          </Flex>
          <Box style={{textAlign: "center", marginBottom: 20}}>
            {state.view === "Month" &&
              <Typography variant="alpha" textTransform="uppercase" style={{textAlign: "center"}}>{formatDate(state.date, { month: 'long'})}</Typography>
            }
          </Box>
          <Scheduler
            data={data} 
            locale={ locale } 
            firstDayOfWeek={new Intl.Locale(locale).weekInfo?.firstDay || 1}
            onCellClick={cellClickHandler}
          >
            <ViewState onCurrentDateChange={load} currentDate={dayjs(state.date, "ll").format()} currentViewName={state.view}/>
            <MonthView
              timeTableCellComponent={MonthViewCell}
            />
            <WeekView 
              startDayHour={settings.startHour} 
              endDayHour={settings.endHour} 
              cellDuration={settings.cellDuration}
              timeTableCellComponent={WeekViewCell}
            />
            <DayView 
              startDayHour={settings.startHour} 
              endDayHour={settings.endHour}
              cellDuration={settings.cellDuration}
            />
            <Appointments 
              appointmentComponent={Appointment}
              appointmentContentComponent={AppointmentContent}
            />
          </Scheduler>
        </Box>
      </ContentLayout>
    </Container>
  );
}

export default memo(HomePage);

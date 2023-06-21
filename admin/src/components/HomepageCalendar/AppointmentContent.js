import React from "react";
import dayjs from "dayjs";

import {
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

import styled from "@emotion/styled";
const Label = styled('p')(({ theme }) => `
    font-weight: bold;
    display: block;
`)

function AppointmentContent({children, ...props}) {

  return (
    <Appointments.AppointmentContent {...props}>
      <Label>{ props.data.title },&nbsp;</Label>
      <p>{ dayjs(props.data.startDate).format('HH:mm')}</p>
    </Appointments.AppointmentContent>
  );
}

export default AppointmentContent;

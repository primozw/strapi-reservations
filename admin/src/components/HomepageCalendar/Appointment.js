import React from "react"
import {Link} from "@strapi/design-system/Link"

import { Appointments } from "@devexpress/dx-react-scheduler-material-ui"

import tinycolor from "tinycolor2"

function Appointment({children, style, ...restProps}) {
  const {id, color} = restProps.data;

  return (
    <Link to={`/content-manager/collectionType/plugin::strapi-reservations.reservation/${id}`}>
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          backgroundColor: color,
          borderRadius: "4px",
          color: tinycolor(color).isLight() ? '#000' : '#fff'
        }}
      >
        {children}
      </Appointments.Appointment>
    </Link>
  )
}

export default Appointment;

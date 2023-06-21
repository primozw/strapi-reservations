import React, {memo, useState, useEffect} from "react";
import propTypes from "prop-types";

import {
  WeekView
} from "@devexpress/dx-react-scheduler-material-ui";

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)



function WeekViewCell({children, ...restProps}) {

  return (
    <WeekView.TimeTableCell { ...restProps }>
      {children}
    </WeekView.TimeTableCell>
  )
}

export default WeekViewCell;

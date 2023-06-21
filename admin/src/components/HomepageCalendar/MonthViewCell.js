import React, {memo, useState, useEffect} from "react";
import propTypes from "prop-types";

import {
  MonthView
} from "@devexpress/dx-react-scheduler-material-ui";

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)



function MonthViewCell({children, onDoubleClick, ...restProps}) {

  const doubleClickHandler = (e) => {
    console.log(e)
  }

  return (
    <MonthView.TimeTableCell onDoubleClick={doubleClickHandler} { ...restProps }>
      {children}
    </MonthView.TimeTableCell>
  )
}

export default MonthViewCell;

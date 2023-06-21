'use strict';

const dayjs = require('dayjs')
const isBetween = require('dayjs/plugin/isBetween')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')

dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)

var Holidays = require('date-holidays')

/**
 * Schedule Services
 */

module.exports = () => ({
  /**
   * Get schedule – time slots settings for all days in week, based on provided date
   * @param {object} date dayjs object
   * @param {array} schedules array of schedules
   */
  getSchedule: async ( date, schedules ) => {

    // get the timetable based on a given date
    const schedule = schedules.filter((schedule) => {
      const start = dayjs(schedule.start, 'YY-MM-DD')
      const end = dayjs(schedule.end, 'YY-MM-DD')
      const startYear = start.year()
      const endYear = end.year()
      let _date = null

      if (schedule.yearless) {
        if (startYear !== endYear) {
          const dateWithLowerYear = date.year(startYear)
          const endWithLowerYear = end.year(startYear)
  
          if (dateWithLowerYear.isSameOrBefore(endWithLowerYear)){
            _date = date.year(endYear)
          } else {
            _date = date.year(startYear)
          }
        } else {
          _date = date.year(startYear)
        }
  
      } else {
        _date = date.clone()
      }

      // console.log(_date)
      return _date.isBetween(start, end, 'day', '[]')

    })

    return schedule[0]
  },

  getScheduleSettings: async (date, schedules) => {
    
    const schedule = await strapi.service("plugin::strapi-reservations.schedule").getSchedule(date, schedules)

    // return null if there is no schedule for a given date
    if (!schedule) return null

    const { 
      holidayLocalize,
      holidayTypes,
      enableHoliday,
    } = await strapi.service("plugin::strapi-reservations.settings").getSettings()

    const hd = new Holidays(holidayLocalize.country, holidayLocalize.state, holidayLocalize.region)
    const holidays = hd.isHoliday(date.toDate())
    
    // check if holiday is one of the selected types
    const isHoliday = holidays && holidays.some( h => holidayTypes.includes(h.type))
    
    let settings = ( enableHoliday && isHoliday ) ? schedule.timetable.holiday : schedule.timetable[date.format('dddd').toLowerCase()]

    return settings
  }
});

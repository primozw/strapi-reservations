'use strict';

const dayjs = require('dayjs')
const isBetween = require('dayjs/plugin/isBetween')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')

dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)

/**
 * Return if the given date object are within the same day
 * @param {object} date dayjs object
 * @param {object} compared dayjs object
 * @returns boolean
 */
const isSameDay = (date, compared) => {
  const start = date.startOf('day')
  const end = date.endOf('day')
  return compared.isBetween(start, end, 'day', '[]')
}

/**
 * Return new date object with the given time
 * @param {object} date dayjs object
 * @param {strin} time time in format HH:mm, eg. 18:00
 * @returns dayjs object
 */
const setTime = ( date, time) => {
  const [hour, minute] = time.split(':');
  return date.hour(parseInt(hour)).minute(parseInt(minute))
}

/**
 * Get total minutes
 * @param {strin} time duration in format HH:mm, e.g. 01:00
 * @returns int 
 */
const getMinutes = ( time ) => {
  const [hour, minute] = time.split(':');
  return parseInt(hour * 60) + parseInt(minute)
}

/**
 * Check if it's the same time
 * @param {object} date dayjs object
 * @param {object} compared dayjs object
 * @returns boolean
 */
const isSameTime = (date, compared) => {
  return date.format('HH:mm') === compared.format('HH:mm')
}

/**
 * Check if slot is available, compare time of date with start of reservation
 * @param {object} date dayjs object
 * @param {array} reservations array of objects with property start, which should be date string
 * @returns boolean 
 */
const isSlotAvailable = (date, reservations) => {
  return !reservations.some( reservation =>  isSameTime(date, dayjs(reservation.date)) )
}


const getSlots = ( settings, reservations ) => {
  const slots = []

  // return false if is not opened
  if (!settings.opened) return false

  // automatic slots creation
  if (settings.automatic.enabled) {
    const day = dayjs()
    let time = setTime(day, settings.automatic.settings.start)
    const end = setTime(day, settings.automatic.settings.end)
    const gap = getMinutes(settings.automatic.settings.duration)

    while (time.isSameOrBefore(end)) {
      let available = false
      if (isSlotAvailable(time, reservations)) {
        available = true
      }
      slots.push({
        time: time.format('HH:mm'),
        available
      })
      time = time.add(gap, 'minute')
    }
  }

  // automatic slots creation
  if (settings.manual && settings.manual.settings.length !== 0) {
    settings.manual.settings.forEach( time => {
      const day = dayjs()
      const slot = setTime(day, time)
      const available = isSlotAvailable(slot, reservations)
      
      slots.push({
        time: slot.format('HH:mm'),
        available
      })
    })
  }

  return slots.length !== 0 ? slots : false
}


/**
 * time slots services
 */

module.exports = () => ({

  /**
   * 
   * @param {object} date dayjs object
   * @param {array} reservations array of reservations within the same month
   * @param {array} schedules array of available schedules 
   */
  getMonthlySlots: async ( date, reservations, schedules ) => {

      const numberOfDays = date.daysInMonth();
      const monthSlots = {}

      // loop through days of the month
      for (let i = 1; i <= numberOfDays; i++) {

        const _day = date.date(i)

        // get opening hours for this day
        const settings = await strapi.plugin('strapi-reservations').service('schedule').getScheduleSettings(_day, schedules);

        // get only reservations with the same day
        const _reservations = reservations.filter( 
          reservation => isSameDay(_day, dayjs(reservation.date))
        )

        const slots = settings && getSlots(settings, _reservations)

        monthSlots[i] = {
          date: _day.format(),
          day: _day.format('dddd'),
          reservations: _reservations.length !== 0,
          slots
        }
      }

      return monthSlots

  },

   /**
   * 
   * @param {object} date dayjs object
   * @param {array} reservations array of reservations within the same week
   * @param {array} schedules array of available schedules 
   */
  getWeeklySlots: async ( date, reservations, schedules ) => {

    const weekSlots = {}
    let _day = date.startOf('week');

    for (let i = 1; i <= 7; i++) {
      const settings = await strapi.plugin('strapi-reservations').service('schedule').getScheduleSettings(_day, schedules);

      // get only reservations with the same day
      const _reservations = reservations.filter( 
        reservation => isSameDay(_day, dayjs(reservation.date))
      )

      const slots = settings && getSlots(settings, _reservations)
      
      weekSlots[i] = {
        date: _day.format(),
        day: _day.format('dddd'),
        reservations: _reservations.length !== 0,
        slots
      }
      _day = _day.add(1, 'day')
    }

    return weekSlots

  },

   /**
   * 
   * @param {object} date dayjs object
   * @param {array} reservations array of reservations within the same day
   * @param {array} schedules array of available schedules 
   */
  getDailySlots: async ( date, reservations, schedules ) => {

    const settings = await strapi.plugin('strapi-reservations').service('schedule').getScheduleSettings(date, schedules);
    
    const _reservations = reservations.filter( 
      reservation => isSameDay(date, dayjs(reservation.date))
    )

    return {
      date: date.format(),
      day: date.format('dddd'),
      reservations: _reservations.length !== 0,
      slots: settings ? getSlots(settings, reservations) : null
    }
  }
});
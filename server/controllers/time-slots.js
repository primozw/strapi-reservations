'use strict';

const dayjs = require('dayjs')


module.exports = ({ strapi }) => ({

   /**
   * Get available terms for a day or month
   * /timetable/day/04-01-2023
   * /timetable/month/04-01-2023
   * 
   * @param {object} ctx 
   * @param {*} next 
   */
   get: async (ctx, next) => {
    try {

      const date = dayjs(ctx.params.date, "MM-DD-YYYY")
      const type = ctx.params.type
      let slots = null

      // check if type is supported
      if (!(type === 'month' || type === 'week' || type === 'day')) {
        throw new Error('Value of type param is not supported. Supported types: time | day | month')
      }

      /**
       * get reservations within the same range:
       *  /timetable/day/04-01-2023 – get all reservations within the same day
       *  /timetable/week/04-01-2023 – get all reservations within the same week
       *  /timetable/month/04-01-2023 – get all reservations within the same month
       */

      let start = date.startOf('day')
      let end = date.endOf('day')

      if (type === 'month') {
        start = start.startOf('month')
        end = end.endOf('month')
      } else if ( type === 'week'){
        start = start.startOf('week')
        end = end.endOf('week')
      }

      const reservations = await strapi.entityService.findMany('plugin::strapi-reservations.reservation', {
        filters: {
          $and: [
            {
              date: {
                $gte: start.format(),
                $lte: end.format()
              },
            }
          ]
        }
      })

      // console.log(reservations)

      // Get all available schedules
      const schedules = await strapi.entityService.findMany('plugin::strapi-reservations.schedule', {
        sort: { order: 'ASC' }
      })

      switch (type) {
        case 'month':
          slots = await strapi.service("plugin::strapi-reservations.timeSlots").getMonthlySlots(
            date,
            reservations,
            schedules
          );
          break;
        case 'week':
          slots = await strapi.service("plugin::strapi-reservations.timeSlots").getWeeklySlots(
            date,
            reservations,
            schedules
          );
          break;
        default:
          slots = await strapi.service("plugin::strapi-reservations.timeSlots").getDailySlots(
            date,
            reservations,
            schedules
          );
          break;
      }
      
      ctx.body = slots;

    } catch (err) {
      // console.error(err)
      ctx.body = {
        status: 'error',
        message: err.message
      }
    }
  }
});

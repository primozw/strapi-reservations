'use strict';

const dayjs = require('dayjs')


module.exports = ({ strapi }) => ({

   /**
   * Get a single schedule based on given date 
   * /schedules
   * /schedules/04-01-2023
   * 
   * @param {object} ctx 
   */
  get: async ( ctx ) => {
   try {
  
      // Get all available schedules
    const schedules = await strapi.query('plugin::strapi-reservations.schedule').findMany()

    const date = dayjs(ctx.params.date, "MM-DD-YYYY")
    // get schedule for a given date
    ctx.body = await strapi.plugin('strapi-reservations').service('schedule').getSchedule(date, schedules);
       
   } catch (err) {
     // console.error(err)
     ctx.body = {
       status: 'error',
       message: err.message
     }
   }
  },
  create: async (ctx) => {
    try {
      const { body } = ctx.request      
      ctx.body = await strapi.entityService.create('plugin::strapi-reservations.schedule', {
        data: body,
      });   
    } catch (err) {
      // console.error(err)
      ctx.body = {
        status: 'error',
        message: err.message
      }
    }
   },
  update: async (ctx) => {
    try {
      const { body } = ctx.request
      ctx.body = await strapi.entityService.update('plugin::strapi-reservations.schedule', body.id, {
        data: body,
      });
    } catch (err) {
      // console.error(err)
      ctx.body = {
        status: 'error',
        message: err.message
      }
    }
   },
   delete: async (ctx) => {
    try {
      const id = ctx.params.id
      ctx.body = await strapi.entityService.delete('plugin::strapi-reservations.schedule', id);
    } catch (err) {
      // console.error(err)
      ctx.body = {
        status: 'error',
        message: err.message
      }
    }
   },
   getAll: async (ctx) => {
    try {
   
     // Get all available schedules
     ctx.body = await strapi.query('plugin::strapi-reservations.schedule').findMany()
   
    } catch (err) {
      // console.error(err)
      ctx.body = {
        status: 'error',
        message: err.message
      }
    }
   },
   updateAll: async (ctx) => {
    try {
      const { body } = ctx.request

      const promises = body.map(
        schedule => strapi.entityService.update(
          'plugin::strapi-reservations.schedule', 
          schedule.id, {
            data: schedule,
          }
        )
      )
      ctx.body = await Promise.all(promises)
    } catch (err) {
      // console.error(err)
      ctx.body = {
        status: 'error',
        message: err.message
      }
    }
   },
});

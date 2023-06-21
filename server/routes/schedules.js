'use strict';

/**
 *  router
 */

module.exports = {
  type: 'admin', // other type available: admin.
  routes: [
    // single instance
    {
      method: 'GET',
      path: '/schedule/:date',
      handler: 'schedules.get',
    },
    {
      method: 'POST',
      path: '/schedule',
      handler: 'schedules.create',
    },
    {
      method: 'PUT',
      path: '/schedule',
      handler: 'schedules.update',
    },
    {
      method: 'DELETE',
      path: '/schedule/:id',
      handler: 'schedules.delete',
    },

    // multiple instances
    {
      method: 'GET',
      path: '/schedules',
      handler: 'schedules.getAll',
    },
    {
      method: 'PUT',
      path: '/schedules',
      handler: 'schedules.updateAll',
    },
  ],
};
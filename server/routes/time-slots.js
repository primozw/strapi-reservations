'use strict';

/**
 *  router
 */

module.exports = {
  type: 'content-api', // other type available: admin.
  routes: [
    {
      method: 'GET',
      path: '/time-slots/:type/:date',
      handler: 'timeSlots.get',
      config: {
        policies: [],
      },
    },
  ],
};
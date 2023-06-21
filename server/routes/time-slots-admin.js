'use strict';

/**
 *  router
 */

module.exports = {
  type: 'admin',
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
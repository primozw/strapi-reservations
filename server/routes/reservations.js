'use strict';

/**
 *  router
 */

module.exports = {
  type: 'content-api', // other type available: admin.
  routes: [
    {
      method: 'POST',
      path: '/',
      handler: 'reservations.createReservation'
    },
  ],
};
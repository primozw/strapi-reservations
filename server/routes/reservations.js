'use strict';

/**
 *  router
 */

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/',
      handler: 'reservations.getReservations'
    },
    {
      method: 'POST',
      path: '/confirm',
      handler: 'reservations.confirmReservation'
    },
    {
      method: 'POST',
      path: '/cancel',
      handler: 'reservations.cancelReservation'
    },
  ],
};
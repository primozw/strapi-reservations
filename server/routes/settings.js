'use strict';

/**
 *  router.
 */

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/settings',
      handler: 'settings.getSettings',
    },
    {
      method: 'POST',
      path: '/settings',
      handler: 'settings.setSettings',
    },
  ],
};
'use strict';

module.exports = ({ strapi }) => {
  // register custom field for picking time slot
  strapi.customFields.register({
    name: 'time-slots',
    plugin: 'strapi-reservations',
    type: 'string',
  });
};

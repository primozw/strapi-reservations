'use strict';

module.exports = ({ strapi }) => ({
  async getSettings(ctx) {
    try {
      ctx.body = await strapi
        .plugin('strapi-reservations')
        .service('settings')
        .getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async setSettings(ctx) {
    const { body } = ctx.request;
    try {
      // set settings
      await strapi
        .plugin('strapi-reservations')
        .service('settings')
        .setSettings(body);
      // return new settings
      ctx.body = await strapi
        .plugin('strapi-reservations')
        .service('settings')
        .getSettings();

    } catch (err) {
      ctx.throw(500, err);
    }
  }
})
'use strict';

module.exports = ({ strapi }) => ({
  async getReservations(ctx) {
    try {
      ctx.body = await strapi
        .plugin('strapi-reservations')
        .service('reservations')
        .getReservations(ctx.query.date);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async confirmReservation(ctx){
    try {
      const { body: data } = ctx.request
      await strapi.plugin('strapi-reservations').service('hooks')?.onConfirm(ctx)
      ctx.body = await strapi.plugin('strapi-reservations').service('reservations').setReservationStatus(data.id, 'confirmed');
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  
  async cancelReservation(ctx){
    try {
      const { body: data } = ctx.request
      await strapi.plugin('strapi-reservations').service('hooks')?.onCancel(ctx)
      ctx.body = await strapi.plugin('strapi-reservations').service('reservations').setReservationStatus(data.id, 'draft');
    } catch (err) {
      ctx.throw(500, err);
    }
  },

})
'use strict';

const dayjs = require('dayjs')

/**
 * Reservations Services
 */

module.exports = () => ({
  async getReservations(date = new Date()) {

    // get reservations between one month before and one month after
    const filters = {
      $and: [
        {
          date: {
            $gte: dayjs(date).startOf('month').subtract(1, 'month').format(),
            $lte: dayjs(date).endOf('month').add(1, 'month').format(),
          },
        },
      ],
    };

    const data = await strapi.entityService.findMany('plugin::strapi-reservations.reservation', {
      filters
    });

    const { 
      timeSlotDuration,
      confirmedColor,
      draftColor
    } = await strapi.plugin('strapi-reservations').service('settings').getSettings();

    /**
     * map to fields required by @devexpress/dx-react-scheduler:
     * @link https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/reference/scheduler/#appointmentmodel
     */
    // console.log(data)

    return data.map(x => ({
      id: x.id,
      title: x.label,
      startDate: x.date,
      endDate: dayjs(x.date).add(1, 'minute').format(), // if endDate is missing the reservation is not shown in month view calendar
      status: x.status,
      color: x.status === 'draft' ? draftColor : confirmedColor
    }));
  },

  async setReservationStatus(id, status){
    return await strapi.db.query('plugin::strapi-reservations.reservation').update({
      where: { id },
      data: {
        status,
      },
    });
  }
});

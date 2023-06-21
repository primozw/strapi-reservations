'use strict';

const timeSlots = require('./time-slots');
const timeSlotsAdmin = require('./time-slots-admin');
const settings = require('./settings'); 
const reservations = require('./reservations');
const schedules = require('./schedules');

module.exports = {
  timeSlots,
  timeSlotsAdmin,
  settings,
  reservations,
  schedules,
};

'use strict';

const getStore = () => {
  return strapi.store({
    environment: '',
    type: 'plugin',
    name: 'strapi-reservations',
  });
}

async function createDefaultConfig() {
  const pluginStore = getStore();
  const value = {

    // Calendar
    monthView: true,
    weekView: true,
    dayView: false,
    defaultView: 'Month',
    todayButton: true,
    startHour: '08:00',
    endHour: '19:00',
    cellDuration: 60,

    // Colors
    confirmedColor: '#4845FF',
    draftColor: '#DBDBE7',

    // Holidays
    enableHoliday: true,
    holidayTypes: ['public'],
    holidayLocalize: {
      country: 'SI',
      state: undefined,
      region: undefined
    },
  };
  await pluginStore.set({ key: 'settings', value });
  return pluginStore.get({ key: 'settings' });
}

module.exports = () => ({
  getSettings: async () => {
    const pluginStore = getStore();
    let config = await pluginStore.get({ key: 'settings' });
    if (!config) {
      config = await createDefaultConfig();
    }
    return config;
  },

  setSettings: async (settings) => {
    const value = settings;
    console.log(('Before set settings:', settings))
    const pluginStore = getStore();
    await pluginStore.set({ key: 'settings', value });
    return pluginStore.get({ key: 'settings' });
  }

})
import pluginId from './pluginId';

import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import ReservationButtons from './components/ReservationsButtons';
import ReservationsCalendar from './components/ReservationsCalendar';

import mutateEditViewHook from './mutations/mutateEditViewHook';

export default {

  // runs before the application is initialized
  register(app) {
    // Create menu in admin dashboard
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `strapi-reservations.admin-menu.reservations.page`,
        defaultMessage: 'Reservations',
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });

    // Create settings page
    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: `strapi-reservations.admin-menu.settings.section`,
          defaultMessage: 'Reservations',
        },
      },
      [
        {
          intlLabel: {
            id: `strapi-reservations.admin-menu.settings.page`,
            defaultMessage: 'Configuration',
          },
          id: 'settings',
          to: `/settings/${pluginId}`,
          Component: async () => {
            return import('./pages/Settings');
          },
        },
      ]
    );

    
    // Register plugin
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });

    // add new custom field, you can use it as type strapi-reservations
    app.addFields({
      Component: ReservationsCalendar,
      type: pluginId
    });
  },

 

  // called at every server start
  bootstrap(app) {
    
    // add buttons for sending email notifications about reservation
    app.injectContentManagerComponent("editView", "right-links", {
      name: "reservation-buttons",
      Component: ReservationButtons,
    });

    app.registerHook(
      "Admin/CM/pages/EditView/mutate-edit-view-layout",
      mutateEditViewHook
    )
  },

  // Translations
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./../../translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data,
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};

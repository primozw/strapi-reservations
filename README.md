<div align="center">
  <img style="width: 80px; height: auto;" src="public/logo.svg" alt="Logo for Strapi Reservation Plugin" />
  <h1>Strapi Reservations</h1>

<a href="https://strapi.io/" target="_blank"><img style="width: 160px; height: auto;" src="public/made-with-strapi.svg" alt="Made with Strapi badge" /></a>

Strapi plugin for making reservations based on predefined time slots.

  <img style="width: 100%; height: auto;" src="public/screenshot.png" alt="Screenshot of Strapi Reservation Plugin" />
</div>

## Get Started

- [Features](#features)
- [Installation](#installation)

## <a id="features"></a> Features

- Create reservation based on predefined time slots
- Time slots are generated based on defined schedule (opening hours) and can be created automaticly or manualy
- Schedules can be defined for exact period of time or for certain time of the year, without considering the year (yearless)
- Supports holidays ([date-holidays](https://www.npmjs.com/package/date-holidays))
- View reservations in calendar (day, week or month view)
- API for getting time slots
- Confirm or cancel reservation (supports callback functions)
- Supports i18n for content and user's preferred language for UI

## <a id="installation"></a> Installation

To install this plugin, you need to add an NPM dependency to your Strapi application.

```sh
# Using Yarn
yarn add @weingerl/strapi-reservations

# Or using NPM
npm install @weingerl/strapi-reservations
```

Update your `./config/plugins.js` file if it already exists or create it with the following:

```js
module.exports = ({ env }) => ({
  // ...
  "strapi-reservations": {
    enabled: true,
  },
  // ...
});
```

Then, you'll need to build your admin panel:

```sh
# Using Yarn
yarn build

# Or using NPM
npm run build
```

## Todo list:

- [ ] double click on calendar cell to create registration
- [ ] differentiate/disable cells on calendar that doesn't have available time slots

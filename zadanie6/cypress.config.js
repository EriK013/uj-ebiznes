const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://the-internet.herokuapp.com',
    supportFile: false,
    video: false,
    screenshotOnRunFailure: false,
  },
});

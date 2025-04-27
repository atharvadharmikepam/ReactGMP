const { defineConfig } = require("cypress");
 
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false, // Disable the default support file
  },
 
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
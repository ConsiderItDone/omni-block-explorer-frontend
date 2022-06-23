const CracoAlias = require("craco-alias");
const CracoStylusPlugin = require("craco-stylus");
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
   plugins: [
      {
         plugin: CracoStylusPlugin
      },
      {
         plugin: CracoAlias,
         options: {
            source: "tsconfig",
            baseUrl: "./src",
            tsConfigPath: "./tsconfig.paths.json"
         }
      },
      { plugin: CracoAntDesignPlugin },

   ]
};
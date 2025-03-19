/* eslint-env node */
const {
  withBabelShared,
} = require("./shared/babel.shared");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};

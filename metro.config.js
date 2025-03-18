const { mergeConfig } = require("@react-native/metro-config");
const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://metrobundler.dev/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: [
      ...(defaultConfig.resolver?.assetExts || []),
      "glb",
      "gltf",
      "bin",
      "ktx",
    ],
  },
  transformer: {
    unstable_allowRequireContext: true, // Add this line
  },
};

module.exports = mergeConfig(defaultConfig, config);

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */


const config = {};

// config.resolver.nodeModulesPaths = [
//     "./node_modules", // 현재 프로젝트의 node_modules만 사용하도록 설정
// ];

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

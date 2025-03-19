# TrackAsia Expo Example App

This is an app to demonstrate the possibilities of `@trackasia/trackasia-react-native` within Expo. Follow the [CONTRIBUTING](/CONTRIBUTING.md#expo-app) guide, on how to use it during development.

> [!Important]
> This app is configured through a monorepo for easy native development of the library. Follow the [Getting Started](https://track-asia.com/trackasia-react-native/docs/setup/getting-started) guide for regular installation steps.

gặp một số lỗi 

build ios
[!] Invalid `hermes-engine.podspec` file: No such file or directory @ rb_sysopen - /Volumes/DATA/TRACKASIA-NAVIGATION/trackasia-react-native/examples/expo-app/node_modules/react-native/index.js
Debugger listening on ws://127.0.0.1:57141/32be4454-a56e-4f22-ae93-42036ca3c68e
For help, see: https://nodejs.org/en/docs/package.json.

 #  from /Volumes/DATA/TRACKASIA-NAVIGATION/trackasia-react-native/examples/expo-app/node_modules/react-native/sdks/hermes-engine/hermes-engine.podspec:17
 #  -------------------------------------------
 #  # package.json
 >  package = JSON.parse(File.read(File.join(react_native_path, "package.json")))
 #  version = package['version']
 #  -------------------------------------------

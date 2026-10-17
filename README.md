# TrackAsia React Native SDK

## Giới thiệu

TrackAsia là một thư viện bản đồ mạnh mẽ cho ứng dụng React Native, cung cấp giải pháp bản đồ chất lượng cao với nhiều tính năng tiên tiến. Thư viện này cho phép bạn tích hợp bản đồ tương tác, theo dõi vị trí người dùng và tùy chỉnh giao diện bản đồ một cách linh hoạt trong ứng dụng React Native của bạn.

### Lợi ích chính:
- Hiệu suất cao và tối ưu cho thiết bị di động
- Hỗ trợ đầy đủ cho cả iOS và Android
- Tích hợp dễ dàng với React Native
- Nhiều tùy chọn tùy biến giao diện và tính năng
- Hỗ trợ theo dõi vị trí người dùng thời gian thực

## Mục Lục

1. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
2. [Cài Đặt](#cài-đặt)
3. [Triển Khai Cơ Bản](#sử-dụng-cơ-bản)
4. [Dự Án Mẫu](#-dự-án-mẫu)
5. [Xử Lý Sự Cố](#xử-lý-lỗi-phổ-biến)
6. [Tài Liệu Tham Khảo](#tài-liệu-tham-khảo)

## Yêu cầu hệ thống

### React Native
- React Native phiên bản 0.76.9 trở lên (khuyến nghị 0.79.x)
- Node.js 18 trở lên
- npm hoặc yarn

### iOS
- Xcode 14 trở lên (khuyến nghị Xcode 16+)
- iOS 15.0 trở lên
- CocoaPods
- Swift Package Manager (SPM) cho TrackAsia native SDK

### Android
- Android Studio
- Android SDK Platform 26 trở lên (compileSdk 35+)
- Android Build Tools 29.0.2 trở lên
- NDK 27.0.12077973 trở lên
- Kotlin 1.9.10 trở lên

## Cài đặt

### 1. Cài đặt package

Sử dụng npm:
```bash
npm install @track-asia/trackasia-react-native @react-native-community/geolocation
```

Hoặc sử dụng yarn:
```bash
yarn add @track-asia/trackasia-react-native @react-native-community/geolocation
```

### 2. Linking thư viện

#### iOS
1. Cài đặt dependencies iOS:
```bash
cd ios && pod install && cd ..
```

2. Thêm quyền vào `Info.plist`:
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Ứng dụng cần quyền truy cập vị trí của bạn để hiển thị trên bản đồ</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Ứng dụng cần quyền truy cập vị trí của bạn để hiển thị trên bản đồ</string>
```

3. Cấu hình Podfile với SPM cho TrackAsia native SDK:
```ruby
# Trong post_install block:
$MLRN_SPM_SPEC = {
  url: "https://github.com/track-asia/trackasia-gl-native-distribution",
  requirement: {
    kind: "exactVersion",
    version: "2.0.3"
  },
  product_name: "TrackAsia"
}
$MLRN.post_install(installer)
```

4. Đảm bảo iOS deployment target tối thiểu 15.0 trong Podfile:
```ruby
platform :ios, min_ios_version_supported
```

#### Android
1. Thêm quyền vào `AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

2. Cập nhật `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        minSdkVersion 26
    }
}
```

3. Đảm bảo `android/gradle.properties` có cấu hình JVM đủ:
```properties
org.gradle.jvmargs=-Xmx4096M -XX:MaxMetaspaceSize=1024m
org.gradle.parallel=true
org.gradle.caching=true
```

### 3. Cài đặt dependencies và chạy ứng dụng

#### Cài đặt dependencies
```bash
# Cài đặt tất cả dependencies của dự án
yarn install
```

#### Chạy ứng dụng trên Android
```bash
# Chạy ứng dụng trên thiết bị/máy ảo Android
yarn android
```

#### Chạy ứng dụng trên iOS
```bash
# Cài đặt pods (chỉ cần chạy lần đầu hoặc khi thêm dependencies mới)
cd ios && pod install && cd ..

# Chạy ứng dụng trên thiết bị/máy ảo iOS
yarn ios
```

> **Lưu ý**: Đảm bảo bạn đã cài đặt và cấu hình đúng môi trường phát triển React Native trước khi chạy các lệnh trên. Điều này bao gồm Android Studio, Xcode (cho macOS), và các công cụ phát triển cần thiết khác.

## Sử dụng cơ bản

### 1. Hiển thị bản đồ đơn giản

```javascript
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView, Camera } from '@track-asia/trackasia-react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapStyle="https://maps.track-asia.com/styles/v2/streets.json?key=public"
      >
        <Camera
          zoomLevel={14}
          centerCoordinate={[106.6297, 10.8231]} // Tọa độ Hồ Chí Minh
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default App;
```

### 2. Thêm marker vào bản đồ

```javascript
import { MapView, Camera, PointAnnotation } from '@track-asia/trackasia-react-native';

// Trong component của bạn:
<MapView style={styles.map}>
  <PointAnnotation
    id="marker1"
    coordinate={[106.6297, 10.8231]}
    title="Địa điểm của tôi"
  >
    <View style={styles.markerContainer}>
      <View style={styles.marker} />
    </View>
  </PointAnnotation>
</MapView>
```

### 3. Theo dõi vị trí người dùng

```javascript
import { MapView, Camera, UserLocation, UserTrackingMode } from '@track-asia/trackasia-react-native';

<MapView style={styles.map}>
  {/* Hiển thị chấm vị trí người dùng */}
  <UserLocation visible={true} />

  {/* Camera bám theo vị trí người dùng */}
  <Camera
    followUserLocation={true}
    followUserMode={UserTrackingMode.Follow}
  />
</MapView>
```

### 4. Điều khiển tương tác bản đồ

```javascript
<MapView
  compassEnabled={true}
  zoomEnabled={true}
  scrollEnabled={true}
  rotateEnabled={true}
>
  {/* Các thành phần khác */}
</MapView>
```

## Xử lý lỗi phổ biến

1. **Bản đồ không hiển thị**
   - Kiểm tra API key đã được cấu hình đúng
   - Xác nhận kết nối internet
   - Kiểm tra URL style map hợp lệ

2. **Vị trí người dùng không hiển thị**
   - Kiểm tra quyền truy cập vị trí đã được cấp
   - Xác nhận GPS/Location đã được bật
   - Kiểm tra cấu hình trong Info.plist và AndroidManifest.xml

3. **Marker không hiển thị**
   - Xác nhận tọa độ marker hợp lệ
   - Kiểm tra component PointAnnotation được import đúng
   - Đảm bảo marker nằm trong vùng nhìn thấy của camera

### Mẹo Debug
- Sử dụng console.log để theo dõi các sự kiện bản đồ
- Kiểm tra thông báo lỗi liên quan đến TrackAsia
- Xác minh tất cả dependencies đã được cài đặt đúng cách

## Tài liệu tham khảo

### Style URLs theo quốc gia (v2)

| Quốc gia | Style URL |
|----------|-----------|
| VN (mặc định) | `https://maps.track-asia.com/styles/v2/streets.json?key=public` |
| Singapore | `https://sg-maps.track-asia.com/styles/v2/streets.json?key=public` |
| Thailand | `https://th-maps.track-asia.com/styles/v2/streets.json?key=public` |
| Taiwan | `https://tw-maps.track-asia.com/styles/v2/streets.json?key=public` |
| Malaysia | `https://my-maps.track-asia.com/styles/v2/streets.json?key=public` |

> **Lưu ý:** Thay `key=public` bằng API key thực tế của bạn khi sử dụng production.

### Repository Chính Thức
- [TrackAsia React Native](https://github.com/track-asia/trackasia-react-native)
- [TrackAsia Native](https://github.com/track-asia/trackasia-gl-native)
- [Tài Liệu TrackAsia](https://track-asia.com/trackasia-react-native)

### Một số hình ảnh minh họa

<p align="center">
<strong>Android Demo</strong><br/>
<img src="/images/android_1.png" alt="Android Demo 1" width="18%">
<img src="/images/android_2.png" alt="Android Demo 2" width="18%">
<img src="/images/android_3.png" alt="Android Demo 3" width="18%">
<img src="/images/android_4.png" alt="Android Demo 4" width="18%">
<img src="/images/android_5.png" alt="Android Demo 5" width="18%">
</p>

<p align="center">
<strong>iOS Demo</strong><br/>
<img src="/images/ios_1.png" alt="iOS Demo 1" width="18%">
<img src="/images/ios_2.png" alt="iOS Demo 2" width="18%">
<img src="/images/ios_3.png" alt="iOS Demo 3" width="18%">
<img src="/images/ios_4.png" alt="iOS Demo 4" width="18%">
<img src="/images/ios_5.png" alt="iOS Demo 5" width="18%">
</p>

## Các lỗi thường gặp và cách khắc phục

### Lỗi khi build iOS

#### 1. Lỗi Hermes Engine
```bash
[!] Invalid `hermes-engine.podspec` file: No such file or directory @ rb_sysopen - <project-root>/node_modules/react-native/index.js

# from <project-root>/node_modules/react-native/sdks/hermes-engine/hermes-engine.podspec:17
# -------------------------------------------
# package.json
> package = JSON.parse(File.read(File.join(react_native_path, "package.json")))
# version = package['version']
# -------------------------------------------
```

**Nguyên nhân:**
- Thiếu file package.json trong thư mục react-native
- Cấu hình Hermes Engine không chính xác
- Phiên bản React Native không tương thích

**Cách khắc phục:**
1. Kiểm tra và cài đặt lại các dependencies:
```bash
yarn install
# hoặc
npm install
```

2. Xóa thư mục Pods và cài đặt lại:
```bash
cd ios
rm -rf Pods
pod install
```

3. Kiểm tra phiên bản React Native và Hermes Engine có tương thích với nhau không

4. Nếu còn lỗi thì ẩn và thay thế version react native

<p align="center">
<strong>Ảnh minh họa lỗi</strong><br/>
<img src="/images/error_1.png" alt="Error Screenshot 1" width="30%">
<img src="/images/error_2.png" alt="Error Screenshot 2" width="30%">
<img src="/images/error_3.png" alt="Error Screenshot 3" width="30%">
</p>

## 📁 Dự Án Mẫu

Repository này bao gồm 3 dự án mẫu hoàn chỉnh để bạn tham khảo và học tập:

### 🚀 TrackAsia-expo-app/

**Ứng dụng React Native Expo tích hợp TrackAsia** - Dành cho dự án sử dụng Expo

**Đặc điểm:**
- ✅ **Framework**: Expo với Prebuild workflow
- ✅ **TrackAsia SDK**: v2.0.3
- ✅ **React Native**: v0.79.5, Expo SDK 53.0.22
- ✅ **Native Integration**: Sử dụng Expo Plugin system
- ✅ **iOS Configuration**: Swift Package Manager thông qua plugin
- ✅ **TypeScript**: Hỗ trợ đầy đủ với type safety

**Tính năng chính:**
- 🗺️ Hiển thị bản đồ TrackAsia với giao diện đẹp
- 📍 Custom marker và point annotations
- 👆 Xử lý sự kiện tap trên bản đồ
- 📱 UI hiện đại với header/footer
- 🎨 Shadow effects và border radius

**Cách sử dụng:**
```bash
cd TrackAsia-expo-app
npm install
npx expo prebuild    # Tạo native directories
npm run ios          # Chạy trên iOS
npm run android      # Chạy trên Android
```

**Phù hợp cho:**
- Dự án mới bắt đầu với Expo
- Ứng dụng cần deploy lên App Store/Play Store
- Team muốn tận dụng Expo ecosystem

---

### ⚡ TrackAsia-react-native-app/

**Ứng dụng React Native thuần túy** - Dành cho dự án không sử dụng Expo

**Đặc điểm:**
- ✅ **Framework**: Pure React Native CLI
- ✅ **TrackAsia SDK**: v2.0.3  
- ✅ **React Native**: v0.79.3
- ✅ **Package Manager**: Yarn v4 với node_modules
- ✅ **iOS Setup**: Manual Podfile configuration
- ✅ **TypeScript**: Support với custom types

**Tính năng chính:**
- 🗺️ Component bản đồ tương tự Expo app
- 📍 Point annotations với custom styling  
- 🎯 Event handling cho map interactions
- 🏗️ Architecture sạch với component separation
- ⚙️ Manual native configuration

**Cách sử dụng:**
```bash
cd TrackAsia-react-native-app
yarn install
cd ios && pod install && cd ..
yarn ios            # Chạy trên iOS  
yarn android         # Chạy trên Android
```

**Phù hợp cho:**
- Dự án React Native hiện có
- Ứng dụng cần custom native modules
- Team có kinh nghiệm với native development

---

### 🎯 sample/

**Comprehensive Examples Collection** - Bộ sưu tập ví dụ đầy đủ nhất

**Đặc điểm:**
- ✅ **Architecture**: Expo với shared workspace
- ✅ **TrackAsia SDK**: v2.0.3
- ✅ **React Native**: v0.76.9, Expo SDK ~52.0.39
- ✅ **Navigation**: React Navigation với nested screens
- ✅ **Workspace**: Monorepo setup với shared code
- ✅ **Examples**: 50+ ví dụ được tổ chức theo categories

**Bao gồm các examples:**

📍 **Map Features:**
- Show Map, Local Style JSON, Show Click
- Two Map Views, Offline Region, Pixel Point
- Layer Visibility, Change Colors, Tint Color

📷 **Camera Controls:**
- Fit Bounds, Set Pitch/Heading, Fly To
- Restrict Bounds, Take Snapshots, Yo-yo Effect
- Get Zoom/Center, Compass View

👤 **User Location:**
- Follow User Location (Alignment & Render Mode)
- User Location for Navigation
- Location Updates & Displacement
- Android FPS Configuration

🏷️ **Annotations & Markers:**
- Point Annotations & Anchors
- Custom Icons, Marker Views, Heatmaps
- Custom Callouts, Symbol Layers

🎨 **Styling & Layers:**
- GeoJSON Source, Raster Tiles, Indoor Maps
- Vector Sources, Image Overlays
- Gradient Lines, PMTiles Support

⚡ **Animations:**
- Animate Circle Along Line
- Animated Length/Morph/Size
- Reanimated Points

🔧 **Advanced Features:**
- Clustering (Earthquakes example)
- Data-driven Circle Colors
- Query Features (Point & Bounding Box)
- Cache Management

**Cách sử dụng:**
```bash
cd sample
yarn install
yarn start           # Expo development server
yarn ios             # iOS Simulator
yarn android         # Android Emulator
```

**Phù hợp cho:**
- Học tập và tham khảo implementation
- Test các tính năng trước khi tích hợp
- Hiểu rõ API và best practices

---

### 🚀 Cách chọn dự án phù hợp

| Tiêu chí | TrackAsia-expo-app | TrackAsia-react-native-app | sample |
|----------|-------------------|---------------------------|---------|
| **Độ phức tạp** | Đơn giản | Trung bình | Cao |
| **Expo** | ✅ Có | ❌ Không | ✅ Có |
| **Learning curve** | Thấp | Trung bình | Cao |
| **Examples** | Basic | Basic | Comprehensive |
| **Production ready** | ✅ | ✅ | ❌ (Demo only) |

**Khuyến nghị:**
- **Bắt đầu mới**: `TrackAsia-expo-app`
- **Dự án RN hiện có**: `TrackAsia-react-native-app`  
- **Học tập/Research**: `sample`

Clone repository và khám phá các ví dụ để hiểu rõ hơn cách triển khai các tính năng cụ thể.

### Hỗ Trợ Cộng Đồng
Nếu bạn gặp vấn đề hoặc có câu hỏi:
- Tạo issue trên GitHub
- Kiểm tra các issue hiện có để tìm giải pháp
- Đóng góp cho dự án bằng cách gửi pull requests

## Giấy phép

TrackAsia React Native SDK được phát hành dưới giấy phép MIT. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

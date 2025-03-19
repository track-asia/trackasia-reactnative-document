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
4. [Tính Năng Nâng Cao](#tính-năng-nâng-cao)
5. [Cấu Hình](#cấu-hình)
6. [Xử Lý Sự Cố](#xử-lý-lỗi-phổ-biến)
7. [Tài Liệu Tham Khảo](#tài-liệu-tham-khảo)

## Yêu cầu hệ thống

### React Native
- React Native phiên bản 0.72.6 trở lên
- Node.js 14 trở lên
- npm hoặc yarn

### iOS
- Xcode 12 trở lên
- iOS 12.0 trở lên
- CocoaPods

### Android
- Android Studio
- Android SDK Platform 21 trở lên
- Android Build Tools 29.0.2 trở lên

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

#### Android
1. Thêm quyền vào `AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

2. Cập nhật `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        minSdkVersion 21
    }
}
```

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
        mapStyle="https://maps.track-asia.com/styles/v1/streets.json?key=your_api_key"
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
<MapView
  style={styles.map}
  showUserLocation={true}
  userTrackingMode={UserTrackingModes.Follow}
>
  {/* Các thành phần khác */}
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
[!] Invalid `hermes-engine.podspec` file: No such file or directory @ rb_sysopen - /Volumes/DATA/TRACKASIA-NAVIGATION/trackasia-react-native/examples/expo-app/node_modules/react-native/index.js

# from /Volumes/DATA/TRACKASIA-NAVIGATION/trackasia-react-native/examples/expo-app/node_modules/react-native/sdks/hermes-engine/hermes-engine.podspec:17
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

### Dự Án Mẫu
Repository TrackAsia React Native chứa các dự án mẫu minh họa các tính năng và trường hợp sử dụng khác nhau. Clone repository và khám phá các ví dụ để hiểu rõ hơn cách triển khai các tính năng cụ thể.

### Hỗ Trợ Cộng Đồng
Nếu bạn gặp vấn đề hoặc có câu hỏi:
- Tạo issue trên GitHub
- Kiểm tra các issue hiện có để tìm giải pháp
- Đóng góp cho dự án bằng cách gửi pull requests

## Giấy phép

TrackAsia React Native SDK được phát hành dưới giấy phép MIT. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

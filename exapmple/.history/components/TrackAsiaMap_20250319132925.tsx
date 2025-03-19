import { Camera, MapView, UserLocation } from '@track-asia/trackasia-react-native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

// Import TrackAsia với cơ chế thử/bắt lỗi để xử lý lỗi một cách graceful
let TrackAsiaGL: any = null;
try {
  // Sử dụng require dynamic để tránh TypeScript lint error
  TrackAsiaGL = require('@track-asia/trackasia-react-native');
} catch (e) {
  console.error('Không thể import TrackAsia:', e);
}

interface TrackAsiaMapProps {
  initialCoordinate?: [number, number];
  initialZoom?: number;
  showUserLocation?: boolean;
  enableControls?: boolean;
  onMapReady?: () => void;
  onError?: (errorMsg: string) => void;
}

const TrackAsiaMap: React.FC<TrackAsiaMapProps> = ({
  initialCoordinate = [106.6297, 10.8231], // Default to Ho Chi Minh City coordinates
  initialZoom = 14,
  showUserLocation = false,
  enableControls = true,
  onMapReady,
  onError,
}) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Request location permissions if showUserLocation is true
    if (showUserLocation) {
      requestLocationPermission();
    }
  }, [showUserLocation]);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          const errorMsg = 'Location permission denied';
          setError(errorMsg);
          onError?.(errorMsg);
        }
      }
    } catch (err) {
      const errorMsg = 'Error requesting location permission';
      setError(errorMsg);
      onError?.(errorMsg);
    }
  };

  const handleMapReady = () => {
    setIsMapReady(true);
    onMapReady?.();
  };

  const handleMapError = () => {
    const errorMsg = 'Error loading map';
    setError(errorMsg);
    onError?.(errorMsg);
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Map Error</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.tipText}>
          Please check your internet connection and location permissions
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapStyle="https://maps.track-asia.com/styles/v1/streets.json?key=public_key"
        compassEnabled={enableControls}
        zoomEnabled={enableControls}
        scrollEnabled={enableControls}
        rotateEnabled={enableControls}
        onDidFinishLoadingMap={handleMapReady}
        onDidFailLoadingMap={handleMapError}
      >
        <Camera
          zoomLevel={initialZoom}
          centerCoordinate={initialCoordinate}
          animationDuration={0}
        />
        {showUserLocation && isMapReady && (
          <UserLocation
            renderMode="normal"
            visible={true}
            showsUserHeadingIndicator={true}
          />
        )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  tipText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
});

export default TrackAsiaMap; 
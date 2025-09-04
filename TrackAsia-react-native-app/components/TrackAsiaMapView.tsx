import TrackAsiaGL from '@track-asia/trackasia-react-native';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

// TrackAsia không cần access token

interface TrackAsiaMapViewProps {
  style?: any;
  showUserLocation?: boolean;
  zoomLevel?: number;
  centerCoordinate?: [number, number];
  onMapPress?: (feature: any) => void;
  onUserLocationUpdate?: (location: any) => void;
}

interface TrackAsiaMapViewState {
  isMapReady: boolean;
}

class TrackAsiaMapView extends Component<TrackAsiaMapViewProps, TrackAsiaMapViewState> {
  constructor(props: TrackAsiaMapViewProps) {
    super(props);
    this.state = {
      isMapReady: false,
    };
  }

  static defaultProps = {
    showUserLocation: true,
    zoomLevel: 10,
    centerCoordinate: [106.6297, 10.8231], // Ho Chi Minh City coordinates
  };

  onMapReady = () => {
    this.setState({ isMapReady: true });
    console.log('TrackAsia Map is ready');
  };

  onMapPress = (feature: any) => {
    console.log('Map pressed:', feature);
    if (this.props.onMapPress) {
      this.props.onMapPress(feature);
    }
  };

  render() {
    const { style, zoomLevel, centerCoordinate } = this.props;
    const { isMapReady } = this.state;

    return (
      <View style={[styles.container, style]}>
        <TrackAsiaGL.MapView
          style={styles.map}
          styleURL="https://tiles.track-asia.com/tiles/v3/style-streets.json?key=public"
          onPress={this.onMapPress}
          onDidFinishLoadingMap={this.onMapReady}
        >
          <TrackAsiaGL.Camera
            zoomLevel={zoomLevel || 10}
            centerCoordinate={centerCoordinate || [106.6297, 10.8231]}
            animationMode="flyTo"
            animationDuration={1000}
          />

          <TrackAsiaGL.PointAnnotation
            id="marker"
            coordinate={centerCoordinate || [106.6297, 10.8231]}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>📍</Text>
            </View>
          </TrackAsiaGL.PointAnnotation>
        </TrackAsiaGL.MapView>

        {!isMapReady && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Đang tải bản đồ...</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
  },
  marker: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#007AFF',
    borderWidth: 2,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: {
    fontSize: 20,
  },
});

export default TrackAsiaMapView; 
import { Camera, MapView, MarkerView, UserLocation } from '@track-asia/trackasia-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AdvancedMapProps {
  initialCoordinate?: [number, number];
  initialZoom?: number;
  enableControls?: boolean;
}

const AdvancedMap: React.FC<AdvancedMapProps> = ({
  initialCoordinate = [106.6297, 10.8231],
  initialZoom = 14,
  enableControls = true,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<[number, number] | null>(null);

  const markers = [
    { id: 1, coordinate: [106.6297, 10.8231], title: 'Ho Chi Minh City' },
    { id: 2, coordinate: [106.6297, 10.8331], title: 'District 1' },
    { id: 3, coordinate: [106.6297, 10.8131], title: 'District 3' },
  ];

  const handleMarkerPress = (coordinate: [number, number]) => {
    setSelectedMarker(coordinate);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapStyle="https://tiles.track-asia.com/tiles/v3/style-streets.json?key=public"
        compassEnabled={enableControls}
        zoomEnabled={enableControls}
        scrollEnabled={enableControls}
        rotateEnabled={enableControls}
      >
        <Camera
          zoomLevel={initialZoom}
          centerCoordinate={initialCoordinate}
        />
        <UserLocation visible={true} />
        {/* {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate as [number, number]}
            title={marker.title}
            onSelected={() => handleMarkerPress(marker.coordinate as [number, number])}
          />
        ))} */}
      </MapView>
      {selectedMarker && (
        <TouchableOpacity
          style={styles.markerInfo}
          onPress={() => setSelectedMarker(null)}
        >
          <Text style={styles.markerText}>
            Selected Location: {selectedMarker[0].toFixed(4)}, {selectedMarker[1].toFixed(4)}
          </Text>
        </TouchableOpacity>
      )}
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
  markerInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  markerText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AdvancedMap; 
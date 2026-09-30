import * as Location from 'expo-location';

export interface LocationCoords {
  latitude: number;
  longitude: number;
  locationName: string;
}

export const DEFAULT_KUMBH_COORDS: LocationCoords = {
  latitude: 19.9975,
  longitude: 73.7898,
  locationName: 'Ramkund Ghat, Sector 1, Nashik',
};

export const getCurrentPilgrimLocation = async (): Promise<LocationCoords> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      let locationName = `GPS: ${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`;
      try {
        const [geocode] = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        if (geocode) {
          const parts = [
            geocode.name,
            geocode.street,
            geocode.district || geocode.subregion,
            geocode.city,
          ].filter(Boolean);
          if (parts.length > 0) {
            locationName = parts.join(', ');
          }
        }
      } catch (_) {}

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        locationName,
      };
    }
  } catch (error) {
    console.warn('Location retrieval error:', error);
  }

  // Fallback default coordinates within Nashik Kumbh Mela area
  return DEFAULT_KUMBH_COORDS;
};

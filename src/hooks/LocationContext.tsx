import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';

import Geolocation, { GeoPosition } from 'react-native-geolocation-service';


interface locationContextData {
  currentLocation: Location;
}

interface Location {
  lat: number;
  lon: number;
}

export const LocationContext = createContext<locationContextData>({} as locationContextData);

export const LocationProvider: React.FC = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location>({ lat: -15.780107, lon: -48.140725 });
  const [location, setLocation] = useState<GeoPosition | null>(null);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  async function getLocation() {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setCurrentLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  }

  useEffect(() => {
    let isSubscribed = true;
    getLocation();

    return () => { isSubscribed = false }
  }, [currentLocation.lat]);

  return (
    <LocationContext.Provider value={{
      currentLocation,
    }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation(): locationContextData {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}



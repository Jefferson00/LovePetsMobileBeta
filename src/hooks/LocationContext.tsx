import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';


interface locationContextData{
  currentLocation: Location;
}

interface Location {
  lat: string;
  lon: string;
}

export const LocationContext = createContext<locationContextData>({} as locationContextData);

export const LocationProvider : React.FC = ({children}) => {
  const [currentLocation, setCurrentLocation] = useState<Location>({lat: '-15.780107', lon: '-48.140725'});

  useEffect(() => {
    async function getLocation(){

    }

    getLocation()
  },[currentLocation.lat]);

  return(
    <LocationContext.Provider value={{
      currentLocation
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



import React from 'react';

import { AuthProvider } from "./AuthContext";
import { LocationProvider } from "./LocationContext";
import { FilterProvider } from "./FilterContext";
import { PetsProvider } from "./PetsContext";

const AppProvider: React.FC = ({ children }) => (
  <LocationProvider>
    <FilterProvider>
      <PetsProvider>
        <AuthProvider>{children}</AuthProvider>
      </PetsProvider>
    </FilterProvider>
  </LocationProvider>
)

export default AppProvider;

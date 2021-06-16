import React from 'react';

import { AuthProvider } from "./AuthContext";
import { LocationProvider } from "./LocationContext";
import {FilterProvider} from "./FilterContext";

const AppProvider: React.FC = ({ children }) => (
  <LocationProvider>
    <FilterProvider>
      <AuthProvider>{children}</AuthProvider>
    </FilterProvider>
  </LocationProvider>
)

export default AppProvider;

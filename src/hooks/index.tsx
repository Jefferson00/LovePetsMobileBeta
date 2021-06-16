import React from 'react';

import { AuthProvider } from "./AuthContext";
import { LocationProvider } from "./LocationContext";

const AppProvider: React.FC = ({ children }) => (
  <LocationProvider>
    <AuthProvider>{children}</AuthProvider>
  </LocationProvider>
)

export default AppProvider;

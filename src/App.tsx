import 'react-native-gesture-handler';
import React from 'react';

import { View, StatusBar } from 'react-native';

import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';
import  AppProvider  from './hooks';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" translucent backgroundColor="transparent"/>
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#FFF6F6' }}>
          <Routes />
        </View>
      </AppProvider>
  </NavigationContainer>

);

export default App;

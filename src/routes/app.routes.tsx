import React from  'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Profile from '../pages/Profile';


const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#FFF6F6',
      },
    }}
  >
    <App.Screen name="Home" component={Home}/>
    <App.Screen name="Profile" component={Profile}/>
  </App.Navigator>
);

export default AppRoutes;

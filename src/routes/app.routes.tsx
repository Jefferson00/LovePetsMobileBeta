import React from  'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import UpdateProfile from '../pages/Profile/updateProfile';
import CreatePet from '../pages/Pets/CreatePet';
import MyPets from '../pages/Pets/MyPets';


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
    <App.Screen name="UpdateProfile" component={UpdateProfile}/>
    <App.Screen name="CreatePet" component={CreatePet}/>
    <App.Screen name="MyPets" component={MyPets}/>


  </App.Navigator>
);

export default AppRoutes;

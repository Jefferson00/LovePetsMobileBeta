import React from  'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Forgot from '../pages/ForgotPassword';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#ffffff',
      },
    }}
  >
    <Auth.Screen name="Welcome" component={Welcome}/>
    <Auth.Screen name="SignIn" component={SignIn}/>
    <Auth.Screen name="Forgot" component={Forgot}/>
    <Auth.Screen name="SignUp" component={SignUp}/>
    <Auth.Screen name="Home" component={Home}/>
  </Auth.Navigator>
);

export default AuthRoutes;


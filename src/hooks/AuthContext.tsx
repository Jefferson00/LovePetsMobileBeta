import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { usePets } from './PetsContext';
import { Settings, LoginManager, AccessToken } from 'react-native-fbsdk-next';

import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import GoogleSignin from '../libs/GoogleSignin';

Settings.initializeSDK();

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  phone: string | null;
  avatar_url: string | null;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  name: string;
  password: string;
  phone: string;
  avatar: string | null;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  socialAuthenticationError: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  updateUser: (user: User) => void;
  signInGoogle: () => void;
  signInFacebook: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const { resetPetsStates } = usePets();

  const [authData, setAuthData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  const [socialAuthenticationError, setSocialAuthenticationError] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@LovePetsBeta:token',
        '@LovePetsBeta:user'
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setAuthData({ token: token[1], user: JSON.parse(user[1]) })
      } else {
        api.defaults.headers.authorization = null;
        setAuthData({} as AuthState);
      }

      setLoading(false);
    }

    loadStorageData();
    return () => { isSubscribed = false }
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ['@LovePetsBeta:token', token],
        ['@LovePetsBeta:user', JSON.stringify(user)]
      ]);

      api.defaults.headers.authorization = `Bearer ${token}`;

      setAuthData({ token, user });

      return user;
    } catch (error) {
      console.log(error)
    }
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    await AsyncStorage.multiRemove([
      '@LovePetsBeta:token',
      '@LovePetsBeta:user'
    ]);

    setAuthData({} as AuthState);
    resetPetsStates();
    setLoading(false);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@LovePetsBeta:user', JSON.stringify(user));
      setAuthData({
        token: authData.token,
        user,
      });
    },
    [setAuthData, authData.token],
  );

  const createAndUpdateUser = useCallback(async (data: SignUpData) => {
    setLoading(true);
    try {
      await api.post('/users', data);
    } catch (error) {
      console.log(error)
    }
    try {
      const user = await signIn({ email: data.email, password: data.password })

      if (!user.avatar) {
        const formData = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          avatar: data.avatar,
        }
        const response = await api.put('/profile', formData);

        updateUser(response.data);
      }
    } catch (error) {
      console.log('_____ ' + error)
    }
    setLoading(false);
  }, [signIn]);

  const signInGoogle = useCallback(async () => {
    setSocialAuthenticationError(false);
    try {
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const userCredential = await auth().signInWithCredential(googleCredential);

      const user = userCredential.user

      if (user.email && user.displayName) {
        const data: SignUpData = {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber ? user.phoneNumber : '',
          password: user.uid,
          avatar: user.photoURL,
        }
        createAndUpdateUser(data);
      }
    } catch (error) {
      setSocialAuthenticationError(true);
    }
  }, [])

  const signInFacebook = useCallback(async () => {
    setSocialAuthenticationError(false);
    try {
      LoginManager.logOut();

      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      const userCredential = await auth().signInWithCredential(facebookCredential);

      const user = userCredential.user;
      const token = facebookCredential.token;

      if (user.email && user.displayName) {
        const data: SignUpData = {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber ? user.phoneNumber : '',
          password: user.uid,
          avatar: user.photoURL + `?access_token=${token}`,
        }
        createAndUpdateUser(data);
      }
    } catch (error) {
      setSocialAuthenticationError(true);
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user: authData.user,
      loading,
      socialAuthenticationError,
      signIn,
      signOut,
      updateUser,
      signInGoogle,
      signInFacebook,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}



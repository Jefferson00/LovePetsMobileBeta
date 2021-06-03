import React from 'react';
import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';


/*interface AuthResponseProps extends firebase.auth.AuthCredential{
    accessToken:string;
}*/

/*interface ResponseFirebaseProps extends firebase.auth.UserCredential{
    credential: AuthResponseProps | null;
}*/

interface User{
    id:string;
    name:string;
    email:string;
    avatar: string | null;
    phone:string | null;
    avatar_url: string | null;
}

interface AuthState{
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface SignUpData{
    email:string;
    name:string;
    password:string;
    phone:string;
    avatar: string | null;
}

interface AuthContextData{
    user: User;
    loading:boolean;
    socialAuthenticationError: string | null;
    signIn: (credentials : SignInCredentials) => Promise<void>;
    signOut: () => void;
    updateUser: (user: User) => void;
    handleToSignUp: () => void;
    handleToSignIn: () => void;
    handleToForgotPassword: () => void;
    signInGoogle: () => void;
    signInFacebook: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider : React.FC = ({children}) => {
    const [authData, setAuthData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);
    const [socialAuthenticationError, setSocialAuthenticationError] = useState<string | null>(null);

    //const navigation = useNavigation();

    useEffect(()=>{
      async function loadStorageData() : Promise<void>{
        const [token, user] = await AsyncStorage.multiGet([
          '@LovePetsBeta:token',
          '@LovePetsBeta:user'
        ]);

        if (token[1] && user[1]) {
          setAuthData({token: token[1], user: JSON.parse(user[1])})
        }else{
          setAuthData({} as AuthState);
        }

        setLoading(false);
      }

      loadStorageData();
    },[])

    useEffect(() =>{
        if(authData.user !== undefined || authData.user === null) {
            setLoading(false);
        }
    },[authData.user])

    const signIn = useCallback(async ({email, password}) =>{
        const response = await api.post('sessions', {
            email,
            password,
        })

        const { token, user } = response.data;

        await AsyncStorage.multiSet([
         ['@LovePetsBeta:token', token],
         ['@LovePetsBeta:user', JSON.stringify(user)]
        ]);

        api.defaults.headers.authorization = `Bearer ${token}`;

        setAuthData({token, user})

        return user;
     },[])

    const signOut = useCallback(async() => {
        await AsyncStorage.multiRemove([
          '@LovePetsBeta:token',
          '@LovePetsBeta:user'
        ]);

        setAuthData({} as AuthState);

       // navigation.navigate('SignIn');
    }, []);

    const updateUser = useCallback(
        (user: User) => {
          setAuthData({
            token: authData.token,
            user,
          });
         // localStorage.setItem('@LovePetsBeta:user', JSON.stringify(user));
        },
        [setAuthData, authData.token],
      );

    const handleToSignUp = useCallback(()=>{
        //setFormState('signUp');
    },[]);

    const handleToSignIn = useCallback(() =>{
        //setFormState('signIn');
    },[]);

    const handleToForgotPassword = useCallback(() =>{
        //setFormState('forgot');
    },[])

    const createAndUpdateUser = useCallback(async(data:SignUpData) => {
        /*try {
            await api.post('/users', data );
        } catch (error){
            console.log(error)
        }
        try {
            const user = await signIn({email: data.email, password: data.password })

            if(!user.avatar){
                const formData = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    avatar: data.avatar,
                }
                const response = await api.put('/profile', formData );

                updateUser(response.data);
            }
        }catch (error){
            //setSocialAuthenticationError(error.message);
        }*/
    }, [signIn])

    const signInGoogle = useCallback(() =>{
        /*try {
            setLoading(true);
            return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response : ResponseFirebaseProps) => {
                const user = response.user;

                const data: SignUpData ={
                    name: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber ? user.phoneNumber : '',
                    password: user.uid, //verificar se é seguro
                    avatar: user.photoURL,
                }

                createAndUpdateUser(data);
            }).catch((error) =>{
                console.log('errr' + error)
                setSocialAuthenticationError(error.message);
            })
        } finally {
            setLoading(false);
        }*/
    },[])

    const signInFacebook = useCallback(() =>{
        /*try {
            setLoading(true);
            return firebase
            .auth()
            .signInWithPopup(new firebase.auth.FacebookAuthProvider().addScope('public_profile'))
            .then((response : ResponseFirebaseProps) => {
                const token = response.credential.accessToken;
                const user = response.user;

                const data: SignUpData ={
                    name: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber ? user.phoneNumber : '',
                    password: user.uid, //verificar se é seguro
                    avatar: user.photoURL+`?access_token=${token}`,
                }

                createAndUpdateUser(data);
            }).catch((error) =>{
                console.log('errr' + error)
                setSocialAuthenticationError(error.message);
            })
        }finally {
            setLoading(false);
            setSocialAuthenticationError(null);
        }*/
    },[])

    return(
        <AuthContext.Provider value={{
            user: authData.user,
            loading,
            socialAuthenticationError,
            signIn,
            signOut,
            updateUser,
            handleToSignIn,
            handleToSignUp,
            handleToForgotPassword,
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



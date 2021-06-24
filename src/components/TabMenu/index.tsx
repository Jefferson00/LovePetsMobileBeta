import React, { useCallback } from 'react';

import {Container, MenuButton, CreateNewButton} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/AuthContext';
import { useRoute } from '@react-navigation/native';

const TabMenu : React.FC = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const routeName = routes.name;
  const {user} = useAuth();

  const handleToProfile = useCallback(() => {
    if (user){
      navigation.navigate('Profile');
    }else{
      navigation.navigate('SignIn');
    }
  }, [user, navigation]);

  const handleToHome = useCallback(() => {
    navigation.navigate('Home');

  }, [navigation]);

  const handleToCreatePet = useCallback(() => {
    if (user){
      navigation.navigate('CreatePet');
    }else{
      navigation.navigate('SignIn');
    }
  }, [user, navigation]);

  const handleToMyPets = useCallback(() => {
    if (user){
      navigation.navigate('MyPets');
    }else{
      navigation.navigate('SignIn');
    }
  }, [user, navigation]);

  const handleToFavPets = useCallback(() => {
    if (user){
      navigation.navigate('FavPets');
    }else{
      navigation.navigate('SignIn');
    }
  }, [user, navigation]);

  return(
    <Container>
      <MenuButton
        onPress={handleToHome}
        hitSlop={{top:6, left: 6, right: 6, bottom:6}}
      >
        <Icon
          name="home"
          size={25}
          color={routeName === 'Home' ? "#F43434" : "#ABABAB"}
        />
      </MenuButton>
      <MenuButton
        onPress={handleToFavPets}
        hitSlop={{top:6, left: 6, right: 6, bottom:6}}
      >
        <Icon
          name="heart"
          size={25}
          color={routeName === 'FavPets' ? "#F43434" : "#ABABAB"}
        />
      </MenuButton>
      <CreateNewButton
        onPress={handleToCreatePet}
        hitSlop={{top:6, left: 6, right: 6, bottom:6}}
      >
        <Icon
          name="add"
          size={40}
          color="#FFFFFF"
        />
      </CreateNewButton>
      <MenuButton
        onPress={handleToMyPets}
        hitSlop={{top:6, left: 6, right: 6, bottom:6}}
      >
        <Icon
          name="paw"
          size={25}
          color={routeName === 'MyPets' ? "#F43434" : "#ABABAB"}
        />
      </MenuButton>
      <MenuButton
        onPress={handleToProfile}
        hitSlop={{top:6, left: 6, right: 6, bottom:6}}
      >
        <Icon
          name="person"
          size={25}
          color={routeName === 'Profile' || routeName === 'UpdateProfile' ? "#F43434" : "#ABABAB"}
        />
      </MenuButton>
    </Container>
  )
}

export default TabMenu;

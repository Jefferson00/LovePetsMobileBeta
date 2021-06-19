import React, { useCallback } from 'react';

import {Container, MenuButton, CreateNewButton} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/AuthContext';

const TabMenu : React.FC = () => {
  const navigation = useNavigation();
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
      <MenuButton onPress={handleToHome}>
        <Icon name="home" size={25} color="#ABABAB"/>
      </MenuButton>
      <MenuButton onPress={handleToFavPets}>
        <Icon name="heart" size={25} color="#ABABAB"/>
      </MenuButton>
      <CreateNewButton onPress={handleToCreatePet}>
        <Icon name="plus" size={40} color="#FFFFFF"/>
      </CreateNewButton>
      <MenuButton onPress={handleToMyPets}>
        <Icon name="book" size={25} color="#ABABAB"/>
      </MenuButton>
      <MenuButton onPress={handleToProfile}>
        <Icon name="user" size={25} color="#ABABAB"/>
      </MenuButton>
    </Container>
  )
}

export default TabMenu;

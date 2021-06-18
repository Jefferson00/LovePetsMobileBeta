import React from 'react';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  UserProfileContainer,
  ImageContainer,
  UserAvatar,
  UserName,
  LocationText,
  EditContainer,
  EditText,
  ProfileButton,
  ProfileButtonText,

} from './styles';

import TabMenu from '../../components/TabMenu';
import { useAuth } from '../../hooks/AuthContext';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/core';

import DefaultImg from '../../assets/default.png';

const Profile: React.FC = () => {
  const {signOut, user} = useAuth();
  const navigation = useNavigation();

  return (
    <>
    <Container>
      <Header title="Perfil"/>

      <UserProfileContainer>
        <ImageContainer>
          {user.avatar_url ?
            <UserAvatar source={{uri: user.avatar_url}} />
            :
            <UserAvatar source={DefaultImg} />
          }
        </ImageContainer>

        <UserName>
          {user.name}
        </UserName>
        <LocationText>
          Brasília-DF
        </LocationText>

        <EditContainer onPress={() => navigation.navigate('UpdateProfile')}>
          <Icon name="edit-2" size={20} color="#12BABA"/>
          <EditText>
            Editar Perfil
          </EditText>
        </EditContainer>

      </UserProfileContainer>

      <ProfileButton onPress={() => navigation.navigate('MyPets')}>
        <ProfileButtonText>
          Meus Anúncios
        </ProfileButtonText>
      </ProfileButton>

      <ProfileButton>
        <ProfileButtonText>
          Meus Favoritos
        </ProfileButtonText>
      </ProfileButton>

      <ProfileButton>
        <ProfileButtonText>
          Ajuda
        </ProfileButtonText>
      </ProfileButton>

      <ProfileButton onPress={signOut}>
        <ProfileButtonText>
          Sair
        </ProfileButtonText>
      </ProfileButton>

      <ProfileButton style={{backgroundColor:'#BA1212'}}>
        <ProfileButtonText style={{color: '#FFFFFF'}}>
          Excluir conta
        </ProfileButtonText>
      </ProfileButton>

    </Container>
    <TabMenu/>
    </>
  )
}

export default Profile;

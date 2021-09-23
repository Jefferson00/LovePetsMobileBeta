import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';

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
import ModalComponent from '../../components/Modal';
import api from '../../services/api';

const Profile: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteOpenModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleDeleteAccount = useCallback(async () => {
    await api.delete('users');
    setModalVisible(false);
    signOut();
  }, []);

  const handleCancelDelete = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <>
      <Header title="Perfil" />
      <ScrollView>
        <Container>

          <UserProfileContainer>
            <ImageContainer>
              {user.avatar_url ?
                <UserAvatar source={{ uri: user.avatar_url }} />
                :
                <UserAvatar source={DefaultImg} />
              }
            </ImageContainer>

            <UserName>
              {user.name}
            </UserName>
            {/*<LocationText>
            Brasília-DF
          </LocationText>*/}

            <EditContainer onPress={() => navigation.navigate('UpdateProfile')}>
              <Icon name="edit-2" size={20} color="#12BABA" />
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

          <ProfileButton onPress={() => navigation.navigate('FavPets')}>
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

          <ProfileButton style={{ backgroundColor: '#BA1212' }} onPress={handleDeleteOpenModal}>
            <ProfileButtonText style={{ color: '#FFFFFF' }}>
              Excluir conta
            </ProfileButtonText>
          </ProfileButton>

          <ModalComponent
            title="Deseja excluir seu conta?"
            type="confirmation"
            icon={() => (
              <Icon name="alert-circle" size={45} color='#BA1212' />
            )}
            transparent
            visible={modalVisible}
            handleCancel={handleCancelDelete}
            handleConfirm={handleDeleteAccount}
            animationType="slide"
          />

        </Container>
      </ScrollView>

      <TabMenu />
    </>
  )
}

export default Profile;

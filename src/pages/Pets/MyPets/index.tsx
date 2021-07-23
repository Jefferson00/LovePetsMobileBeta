import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePets } from '../../../hooks/PetsContext';
import { IPetsData } from '../../../@types/Pets/IPetsData';

import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Header from '../../../components/Header';
import TabMenu from '../../../components/TabMenu';
import ModalComponent from '../../../components/Modal';


import {
  Container,
  CardPet,
  DeleteButton,
  DeleteContainer,
  EditButton,
  EditText,
  ImagePet,
  InfoContainer,
  Title,
  InfoText,
  NoResultView,
} from './styles';


const MyPets: React.FC = () => {
  const navigation = useNavigation();
  const {
    myPets,
    loadMyPets,
    handleSelectMyPet,
    handleDeleteMyPet,
    handleUnselectMyPet,
  } = usePets();

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteOpenModal = useCallback((pet: IPetsData) => {
    setModalVisible(true);
    handleSelectMyPet(pet);
  }, [handleSelectMyPet]);

  const handleDeletePet = useCallback(async () => {
    await handleDeleteMyPet();
    setModalVisible(false);
  }, [handleDeleteMyPet]);

  const handleCancelDeletePet = useCallback(() => {
    setModalVisible(false);
    handleUnselectMyPet();
  }, [handleUnselectMyPet]);

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);

    loadMyPets().finally(() => setLoading(false));
    return () => { isSubscribed = false }
  }, [myPets]);

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color="#F43434" />
      </View>
    )
  }

  return (
    <>
      <Header title="Meus Anúncios" />
      <Container>
        {myPets.length === 0 ?
          <NoResultView>
            <Title>
              Sem anúncios ainda.
            </Title>
            <Icon name="paw" size={160} color="#12BABA" />
          </NoResultView>
          :
          <>
            <FlatList
              data={myPets}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item: IPetsData) => item.id}
              renderItem={({ item }: { item: IPetsData }) => (
                <CardPet>
                  {(item.images.length > 0 && item.images[0].image_url) && (
                    <ImagePet source={{ uri: item.images[0].image_url }} />
                  )}
                  <Title>
                    {item.name}
                  </Title>

                  <InfoContainer>
                    <InfoText>
                      {item.age}
                    </InfoText>

                    {item.gender === 'male' ?
                      (
                        <Icon name="male" size={20} color='#129CBA' style={{ marginLeft: 25 }} />
                      ) :
                      (
                        <Icon name="female" size={20} color='#ED9090' style={{ marginLeft: 25 }} />
                      )
                    }
                  </InfoContainer>

                  <EditButton
                    onPress={() => navigation.navigate('UpdatePets', {
                      pet: item
                    })}
                    hitSlop={{ top: 6, left: 6, right: 6, bottom: 6 }}
                  >
                    <FeatherIcon name="edit-2" size={20} color='#12BaBA' style={{ marginRight: 6 }} />
                    <EditText>
                      Editar anúncio
                    </EditText>
                  </EditButton>

                  <DeleteContainer>
                    <DeleteButton
                      onPress={() => handleDeleteOpenModal(item)}
                      hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                    >
                      <Icon name="trash" size={20} color='#BA1212' />
                    </DeleteButton>
                  </DeleteContainer>
                </CardPet>
              )}
            />

            <ModalComponent
              title="Deseja excluir seu anúncio?"
              type="confirmation"
              icon={() => (
                <Icon name="alert-circle" size={45} color='#BA1212' />
              )}
              transparent
              visible={modalVisible}
              handleCancel={handleCancelDeletePet}
              handleConfirm={handleDeletePet}
              animationType="slide"
            />
          </>
        }
      </Container>
      <TabMenu />
    </>
  )
}

export default MyPets;

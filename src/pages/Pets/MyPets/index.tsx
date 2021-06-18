import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import api from '../../../services/api';
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
} from './styles';

interface PetImages{
  id:string;
  pet_id:string;
  image:string;
  image_url:string | null;
}

interface PetsData{
  id:string;
  name: string;
  description: string;
  species: string;
  age: string;
  gender: string;
  is_adopt: boolean;
  location_lat: string;
  location_lon: string;
  city: string;
  state: string;
  image: PetImages[];
}

const MyPets: React.FC = () => {
  const navigation = useNavigation();
  const [myPets, setMyPets] = useState<PetsData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pet, setPet] = useState<PetsData>({} as PetsData);

  let pets: PetsData[];
  const loadPets = useCallback( async() => {
    const response = await api.get('/pets/me');

    pets = response.data;
    pets = await setPetImages(pets);

    setMyPets(pets);
  }, []);

  const setPetImages = useCallback(async(petsArr: PetsData[]): Promise<PetsData[]> => {
    const mapPromises = petsArr.map(async (pet) => {
      let petsWithImages = Object.assign({}, pet)
      petsWithImages.image = await findPetImages(pet.id);

      return petsWithImages;
    });
    return await Promise.all(mapPromises);
  }, []);

  const findPetImages = useCallback(async(pet_id:string) : Promise<PetImages[]> => {
    let images: PetImages[] = []
      try {
        const response = await api.get(`/images/${pet_id}`)
        images = response.data;
      } catch (error) {
      }
      return images;
}, []);

  const handleDeleteOpenModal = useCallback((pet: PetsData) => {
    setModalVisible(true);
    setPet(pet);
  }, []);

  const handleDeletePet = useCallback(async() => {
    try {
      await api.delete(`pets/${pet?.id}`);

      setMyPets(myPets.filter(mypets => mypets.id !== pet.id));

      setModalVisible(false);
    } catch (error) {
      setModalVisible(false);
    }
  }, [pet]);

  const handleCancelDeletePet = useCallback(() => {
    setModalVisible(false);
    setPet({} as PetsData);
  }, [pet]);



  useEffect(() => {
    loadPets();
  },[])

  return (
    <>
    <Header title="Meus Anúncios"/>
      <Container>
        <FlatList
          data={myPets}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: PetsData) => item.id}
          renderItem={({item} : {item:PetsData}) => (
            <CardPet>
              {(item.image.length > 0 && item.image[0].image_url) && (
                <ImagePet source={{uri: item.image[0].image_url}}/>
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
                    <Icon name="male" size={20} color='#129CBA' style={{marginLeft:25}}/>
                  ):
                  (
                    <Icon name="female" size={20} color='#ED9090' style={{marginLeft:25}}/>
                  )
                }
              </InfoContainer>

              <EditButton
                onPress={() => navigation.navigate('UpdatePets', {
                  pet: item
                })}
              >
                <FeatherIcon name="edit-2" size={20} color='#12BaBA' style={{marginRight:6}}/>
                <EditText>
                  Editar anúncio
                </EditText>
              </EditButton>

              <DeleteContainer>
                <DeleteButton onPress={() => handleDeleteOpenModal(item)}>
                  <Icon name="trash" size={20} color='#BA1212'/>
                </DeleteButton>
              </DeleteContainer>
            </CardPet>
          )}
        >

        </FlatList>

      <ModalComponent
        title="Deseja excluir seu anúncio?"
        type="confirmation"
        icon={() => (
          <Icon name="alert-circle" size={45} color='#BA1212'/>
        )}
        transparent
        visible={modalVisible}
        handleCancel={handleCancelDeletePet}
        handleConfirm={handleDeletePet}
        animationType="slide"
      />
      </Container>
      <TabMenu/>
    </>
  )
}

export default MyPets;

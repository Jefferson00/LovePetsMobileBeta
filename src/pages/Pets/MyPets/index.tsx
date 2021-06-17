import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import api from '../../../services/api';
import Header from '../../../components/Header';
import TabMenu from '../../../components/TabMenu';

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

interface PetsData{
  id:string;
  name:string;
  age:string;
  gender:string;
  image_url:string | null;
}

const MyPets: React.FC = () => {
  const [myPets, setMyPets] = useState<PetsData[]>([]);

  const loadPets = useCallback( async() => {
    let pets: PetsData[]
    const response = await api.get('/pets/me');

    pets = response.data;
    pets = await setPetImages(pets);

    setMyPets(pets);
  }, []);

  const setPetImages = useCallback(async(petsArr: PetsData[]): Promise<PetsData[]> => {
    const mapPromises = petsArr.map(async (pet) => {
      let petsWithImages = Object.assign({}, pet)
      petsWithImages.image_url = await findPetImages(pet.id);

      return petsWithImages;
    });
    return await Promise.all(mapPromises);
  }, []);

  const findPetImages = useCallback(async(pet_id:string) : Promise<string | null> => {
    let image_url:string | null = null;
    try {
      const response = await api.get(`/images/${pet_id}`)
      image_url = response.data[0].image_url;
    } catch (error) {
    }
    return image_url;
}, []);

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
              {item.image_url && (
                <ImagePet source={{uri: item.image_url}}/>
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

              <EditButton>
                <FeatherIcon name="edit-2" size={20} color='#12BaBA' style={{marginRight:6}}/>
                <EditText>
                  Editar anúncio
                </EditText>
              </EditButton>

              <DeleteContainer>
                <DeleteButton>
                  <Icon name="trash" size={20} color='#BA1212'/>
                </DeleteButton>
              </DeleteContainer>
            </CardPet>
          )}
        >

        </FlatList>

      </Container>
      <TabMenu/>
    </>
  )
}

export default MyPets;

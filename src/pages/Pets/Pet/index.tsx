import React, { useCallback, useEffect, useState } from 'react';

import {
  Container,
  CardItem,
  PetImage,
  GenderContainer,
} from './styles';

import TabMenu from '../../../components/TabMenu';
import CardContent from '../../../components/CardContent';
import Icon from 'react-native-vector-icons/Ionicons';


import PetImg from '../../assets/pet.png';
import api from '../../../services/api';
import { Dimensions, FlatList, ActivityIndicator } from 'react-native';

import { IPetsData, IPetImages } from '../../../@types/Pets/IPetsData';

interface PetPageProps {
  pet_id: string;
}

const Pet: React.FC<PetPageProps> = ({ pet_id }) => {
  const [pet, setPet] = useState<IPetsData>();
  const [windowWidth, setWindowWidth] = useState<number>();
  const [loading, setLoading] = useState(false);

  let petVar: IPetsData;


  async function loadPets() {
    const response = await api.get(`/pets/find/${pet_id}`);
    petVar = response.data;
    petVar = await setPetImages(petVar);

    setPet(petVar);
  }

  const setPetImages = useCallback(async (pet: IPetsData): Promise<IPetsData> => {
    let petsWithImages = Object.assign({}, pet)
    petsWithImages.images = await findPetImages(pet.id);

    return petsWithImages;
  }, []);

  const findPetImages = useCallback(async (pet_id: string): Promise<IPetImages[]> => {
    let images: IPetImages[] = []
    try {
      const response = await api.get(`/images/${pet_id}`)
      images = response.data;
    } catch (error) {
    }
    return images;
  }, []);

  useEffect(() => {
    setLoading(true);
    loadPets().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setWindowWidth((Dimensions.get('window').width) - 34);
  }, []);

  return (
    <>
      <Container>
        {!loading && pet ?
          <CardItem>
            {pet.images.length > 0 ?
              <FlatList
                data={pet.images}
                style={{ flex: 1 }}
                keyExtractor={(item: IPetImages) => item.id as string}
                renderItem={({ item }: { item: IPetImages }) => (
                  item.image_url ?
                    <PetImage
                      source={{ uri: item.image_url }}
                      style={{ width: windowWidth }}
                    />
                    :
                    <></>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ borderRadius: 20, overflow: 'hidden' }}
              />
              :
              <PetImage source={PetImg} />
            }
            <GenderContainer>
              {pet.gender === 'male' ?
                (
                  <Icon name="male" size={20} color='#129CBA' />
                ) :
                (
                  <Icon name="female" size={20} color='#ED9090' />
                )
              }
            </GenderContainer>

            <CardContent item={pet} />
          </CardItem>
          :
          <ActivityIndicator color="#ba1212" />
        }
      </Container>
      <TabMenu />
    </>
  )
}

export default Pet;

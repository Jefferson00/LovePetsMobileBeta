import React, { useCallback, useEffect, useState } from 'react';

import {
  Container,
  CardItem,
  PetImage,
  GenderContainer,
  EmptyContainer,
  EmptyText,
} from './styles';

import TabMenu from '../../components/TabMenu';
import FilterMenu from '../../components/FilterMenu';
import CardContent from '../../components/CardContent';
import Icon from 'react-native-vector-icons/Ionicons';


import PetImg from '../../assets/pet.png';
import api from '../../services/api';
import { Dimensions, FlatList, ActivityIndicator } from 'react-native';

import { useLocation } from '../../hooks/LocationContext';
import { useFilter } from '../../hooks/FilterContext';
import { usePets } from '../../hooks/PetsContext';
import { useAuth } from '../../hooks/AuthContext';

import { IPetsData, IPetImages } from '../../@types/Pets/IPetsData';

const Home: React.FC = () => {
  const { loadFavs } = usePets();
  const { user } = useAuth();
  const { currentLocation } = useLocation();
  const { distance, specieFilter, genderFilter, page, handleSetPage } = useFilter();

  const [pets, setPets] = useState<IPetsData[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>();
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);

  let petsArr: IPetsData[] = [];


  async function loadPets() {
    try {
      if (currentLocation.lat && currentLocation.lon) {
        const response = await api.get('/pets', {
          params: {
            location_lat: currentLocation.lat,
            location_lon: currentLocation.lon,
            distance: distance,
            species: specieFilter,
            gender: genderFilter,
            limit: 5,
            skip: page,
          },
        });
        petsArr = response.data;
        petsArr = await setPetImages(petsArr);

        if (page > 1) {
          setPets([...pets, ...petsArr]);
        } else {
          setPets(petsArr);
        }
      }
    } catch (error) {

    }
  }

  const setPetImages = useCallback(async (petsArr: IPetsData[]): Promise<IPetsData[]> => {
    const mapPromises = petsArr.map(async (pet) => {
      let petsWithImages = Object.assign({}, pet)
      petsWithImages.images = await findPetImages(pet.id);

      return petsWithImages;
    });
    return await Promise.all(mapPromises);
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

  const handleRefreshList = useCallback(() => {
    setPets([]);
    setRefreshing(true);
    handleSetPage(1);
    loadPets().finally(() => setRefreshing(false));
  }, [loadPets, handleSetPage]);

  const handleFetchMore = useCallback((distance: number) => {
    if (distance < 1) return;

    setLoadingMore(true);
    handleSetPage(page + 1);
    loadPets().finally(() => setLoadingMore(false));
  }, [page, loadPets]);

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    setPets([]);
    handleSetPage(1);
    loadPets().finally(() => setLoading(false));
    if (user) {
      loadFavs();
    }
    return () => { isSubscribed = false }
  }, [currentLocation.lat, specieFilter, genderFilter, distance, refreshing]);

  useEffect(() => {
    setWindowWidth((Dimensions.get('window').width) - 34);
  }, []);

  return (
    <>
      <Container>
        <FilterMenu />
        {!loading ?
          <FlatList
            refreshing={refreshing}
            onRefresh={handleRefreshList}
            data={pets}
            style={{ backgroundColor: '#F43434', paddingHorizontal: 17 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: IPetsData) => item.id}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) =>
              pets.length >= 4 && handleFetchMore(distanceFromEnd)
            }
            ListFooterComponent={
              loadingMore ? <ActivityIndicator color="#ba1212" /> : <></>
            }
            maxToRenderPerBatch={10}
            renderItem={({ item }: { item: IPetsData }) => (
              <CardItem>
                {item.images.length > 0 ?
                  <FlatList
                    data={item.images}
                    style={{ flex: 1 }}
                    keyExtractor={(item: IPetImages) => item.id as string}
                    renderItem={({ item }: { item: IPetImages }) => (
                      item.image_url ?
                        <PetImage
                          source={{ uri: item.image_url }}
                          style={{ width: windowWidth }}
                        />
                        :
                        <PetImage source={PetImg} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ borderRadius: 20, overflow: 'hidden' }}
                  />
                  :
                  <PetImage source={PetImg} />
                }
                <GenderContainer>
                  {item.gender === 'male' ?
                    (
                      <Icon name="male" size={20} color='#129CBA' />
                    ) :
                    (
                      <Icon name="female" size={20} color='#ED9090' />
                    )
                  }
                </GenderContainer>

                <CardContent item={item} />
              </CardItem>
            )}
            ListEmptyComponent={() => {
              return (
                <EmptyContainer>
                  <EmptyText>
                    Nenhum resultado encontrado.
                  </EmptyText>
                </EmptyContainer>
              )
            }}
          />
          :
          <ActivityIndicator color="#ba1212" />
        }
      </Container>
      <TabMenu />
    </>
  )
}

export default Home;

import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  Container,
  ResultList,
  CardItem,
  PetImage,
  GenderContainer,
} from './styles';

import TabMenu from '../../components/TabMenu';
import FilterMenu from '../../components/FilterMenu';
import CardContent from './components/CardContent';
import Icon from 'react-native-vector-icons/Ionicons';


import PetImg from '../../assets/pet.png';
import api from '../../services/api';
import { Dimensions, FlatList } from 'react-native';

import { useLocation } from '../../hooks/LocationContext';
import { useFilter } from '../../hooks/FilterContext';
import { usePets } from '../../hooks/PetsContext';
import { useAuth } from '../../hooks/AuthContext';

import { IPetsData, IPetImages } from '../../@types/Pets/IPetsData';

const Home: React.FC = () => {
  const { loadFavs } = usePets();
  const { user } = useAuth();
  const { currentLocation } = useLocation();
  const {distance, specieFilter, genderFilter} = useFilter();

  const [pets, setPets] = useState<IPetsData[]>();
  const [windowWidth, setWindowWidth] = useState<number>();
  const [refreshing, setRefreshing] = useState(false);

  let petsArr: IPetsData[] = [];

  async function loadPets(){
    setRefreshing(true);
    if(currentLocation.lat && currentLocation.lon){
      const response = await api.get('/pets', {
        params: {
          location_lat: currentLocation.lat,
          location_lon: currentLocation.lon,
          distance: distance,
          species: specieFilter,
          gender: genderFilter,
        },
      });
      petsArr = response.data;
      petsArr = await setPetImages(petsArr);

      setPets(petsArr);
    }
    setRefreshing(false);
  }

  const setPetImages = useCallback(async(petsArr: IPetsData[]): Promise<IPetsData[]> => {
    const mapPromises = petsArr.map(async (pet) => {
      let petsWithImages = Object.assign({}, pet)
      petsWithImages.images = await findPetImages(pet.id);

      return petsWithImages;
    });
    return await Promise.all(mapPromises);
  }, []);

  const findPetImages = useCallback(async(pet_id:string) : Promise<IPetImages[]> => {
      let images: IPetImages[] = []
      try {
        const response = await api.get(`/images/${pet_id}`)
        images = response.data;
      } catch (error) {
      }
      return images;
  }, []);

  const handleRefreshList = useCallback(() => {
    setRefreshing(true);
    loadPets().then(() => setRefreshing(false));
  }, [loadPets]);

  useEffect(()=>{
    loadPets();
    if(user){
      loadFavs();
    }

    setWindowWidth((Dimensions.get('window').width)-34);
  },[currentLocation.lat, specieFilter, genderFilter, distance]);

  return (
    <>
    <Container>
    <FilterMenu/>
      <ResultList<React.ElementType>
        refreshing={refreshing}
        onRefresh={handleRefreshList}
        data={pets}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: IPetsData) => item.id}
        renderItem={({item} : {item:IPetsData}) => (
          <CardItem>
            {item.images.length > 0 ?
              <FlatList
                data={item.images}
                style={{flex:1}}
                keyExtractor={(item: IPetImages) => item.id as string}
                renderItem={({item}: {item:IPetImages}) => (
                  item.image_url ?
                  <PetImage source={{uri: item.image_url}} style={{width:windowWidth}}/>
                  :
                  <></>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{borderRadius:20, overflow:'hidden'}}
              />
            :
            <PetImage source={PetImg}/>
            }
            <GenderContainer>
              {item.gender === 'male' ?
                (
                  <Icon name="male" size={20} color='#129CBA'/>
                ):
                (
                  <Icon name="female" size={20} color='#ED9090'/>
                )
              }
            </GenderContainer>

            <CardContent item={item}/>
          </CardItem>
        )}
      >

      </ResultList>
    </Container>
    <TabMenu/>
    </>
  )
}

export default Home;

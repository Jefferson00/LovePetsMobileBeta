import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  Container,
  ResultList,
  CardItem,
  PetImage,
  GenderContainer,
  ContentContainer,
  HeaderContent,
  NameContainer,
  Title,
  Subtitle,
  LocationContainer,
  FavButton,
  BodyContent,
  Description,
  ContactContainer,
  UserInformation,
  UserAvatar,
  ActionsContainer,
  SharedContainer,
  ReportContainer,
  DescriptionContainer,
  ExpandButton,
} from './styles';

import TabMenu from '../../components/TabMenu';
import Icon from 'react-native-vector-icons/Ionicons';


import PetImg from '../../assets/pet.png';
import api from '../../services/api';
import { Dimensions, Easing, FlatList, TouchableOpacity, Animated } from 'react-native';
import { useLocation } from '../../hooks/LocationContext';

import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { getDistance, convertDistance } from 'geolib';


interface Pet{
  id:string;
  name: string;
  user_id: string;
  species:string;
  is_adopt: boolean;
  age:string;
  gender:string;
  description:string;
  location_lat:string;
  location_lon:string;
  city:string;
  state:string;
  created_at: Date;
  updated_at: Date;
  user_name: string;
  user_phone: string;
  user_avatar: string;
  images: PetImages[];
}

interface PetImages{
  id:string;
  pet_id:string;
  image:string;
  image_url:string;
}

const Home: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>();
  const [windowWidth, setWindowWidth] = useState<number>();
  const bodyContentRef = useRef<any>();
  const { currentLocation } = useLocation();
  const [refreshing, setRefreshing] = useState(false);
  const [showCardContent, setShowCardContent] = useState(false);
  const cardContentAnimation = useRef(new Animated.Value(53)).current;

  let petsArr: Pet[] = [];

  async function loadPets(){
    if(currentLocation.lat && currentLocation.lon){
      const response = await api.get('/pets', {
        params: {
          location_lat: currentLocation.lat,
          location_lon: currentLocation.lon,
          distance: '50',
          limit: 5,
          skip:0,
        },
      });
      petsArr = response.data;
      petsArr = await setPetImages(petsArr);

      setPets(petsArr);
    }
  }

  useEffect(()=>{
    loadPets();

    setWindowWidth((Dimensions.get('window').width)-34);
  },[currentLocation.lat]);

  const setPetImages = useCallback(async(petsArr: Pet[]): Promise<Pet[]> => {
    const mapPromises = petsArr.map(async (pet) => {
      let petsWithImages = Object.assign({}, pet)
      petsWithImages.images = await findPetImages(pet.id);

      return petsWithImages;
    });
    return await Promise.all(mapPromises);
  }, [])

  const findPetImages = useCallback(async(pet_id:string) : Promise<PetImages[]> => {
      let images: PetImages[] = []
      try {
        const response = await api.get(`/images/${pet_id}`)
        images = response.data;
      } catch (error) {
      }
      return images;
  }, [])

  const handleShowContent = useCallback(() => {
    bodyContentRef.current.setNativeProps({
      opacity: 0
    })
  }, [])

  const handleRefreshList = useCallback(() => {
    setRefreshing(true);
    loadPets().then(() => setRefreshing(false));
  }, [loadPets]);

  const handleShow = useCallback(() => {
    setShowCardContent(!showCardContent);

    if(showCardContent){
      Animated.timing(cardContentAnimation, {
        toValue:53,
        duration:500,
        useNativeDriver: false,
      }).start();
    }else{
      Animated.timing(cardContentAnimation, {
        toValue:287,
        duration:500,
        useNativeDriver: false,
      }).start();
    }
  }, [cardContentAnimation, showCardContent]);

  const handleDistanceTime = useCallback((create_at:Date) => {
    const distanceTime  = formatDistance(
      new Date(create_at),
      new Date(),
      {locale: pt, addSuffix: true}
    );

    return distanceTime;
  }, [loadPets]);

  const handleDistanceLocation = useCallback((lat: string, lon:string) => {
    const distance = getDistance(
      {lat: currentLocation.lat, lon: currentLocation.lon},
      {lat: lat, lon: lon}
    )

    const distanceInKm = convertDistance(distance, 'km');
    return Math.floor(distanceInKm);
  }, [loadPets]);

  return (
    <>
    <Container>
      <ResultList<React.ElementType>
        refreshing={refreshing}
        onRefresh={handleRefreshList}
        data={pets}
        showsVerticalScrollIndicator={false}
        renderItem={({item} : {item:Pet}) => (
          <CardItem>
            {item.images.length > 0 ?
              <FlatList
                data={item.images}
                style={{flex:1}}
                keyExtractor={(item: PetImages) => item.id}
                renderItem={({item}: {item:PetImages}) => (
                  <PetImage source={{uri: item.image_url}} style={{width:windowWidth}}/>
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

            <ContentContainer style={{height:cardContentAnimation}}>
              <>
              <HeaderContent>
                <FavButton>
                  <Icon name="heart-outline" size={25}/>
                </FavButton>

                <ExpandButton onPress={handleShow}>
                  <NameContainer>
                    <Title>{item.name}</Title>
                    <Subtitle>{item.age}</Subtitle>
                  </NameContainer>
                </ExpandButton>

                  <LocationContainer>
                    <Subtitle>
                      {handleDistanceLocation(item.location_lat, item.location_lon)+' km'}
                    </Subtitle>
                    <Subtitle style={{textAlign:'center', fontSize:9}}>
                      {handleDistanceTime(item.created_at)}
                    </Subtitle>
                  </LocationContainer>
              </HeaderContent>

              <BodyContent>
                <DescriptionContainer>
                  <Description>
                    {item.description}
                  </Description>
                </DescriptionContainer>

                <Title>
                  Entrar em contato:
                </Title>
                <ContactContainer>
                  <UserInformation>
                    <UserAvatar source={{uri:item.user_avatar}}/>
                    <Description style={{marginHorizontal:20}}>
                      {item.user_name}
                    </Description>
                    <Icon name="logo-whatsapp" size={30} color="#4EC953"/>
                  </UserInformation>

                  <Subtitle>
                    Brasília-DF
                  </Subtitle>
                </ContactContainer>

                <ActionsContainer>
                  <SharedContainer>
                    <Icon name="share-social" size={25} color="#12BABA" style={{marginRight:6}}/>
                    <Subtitle>Compartilhar</Subtitle>
                  </SharedContainer>

                  <ReportContainer>
                    <Icon name="alert-circle" size={25} color="#BA1212" style={{marginRight:6}}/>
                    <Subtitle>Denunciar</Subtitle>
                  </ReportContainer>
                </ActionsContainer>
              </BodyContent>
            </>
            </ContentContainer>
          </CardItem>
        )}
        keyExtractor={(item: Pet) => item.id}
      >

      </ResultList>
    </Container>
    <TabMenu/>
    </>
  )
}

export default Home;

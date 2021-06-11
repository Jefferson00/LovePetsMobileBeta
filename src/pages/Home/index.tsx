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
} from './styles';

import TabMenu from '../../components/TabMenu';
import Icon from 'react-native-vector-icons/Ionicons';


import PetImg from '../../assets/pet.png';
import api from '../../services/api';
import { Dimensions, FlatList } from 'react-native';


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
  created_at: string;
  updated_at: string;
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

  useEffect(()=>{
    let petsArr: Pet[] = [];
    async function loadPets(){
      const response = await api.get('/pets', {
        params: {
          location_lat: '-15.785647',
          location_lon: '-48.141282',
          distance: '50',
          limit: 5,
          skip:0,
        },
      });
      petsArr = response.data;
      petsArr = await setPetImages(petsArr);

      setPets(petsArr);
    }

    loadPets();

    setWindowWidth((Dimensions.get('window').width)-34);
  },[]);

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

  return (
    <>
    <Container>
      <ResultList<React.ElementType>
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

            <ContentContainer activeOpacity={.9}>
              <>
              <HeaderContent>
                <FavButton>
                  <Icon name="heart-outline" size={25}/>
                </FavButton>

                <NameContainer>
                  <Title>{item.name}</Title>
                  <Subtitle>{item.age}</Subtitle>
                </NameContainer>

                <LocationContainer>
                  <Subtitle>48 km</Subtitle>
                  <Subtitle>há 1 dia(s)</Subtitle>
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
                    <Description>{item.user_name}</Description>
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

import React, {useCallback, useEffect, useState} from 'react';
import { FlatList, Dimensions, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { getDistance, convertDistance } from 'geolib';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import api from '../../../services/api';

import { usePets } from '../../../hooks/PetsContext';
import { useLocation } from '../../../hooks/LocationContext';
import Header from '../../../components/Header';
import TabMenu from '../../../components/TabMenu';

import getDistanceLocation  from '../../../utils/getDistanceLocation';
import getDistanceTime from '../../../utils/getDistanceTime';
import handleContactWhatsapp from '../../../utils/handleContactWhatsapp';
import handleShare from '../../../utils/handleShare';

import { IPetsData, IPetImages } from '../../../@types/Pets/IPetsData';

import {
  Container,
  CardPet,
  FavButton,
  DeleteContainer,
  ImagePet,
  InfoContainer,
  Title,
  NoResultView,
  Description,
  DescriptionContainer,
  ActionsContainer,
  ContactContainer,
  ReportContainer,
  SharedContainer,
  UserAvatar,
  UserInformation,
  Subtitle,
  LocationContainer,
  Main,
  TinyText,
} from './styles';


interface FavsData{
  id:string;
  user_id:string;
  pet_id:string;
  pet:IPetsData;
}


const FavPets: React.FC = () => {
  const {favPets,loadFavs} = usePets();
  const { currentLocation } = useLocation();
  const [windowWidth, setWindowWidth] = useState<number>();

  useEffect(() => {
    loadFavs();

    setWindowWidth((Dimensions.get('window').width)-46);
  },[])

  return (
    <>
    <Header title="Meus Favoritos"/>
      <Container>
        {favPets.length === 0 ?
          <NoResultView>
            <Title>
              Sem anúncios favoritos ainda.
            </Title>
            <Icon name="paw" size={160} color="#12BABA"/>
          </NoResultView>
        :
        <>
          <FlatList
            data={favPets}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: FavsData) => item.id}
            renderItem={({item} : {item:FavsData}) => (
              <CardPet>
                {(item.pet.images.length > 0 && item.pet.images[0].image_url) && (
                    <FlatList
                    data={item.pet.images}
                    style={{flex:1}}
                    keyExtractor={(item: IPetImages) => item.id as string}
                    renderItem={({item}: {item:IPetImages}) =>  (
                      item.image_url ?
                      <ImagePet source={{uri: item.image_url}} style={{width:windowWidth}}/>
                      :
                      <></>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{borderRadius:20, overflow:'hidden'}}
                  />
                )}
                <Title>
                  {item.pet.name}
                </Title>

                <InfoContainer>
                  <Description>
                    {item.pet.age}
                  </Description>

                  {item.pet.gender === 'male' ?
                    (
                      <Icon name="male" size={20} color='#129CBA' style={{marginLeft:25}}/>
                    ):
                    (
                      <Icon name="female" size={20} color='#ED9090' style={{marginLeft:25}}/>
                    )
                  }
                </InfoContainer>

                <DescriptionContainer>
                  <Description>
                    {item.pet.description}
                  </Description>
                </DescriptionContainer>

                <Main>
                  <Subtitle>
                    Entrar em contato:
                  </Subtitle>

                  <ContactContainer>
                    <UserInformation>
                      <UserAvatar source={{uri:item.pet.user_avatar}}/>
                      <Description style={{marginHorizontal:8}}>
                        {item.pet.user_name}
                      </Description>
                      <TouchableOpacity onPress={() => handleContactWhatsapp(item.pet.name, item.pet.user_phone)}>
                        <Icon name="logo-whatsapp" size={30} color="#4EC953"/>
                      </TouchableOpacity>
                    </UserInformation>

                    <TinyText>
                      Brasília-DF
                    </TinyText>
                  </ContactContainer>

                  <ActionsContainer>
                    <SharedContainer onPress={handleShare}>
                      <Icon name="share-social" size={25} color="#12BABA" style={{marginRight:6}}/>
                      <TinyText>Compartilhar</TinyText>
                    </SharedContainer>

                    <ReportContainer>
                      <Icon name="alert-circle" size={25} color="#BA1212" style={{marginRight:6}}/>
                      <TinyText>Denunciar</TinyText>
                    </ReportContainer>
                  </ActionsContainer>
                </Main>

                <LocationContainer>
                    <TinyText>
                      {getDistanceLocation({
                        fromLat: currentLocation.lat,
                        fromLon: currentLocation.lon,
                        toLat: item.pet.location_lat,
                        toLon: item.pet.location_lon,
                      })+' km'}
                    </TinyText>
                    <TinyText style={{textAlign:'center', fontSize:9}}>
                      {getDistanceTime(item.pet.created_at)}
                    </TinyText>
                  </LocationContainer>

                <DeleteContainer>
                  <FavButton>
                    <Icon name="heart" size={30} color='#BA1212'/>
                  </FavButton>
                </DeleteContainer>
              </CardPet>
            )}
          />
        </>
        }
      </Container>
      <TabMenu/>
    </>
  )
}

export default FavPets;

import React, { useRef , useCallback, useState }from 'react';
import { Animated, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
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

import { useAuth } from '../../../../hooks/AuthContext';
import { usePets } from '../../../..//hooks/PetsContext';
import { useLocation } from '../../../..//hooks/LocationContext';
import api from '../../../../services/api';

import getDistanceLocation  from '../../../../utils/getDistanceLocation';
import getDistanceTime from '../../../../utils/getDistanceTime';
import handleContactWhatsapp from '../../../../utils/handleContactWhatsapp';
import handleShare from '../../../../utils/handleShare';

import { IPetsData } from '../../../../@types/Pets/IPetsData';

import DefaultImg from '../../../../assets/default.png';
import { useNavigation } from '@react-navigation/native';

interface CardContentProps{
  item: IPetsData;
}

const CardContent: React.FC<CardContentProps> = ({item}) => {
  const navigation = useNavigation();
  const { favPets, loadFavs } = usePets();
  const { user } = useAuth();
  const { currentLocation } = useLocation();
  const [loadingFavClicked, setLoadingFavClicked] = useState(false);

  const cardContentAnimation = useRef(new Animated.Value(53)).current;

  const [showCardContent, setShowCardContent] = useState(false);

  const handleCreateFav = useCallback(async (pets_id:string) => {
    if(user){
      setLoadingFavClicked(true);
      try {
        await api.post('/favs', {pets_id});
      } catch (error) {
        if(favPets){
          const favToDelete = favPets.find(fav => (fav.pet_id === pets_id && fav.user_id === user.id));

          if(favToDelete){
            await api.delete(`/favs/${favToDelete.id}`);
          }
        }
      }
      setLoadingFavClicked(false);
      loadFavs();
    }else{
      Alert.alert(
        'Entre ou crie uma conta',
        'para aproveitar todas as funcionalidades, entre ou crie uma contra',
         [
           {
             text: 'Agora não',
             style: 'cancel'
           },
           {
             text: 'Entrar',
             onPress: () => {navigation.navigate('SignIn')}
           }
         ]
      )
    }
  },[favPets]);

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


  return (
    <ContentContainer style={{ height: cardContentAnimation }}>
      <>
        <HeaderContent>
          <FavButton onPress={() => handleCreateFav(item.id)}>
            {
              loadingFavClicked ?
              <ActivityIndicator size="small" color="#ba1212"/>
              :
              user && favPets.find(fav => (fav.pet_id === item.id && fav.user_id === user.id)) ?
              <Icon name="heart" size={25} color="#F43434" />
              :
              <Icon name="heart-outline" size={25} color="#F43434" />
            }
          </FavButton>

          <ExpandButton onPress={handleShow}>
            <NameContainer>
              <Title>{item.name}</Title>
              <Subtitle>{item.age}</Subtitle>
            </NameContainer>
          </ExpandButton>

          <LocationContainer>
            <Subtitle>
              {getDistanceLocation({
                fromLat: String(currentLocation.lat),
                fromLon: String(currentLocation.lon),
                toLat: item.location_lat,
                toLon: item.location_lon,
              }) + ' km'}
            </Subtitle>
            <Subtitle style={{ textAlign: 'center', fontSize: 9 }}>
              {getDistanceTime(item.created_at)}
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
              {item.user_avatar ?
                <UserAvatar source={{uri: item.user_avatar}} />
                :
                <UserAvatar source={DefaultImg} />
              }
              <Description style={{ marginHorizontal: 20 }}>
                {item.user_name}
              </Description>
              <TouchableOpacity onPress={() => handleContactWhatsapp(item.name, item.user_phone)}>
                <Icon name="logo-whatsapp" size={30} color="#4EC953" />
              </TouchableOpacity>
            </UserInformation>

            <Subtitle>
              Brasília-DF
            </Subtitle>
          </ContactContainer>

          <ActionsContainer>
            <SharedContainer onPress={handleShare}>
              <Icon name="share-social" size={25} color="#12BABA" style={{ marginRight: 6 }} />
              <Subtitle>Compartilhar</Subtitle>
            </SharedContainer>

            <ReportContainer>
              <Icon name="alert-circle" size={25} color="#BA1212" style={{ marginRight: 6 }} />
              <Subtitle>Denunciar</Subtitle>
            </ReportContainer>
          </ActionsContainer>
        </BodyContent>
      </>
    </ContentContainer>
  )
}

export default CardContent;

import React, { useRef, useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../hooks/AuthContext';
import { usePets } from '../../hooks/PetsContext';
import { useLocation } from '../../hooks/LocationContext';
import { IPetsData } from '../../@types/Pets/IPetsData';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

import {
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';

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
  DotsContainer,
  Dots,
  ContainerContent,
  ModalContent,
  RadioContainer,
  RadioLabel,
  ReportSubmit,
  ReportTitleContainer,
  ReportSubmitText,
} from './styles';


import api from '../../services/api';

import getDistanceLocation from '../../utils/getDistanceLocation';
import getDistanceTime from '../../utils/getDistanceTime';
import handleContactWhatsapp from '../../utils/handleContactWhatsapp';
import handleShare from '../../utils/handleShare';

import DefaultImg from '../../assets/default.png';

interface CardContentProps {
  item: IPetsData;
}

const CardContent: React.FC<CardContentProps> = ({ item }) => {
  const navigation = useNavigation();
  const { favPets, loadFavs } = usePets();
  const { user } = useAuth();
  const { currentLocation } = useLocation();

  const cardContentAnimation = useRef(new Animated.Value(53)).current;

  const [checkedOption, setCheckedOption] = useState('');
  const [reportSended, setReportSended] = useState(false);
  const [loadingFavClicked, setLoadingFavClicked] = useState(false);
  const [reportModalIsOpen, setReportModalIsOpen] = useState(false);
  const [showCardContent, setShowCardContent] = useState(false);

  const reportRadioOptions = [
    { id: 'spam', value: 'spam', label: 'É spam' },
    { id: 'nudez ou atividade sexual', value: 'nudez ou atividade sexual', label: 'Nudez ou atividade sexual' },
    { id: 'simbolos ou discurso de odio', value: 'simbolos ou discurso de odio', label: 'Símbolos ou discurso de ódio' },
    { id: 'violencia', value: 'violencia', label: 'Violência' },
    { id: 'golpe ou fraude', value: 'golpe ou fraude', label: 'Golpe ou fraude' },
    { id: 'informação falsa', value: 'informação falsa', label: 'Informação falsa' },
  ]

  const handleCreateFav = useCallback(async (pets_id: string) => {
    if (user) {
      setLoadingFavClicked(true);
      try {
        await api.post('/favs', { pets_id });
      } catch (error) {
        if (favPets) {
          const favToDelete = favPets.find(fav => (fav.pet_id === pets_id && fav.user_id === user.id));

          if (favToDelete) {
            await api.delete(`/favs/${favToDelete.id}`);
          }
        }
      }
      setLoadingFavClicked(false);
      loadFavs();
    } else {
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
            onPress: () => { navigation.navigate('SignIn') }
          }
        ]
      )
    }
  }, [favPets]);

  const handleShow = useCallback(() => {
    setShowCardContent(!showCardContent);

    if (showCardContent) {
      Animated.timing(cardContentAnimation, {
        toValue: 53,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(cardContentAnimation, {
        toValue: 287,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [cardContentAnimation, showCardContent]);

  const handleReport = useCallback(async () => {
    if (checkedOption) {
      try {
        setReportSended(true);

        setTimeout(() => {
          setReportModalIsOpen(false);
        }, 2000);

        /*await api.post('/report/send', {
          pet_id: item.id,
          user_id: item.user_id,
          motivation: checkedOption
        });*/

      } catch (error) {
        setReportModalIsOpen(false);
      }
      setReportSended(false);
    }
  }, [checkedOption]);

  return (
    <>
      <ContentContainer style={{ height: cardContentAnimation }}>
        <>
          <DotsContainer>
            {item.images.map(img => (
              <Dots key={img.id} />
            ))}
          </DotsContainer>
          <HeaderContent>
            <FavButton onPress={() => handleCreateFav(item.id)}>
              {
                loadingFavClicked ?
                  <ActivityIndicator size="small" color="#ba1212" />
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
                  <UserAvatar source={{ uri: item.user_avatar }} />
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

              {/*<Subtitle>
                Brasília-DF
              </Subtitle>*/}
            </ContactContainer>

            <ActionsContainer>
              <SharedContainer onPress={() => handleShare(item.id)}>
                <Icon name="share-social" size={25} color="#12BABA" style={{ marginRight: 6 }} />
                <Subtitle>Compartilhar</Subtitle>
              </SharedContainer>

              <ReportContainer onPress={() => setReportModalIsOpen(true)}>
                <Icon name="alert-circle" size={25} color="#BA1212" style={{ marginRight: 6 }} />
                <Subtitle>Denunciar</Subtitle>
              </ReportContainer>
            </ActionsContainer>
          </BodyContent>
        </>
      </ContentContainer>


      <Modal
        transparent
        visible={reportModalIsOpen}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setReportModalIsOpen(false)}>
          <ContainerContent>
            <TouchableWithoutFeedback>
              {reportSended ?
                <ModalContent>
                  <Title>Sua denúncia foi encaminhada, obrigado!</Title>
                </ModalContent>
                :
                <ModalContent>
                  <ReportTitleContainer>
                    <Title>Por que você está denunciando esse anúncio?</Title>
                  </ReportTitleContainer>
                  {reportRadioOptions.map((option, index) => (
                    <RadioContainer key={option.id}>
                      <RadioButton
                        key={option.id}
                        value={option.value}
                        status={checkedOption === option.value ? 'checked' : 'unchecked'}
                        onPress={() => setCheckedOption(option.value)}
                      />
                      <RadioLabel>{option.label}</RadioLabel>
                    </RadioContainer>
                  ))}
                  <ReportSubmit onPress={handleReport} >
                    <ReportSubmitText>Enviar</ReportSubmitText>
                  </ReportSubmit>
                </ModalContent>
              }
            </TouchableWithoutFeedback>
          </ContainerContent>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

export default CardContent;

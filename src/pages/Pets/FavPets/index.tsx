import React, { useEffect, useState } from 'react';
import { FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { usePets } from '../../../hooks/PetsContext';
import { useLocation } from '../../../hooks/LocationContext';
import { IPetsData, IPetImages } from '../../../@types/Pets/IPetsData';

import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import TabMenu from '../../../components/TabMenu';
import getDistanceLocation from '../../../utils/getDistanceLocation';
import getDistanceTime from '../../../utils/getDistanceTime';
import handleContactWhatsapp from '../../../utils/handleContactWhatsapp';
import handleShare from '../../../utils/handleShare';
import CardContent from '../../../components/CardContent';

import DefaultImg from '../../../assets/default.png';

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


interface FavsData {
  id: string;
  user_id: string;
  pet_id: string;
  pet: IPetsData;
}


const FavPets: React.FC = () => {
  const { favPets, loadFavs, handleDeleteFavPet } = usePets();
  const { currentLocation } = useLocation();
  const [windowWidth, setWindowWidth] = useState<number>();

  useEffect(() => {
    loadFavs();

    setWindowWidth((Dimensions.get('window').width) - 46);
  }, [])

  return (
    <>
      <Header title="Meus Favoritos" />
      <Container>
        {favPets.length === 0 ?
          <NoResultView>
            <Title>
              Sem anúncios favoritos ainda.
            </Title>
            <Icon name="paw" size={160} color="#12BABA" />
          </NoResultView>
          :
          <>
            <FlatList
              data={favPets}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item: FavsData) => item.id}
              renderItem={({ item }: { item: FavsData }) => (
                <CardPet>
                  {(item.pet.images.length > 0 && item.pet.images[0].image_url) && (
                    <FlatList
                      data={item.pet.images}
                      style={{ flex: 1 }}
                      keyExtractor={(item: IPetImages) => item.id as string}
                      renderItem={({ item }: { item: IPetImages }) => (
                        item.image_url ?
                          <ImagePet source={{ uri: item.image_url }} style={{ width: windowWidth }} />
                          :
                          <></>
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ borderRadius: 20, overflow: 'hidden' }}
                    />
                  )}

                  <DeleteContainer>
                    <FavButton onPress={() => handleDeleteFavPet(item.id)}>
                      <Icon name="heart" size={30} color='#BA1212' />
                    </FavButton>
                  </DeleteContainer>

                  <CardContent item={item.pet} />
                </CardPet>
              )}
            />
          </>
        }
      </Container>
      <TabMenu />
    </>
  )
}

export default FavPets;

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useLocation } from '../../../hooks/LocationContext';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import {
  Container,
  FormContainer,
  FormHeader,
  FormBody,
  Label,
  GenderContainer,
  ButtonWrapper,
} from './styles';

import * as Yup from 'yup';
import api from '../../../services/api';
import Icon from 'react-native-vector-icons/Ionicons';

import Button from '../../../components/Button';
import TabMenu from '../../../components/TabMenu';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import getValidationErrors from '../../../utils/getValidationErrors';
import ImageContainer from '../components/ImageContainer';
import SpecieContainer from '../components/SpecieContainer';
import AgeContainer from '../components/AgeContainer';
import LocationContainer from '../components/LocationContainer';
import ModalComponent from '../../../components/Modal';
import CameraModal from '../../../components/CameraModal';


interface PetImages {
  id: string;
  pet_id: string;
  image: string;
  image_url: string | null;
}

interface CreatePetFormData {
  name: string;
  description: string;
}

interface PetData {
  name: string;
  description: string;
  species: string;
  age: string;
  gender: string;
  is_adopt: boolean;
  location_lat: string;
  location_lon: string;
  city: string;
  state: string;
}

interface PetCreated {
  id: string;
}

type Specie = 'dog' | 'cat' | 'rodent' | 'rabbit' | 'fish' | 'others';
type Age = '- 1 ano' | '1 ano' | '2 anos' | '3 anos' | '4 anos' | '+ 4 anos';
type Gender = 'male' | 'female';

const CreatePet: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const { currentLocation } = useLocation();

  const defaultImagesValues: PetImages[] = [
    {
      id: '',
      image_url: null,
      pet_id: '',
      image: ''
    },
    {
      id: '',
      image_url: null,
      pet_id: '',
      image: ''
    },
    {
      id: '',
      image_url: null,
      pet_id: '',
      image: ''
    },
    {
      id: '',
      image_url: null,
      pet_id: '',
      image: ''
    },
  ]

  const [specie, setSpecie] = useState<Specie>('others');
  const [age, setAge] = useState<Age>('- 1 ano');
  const [gender, setGender] = useState<Gender>('female');
  const [latitude, setLatitude] = useState(-15.780107);
  const [longitude, setLongitude] = useState(-48.140725);
  const [images, setImages] = useState<PetImages[]>(defaultImagesValues);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info' | 'confirmation'>('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');

  const [cameraModal, setCameraModal] = useState(false);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lon) {
      setLatitude(currentLocation.lat);
      setLongitude(currentLocation.lon);
    }
  }, [currentLocation.lat]);

  const handleSelectImage = useCallback((index: number) => {
    setCameraModal(true);
    setIndex(index);

  }, [images]);

  const handleSelectImageFromGallery = useCallback((index: number) => {
    launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 625,
      maxWidth: 625,
    }, response => {
      if (response.didCancel) {
        setCameraModal(false);
        return;
      }
      if (response.errorCode) {
        Alert.alert('Erro ao atualizar a imagem');
        setCameraModal(false);
        return;
      }

      const imageUri = response.assets[0].uri;

      if (imageUri) {
        let newImages = [...images];
        newImages[index].image_url = imageUri;
        setImages(newImages);
      }
      setCameraModal(false);
    });
  }, [images]);

  const handleSelectImageFromCamera = useCallback((index: number) => {
    launchCamera({
      mediaType: 'photo',
      maxHeight: 625,
      maxWidth: 625,
    }, response => {
      if (response.didCancel) {
        setCameraModal(false);
        return;
      }
      if (response.errorCode) {
        Alert.alert('Erro ao atualizar a imagem');
        setCameraModal(false);
        return;
      }

      const imageUri = response.assets[0].uri;

      if (imageUri) {
        let newImages = [...images];
        newImages[index].image_url = imageUri;
        setImages(newImages);
      }
      setCameraModal(false);
    });
  }, [images]);

  const handleCancelCamera = useCallback(() => {
    setCameraModal(false);
  }, []);

  const handleCreatePet = useCallback(async (data: CreatePetFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        description: Yup.string().required('Descrição é obrigatória'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      let hasImage;

      images.map(image => {
        if (image.image_url) {
          hasImage = true;
        }
      });

      if (hasImage) {
        setLoading(true);
        const petData: PetData = {
          name: data.name,
          description: data.description,
          age: age,
          gender: gender,
          species: specie,
          is_adopt: false,
          location_lat: String(latitude),
          location_lon: String(longitude),
          city: 'Ceilândia',
          state: 'DF'
        }

        await handleCreateImages(petData);

        setLoading(false);
      } else {
        setModalTitle('Nenhuma imagem selecionada');
        setModalSubtitle('Selecione pelo menos uma imagem do pet');
        setModalType('error');
        setModalVisible(true);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        setModalTitle('Erro no cadastro');
        setModalSubtitle('Preencha todos os campos corretamente.');
        setModalType('error');
        setModalVisible(true);

        return;
      }

      setModalTitle('Erro no cadastro');
      setModalSubtitle('Preencha todos os campos corretamente.');
      setModalType('error');
      setModalVisible(true);
    }
  }, [age, gender, specie, latitude, longitude]);

  const handleCreateImages = async (petData: PetData) => {
    try {
      const petCreated: PetCreated = await (await api.post('/pets', petData)).data;

      images.map(image => {
        if (image.image_url) {
          const dataImage = new FormData();

          dataImage.append('image', {
            type: 'image/jpeg',
            name: `${petCreated.id + image.id}.jpg`,
            uri: image.image_url,
          });
          dataImage.append('pet_id', petCreated.id);

          api.patch('images', dataImage).catch(() => {
            setModalTitle('Erro no upload da imagem');
            setModalSubtitle('Não foi possível cadastrar a imagem, tente novamente.');
            setModalType('error');
            setModalVisible(true);
          });
        }
      });

      setModalTitle('Cadastro realizado!');
      setModalSubtitle('Cadastro realizado com sucesso.');
      setModalType('success');
      setModalVisible(true);

      setTimeout(() => {
        navigation.goBack();
      }, 1000);

    } catch (error) {
      setModalTitle('Erro no cadastro');
      setModalSubtitle('Não foi possível cadastrar o pet, tente novamente.');
      setModalType('error');
      setModalVisible(true);
    };
  }

  const handleConfirm = useCallback(async () => {
    setModalVisible(false);
  }, []);

  const selectLocation = useCallback((lat: string, lon: string) => {
    setLatitude(Number(lat));
    setLongitude(Number(lon));
  }, []);

  return (
    <>
      <Header title="Novo Anúncio" />
      <Container showsVerticalScrollIndicator={false}>
        <FormContainer>
          <Form
            ref={formRef}
            onSubmit={handleCreatePet}
            style={{ marginTop: 33 }}
          >
            <FormHeader>
              <ImageContainer
                images={images}
                handleSelectImage={handleSelectImage}
              />

              <SpecieContainer
                specie={specie}
                setSpecie={setSpecie}
              />
            </FormHeader>

            <FormBody>
              <Input
                name="name"
                icon="mail"
                placeholder="nome"
                autoCapitalize="words"
                autoCorrect={false}
              />

              <Label>
                Idade
              </Label>

              <AgeContainer
                age={age}
                setAge={setAge}
              />

              <Label>
                Genêro
              </Label>

              <GenderContainer>
                <ButtonWrapper style={{ marginRight: 17 }}>
                  <Button
                    title="Macho"
                    bgColor={gender === 'male' ? "#12BABA" : "#B8EAEA"}
                    borderColor='transparent'
                    color={gender === 'male' ? "#FFF" : "#4E4D4D"}
                    onPress={() => setGender('male')}
                  >
                    <Icon
                      name="male"
                      size={20}
                      color={gender === 'male' ? '#FFF' : '#129CBA'}
                      style={{ marginRight: 11 }}
                    />
                  </Button>
                </ButtonWrapper>
                <ButtonWrapper>
                  <Button
                    title="Femea"
                    bgColor={gender === 'female' ? "#12BABA" : "#B8EAEA"}
                    borderColor='transparent'
                    color={gender === 'female' ? "#FFF" : "#4E4D4D"}
                    onPress={() => setGender('female')}
                  >
                    <Icon
                      name="female"
                      size={20}
                      color={gender === 'female' ? '#FFF' : '#ED9090'}
                      style={{ marginRight: 11 }}
                    />
                  </Button>
                </ButtonWrapper>
              </GenderContainer>

              <Input
                name="description"
                icon="mail"
                placeholder="breve descrição"
              />

              <LocationContainer
                latitude={latitude}
                longitude={longitude}
                onSelectLocation={selectLocation}
              />

              <Button
                title="Publicar"
                borderColor="transparent"
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              />

            </FormBody>

          </Form>
        </FormContainer>
        <CameraModal
          onCameraModalCancel={handleCancelCamera}
          onSelectGallery={() => handleSelectImageFromGallery(index)}
          onSelectCamera={() => handleSelectImageFromCamera(index)}
          visible={cameraModal}
          transparent
          animationType="slide"
        />

        <ModalComponent
          title={modalTitle}
          subtitle={modalSubtitle}
          type={modalType}
          icon={() => {
            if (modalType === 'error') {
              return (<Icon name="alert-circle" size={45} color='#BA1212' />)
            } else if (modalType === 'success') {
              return (<Icon name="checkmark-circle" size={45} color='#12BABA' />)
            } else {
              return (<Icon name="alert-circle" size={45} color='#BA1212' />)
            }
          }}
          transparent
          visible={modalVisible}
          handleConfirm={handleConfirm}
          animationType="slide"
        />

        <ModalComponent
          type={'loading'}
          icon={() => (
            <ActivityIndicator size="large" color='#BA1212' />
          )}
          transparent
          visible={loading}
          animationType="slide"
        />

      </Container>
      <TabMenu />
    </>
  )
}

export default CreatePet;

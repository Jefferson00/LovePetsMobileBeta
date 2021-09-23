import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { usePets } from '../../../hooks/PetsContext';
import { IPetsData, IPetImages, Age, Gender, Specie } from '../../../@types/Pets/IPetsData';

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

type ParamRoute = {
  UpdatePet: {
    pet: IPetsData;
  };
}

const UpdatePet: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const { loadMyPets } = usePets();
  const route = useRoute<RouteProp<ParamRoute, 'UpdatePet'>>();


  const defaultImagesValues: IPetImages[] = [
    {
      id: null,
      image_url: null,
      pet_id: '',
      image: ''
    },
    {
      id: null,
      image_url: null,
      pet_id: '',
      image: ''
    },
    {
      id: null,
      image_url: null,
      pet_id: '',
      image: ''
    },
    {
      id: null,
      image_url: null,
      pet_id: '',
      image: ''
    },
  ]

  const [specie, setSpecie] = useState<Specie>(route.params.pet.species);
  const [age, setAge] = useState<Age>(route.params.pet.age);
  const [gender, setGender] = useState<Gender>(route.params.pet.gender);
  const [latitude, setLatitude] = useState(route.params.pet.location_lat);
  const [longitude, setLongitude] = useState(route.params.pet.location_lon);
  const [images, setImages] = useState<IPetImages[]>(defaultImagesValues);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info' | 'confirmation'>('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');

  const [cameraModal, setCameraModal] = useState(false);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const imagesParm = route.params.pet.images;

    let newImages = [...images];

    imagesParm.map((image, index) => {
      if (image.image_url) {
        newImages[index].image_url = image.image_url;
        newImages[index].id = image.id;
      }
    });

    setImages(newImages);
  }, [route.params.pet.images]);

  const selectLocation = useCallback((lat: string, lon: string) => {
    setLatitude(lat);
    setLongitude(lon);
  }, []);

  const handleConfirm = useCallback(async () => {
    setModalVisible(false);
  }, []);

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
        console.log(response.errorMessage);
        return;
      }

      const imageUri = response.assets[0].uri;

      if (imageUri) {
        let newImages = [...images];
        newImages[index].image_url = imageUri;
        setImages(newImages);
      }

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
        console.log(response.errorMessage);
        return;
      }

      const imageUri = response.assets[0].uri;

      if (imageUri) {
        let newImages = [...images];
        newImages[index].image_url = imageUri;
        setImages(newImages);
      }

    });
  }, [images]);

  const handleUpdatePet = useCallback(async (data: CreatePetFormData) => {
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
          location_lat: latitude,
          location_lon: longitude,
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

        setModalTitle('Erro na atualização');
        setModalSubtitle('Preencha todos os campos corretamente.');
        setModalType('error');
        setModalVisible(true);

        return;
      }

      setModalTitle('Erro na atualização');
      setModalSubtitle('Preencha todos os campos corretamente.');
      setModalType('error');
      setModalVisible(true);
    }
  }, [age, gender, specie, latitude, longitude]);

  const handleCancelCamera = useCallback(() => {
    setCameraModal(false);
  }, []);

  const handleCreateImages = async (petData: PetData) => {
    try {
      await api.put(`/pets/${route.params.pet.id}`, petData);

      images.map(image => {
        if (image.image_url) {
          const dataImage = new FormData();

          dataImage.append('image', {
            type: 'image/jpeg',
            name: `${route.params.pet.id + image.id}.jpg`,
            uri: image.image_url,
          });
          dataImage.append('pet_id', route.params.pet.id);

          if (image.id) {
            api.patch(`images/${image.id}`, dataImage).catch(() => {
              setModalTitle('Erro no upload da imagem');
              setModalSubtitle('Não foi possível atualizar a imagem, tente novamente.');
              setModalType('error');
              setModalVisible(true);
            });
          } else {
            api.patch('images', dataImage).catch(() => {
              setModalTitle('Erro no upload da imagem');
              setModalSubtitle('Não foi possível cadastrar a imagem, tente novamente.');
              setModalType('error');
              setModalVisible(true);
            });
          }
        }
      });

      setModalTitle('Atualizado!');
      setModalSubtitle('Atualizado com sucesso.');
      setModalType('success');
      setModalVisible(true);

      loadMyPets();

      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      setModalTitle('Erro na atualização');
      setModalSubtitle('Não foi possível atualizar o pet, tente novamente.');
      setModalType('error');
      setModalVisible(true);
    };
  }

  return (
    <>
      <Header title="Atualizar Anúncio" />
      <Container showsVerticalScrollIndicator={false}>
        <FormContainer>
          <Form
            ref={formRef}
            onSubmit={handleUpdatePet}
            style={{ marginTop: 33 }}
            initialData={{
              name: route.params.pet.name,
              description: route.params.pet.description,
            }}
          >
            <FormHeader>
              <ImageContainer
                isUpdated={true}
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
                latitude={Number(latitude)}
                longitude={Number(longitude)}
                onSelectLocation={selectLocation}
              />

              <Button
                title="Atualizar"
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

export default UpdatePet;

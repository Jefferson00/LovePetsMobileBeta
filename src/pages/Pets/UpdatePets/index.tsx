import React, { useCallback, useRef, useState, useEffect } from 'react';

import {
  Container,
  FormContainer,
  FormHeader,
  FormBody,
  Label,
  GenderContainer,
  ButtonWrapper,
} from './styles';

import { Alert } from 'react-native';
import api from '../../../services/api';
import * as Yup from 'yup';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import { useLocation } from '../../../hooks/LocationContext';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';



import Button from '../../../components/Button';
import TabMenu from '../../../components/TabMenu';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import getValidationErrors from '../../../utils/getValidationErrors';
import ImageContainer from '../components/ImageContainer';
import SpecieContainer from '../components/SpecieContainer';
import AgeContainer from '../components/AgeContainer';
import LocationContainer from '../components/LocationContainer';

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

interface PetImages{
  id:string | null;
  pet_id:string;
  image:string;
  image_url:string | null;
}

type Specie = 'dog' | 'cat' | 'rodent' | 'rabbit' | 'fish' | 'others';
type Age = '- 1 ano' | '1 ano' | '2 anos' | '3 anos' | '4 anos' | '+ 4 anos';
type Gender = 'male' | 'female';

interface Pets{
  id:string;
  name: string;
  description: string;
  species: Specie;
  age: Age;
  gender: Gender;
  is_adopt: boolean;
  location_lat: string;
  location_lon: string;
  city: string;
  state: string;
  image: PetImages[];
}

interface PetCreated {
  id: string;
}


type ParamRoute = {
  UpdatePet:{
    pet: Pets;
  };
}

const UpdatePet: React.FC= () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamRoute, 'UpdatePet'>>();


  const defaultImagesValues: PetImages[] = [
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
  const [images, setImages] = useState<PetImages[]>(defaultImagesValues);

  useEffect(() => {
    const imagesParm = route.params.pet.image;

    let newImages = [...images];

    imagesParm.map((image, index) => {
      if(image.image_url){
        newImages[index].image_url = image.image_url;
        newImages[index].id = image.id;
      }
    });



    setImages(newImages);
  },[route.params.pet.image]);


  const handleSelectImage = useCallback((index: number) => {
    launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 625,
      maxWidth: 625,
    }, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Erro ao atualizar a imagem');
        console.log(response.errorMessage);
        return;
      }

      const imageUri = response.assets[0].uri;

      console.log(imageUri)

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

              if (image.id){
                api.patch(`images/${image.id}`, dataImage).catch(() => {
                  Alert.alert(
                    'Erro ao atualizar a imagem',
                    'Não foi possível atualizar a imagem, tente novamente.',
                  );
                });
              }else{
                api.patch('images', dataImage).catch(() => {
                  Alert.alert(
                    'Erro no upload da imagem',
                    'Não foi possível cadastrar a imagem, tente novamente.',
                  );
                });
              }
            }
          });

          Alert.alert(
            'Atualizado!',
            'Atualização realizada com sucesso.',
          );

          navigation.goBack();
        } catch (error) {
          Alert.alert(
            'Erro na atualização',
            'Não foi possível atualizar o pet, tente novamente.',
          );
        };
      } else {
        Alert.alert(
          'Nenhuma imagem selecionada',
          'Selecione pelo menos uma imagem do pet',
        );
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        Alert.alert(
          'Erro na atualização',
          'Preencha todos os campos corretamente.',
        );

        return;
      }

      Alert.alert(
        'Erro na atualização',
        'Ocorreu um erro no atualização, tente novamente.',
      );
    }
  }, [age, gender, specie]);

  return (
    <>
      <Header title="Atualizar Anúncio" />
      <Container>
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

      </Container>
      <TabMenu />
    </>
  )
}

export default UpdatePet;

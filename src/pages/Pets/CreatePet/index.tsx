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
import { useNavigation } from '@react-navigation/native';
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


interface PetImages{
  id:string;
  pet_id:string;
  image:string;
  image_url:string | null;
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

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lon) {
      setLatitude(Number(currentLocation.lat));
      setLongitude(Number(currentLocation.lon));
    }
  }, [currentLocation.lat]);

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

      if (imageUri) {
        let newImages = [...images];
        newImages[index].image_url = imageUri;
        setImages(newImages);
      }

    });
  }, [images]);

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
        if (image.image) {
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
          location_lat: '-15.817489',
          location_lon: '-48.123465',
          city: 'Ceilândia',
          state: 'DF'
        }

        try {
          const petCreated: PetCreated = await (await api.post('/pets', petData)).data;
          console.log(petCreated.id)

          images.map(image => {
            if (image.image) {
              const dataImage = new FormData();

              dataImage.append('image', {
                type: 'image/jpeg',
                name: `${petCreated.id + image.id}.jpg`,
                uri: image.image,
              });
              dataImage.append('pet_id', petCreated.id);

              console.log(dataImage)

              api.patch('images', dataImage).catch(() => {
                Alert.alert(
                  'Erro no upload da imagem',
                  'Não foi possível cadastrar a imagem, tente novamente.',
                );
              });
            }
          });

          Alert.alert(
            'Cadastro realizado!',
            'Cadastro realizado com sucesso.',
          );

          navigation.goBack();
        } catch (error) {
          Alert.alert(
            'Erro no cadastro',
            'Não foi possível cadastrar o pet, tente novamente.',
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
          'Erro no cadastro',
          'Preencha todos os campos corretamente.',
        );

        return;
      }

      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro no cadastro, tente novamente.',
      );
    }
  }, [age, gender, specie]);

  return (
    <>
      <Header title="Novo Anúncio" />
      <Container>
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

      </Container>
      <TabMenu />
    </>
  )
}

export default CreatePet;

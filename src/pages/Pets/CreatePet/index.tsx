import React, { useCallback, useRef , useState, useEffect} from 'react';

import {
  Container,
  FormContainer,
  FormHeader,
  ImagesContainer,
  MainImage,
  OthersImage,
  OthersImagesContainer,
  SpeciePickerContainer,
  SpeciePicker,
  Column,
  FormBody,
  AgeContainer,
  AgeButton,
  AgeText,
  Label,
  GenderContainer,
  ButtonWrapper,
  LocationContainer,
  Map,
  InputContainer,
  UploadImageButton,
} from './styles';

import api from '../../../services/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import PetIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DefaultImage from '../../../assets/Vector.png';
import MarkerImg from '../../../assets/marker.png';
import TabMenu from '../../../components/TabMenu';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Button from '../../../components/Button';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useLocation } from '../../../hooks/LocationContext';
import { Alert } from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import getValidationErrors from '../../../utils/getValidationErrors';

interface ImagesProps{
  id: number;
  image: string | null;
}

interface CreatePetFormData{
  name:string;
  description:string;
}

interface PetData{
  name:string;
  description:string;
  species:string;
  age:string;
  gender:string;
  is_adopt:boolean;
  location_lat:string;
  location_lon:string;
  city:string;
  state:string;
}

interface PetCreated {
  id:string;
}

const CreatePet: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const { currentLocation } = useLocation();

  const [specie, setSpecie] = useState<'dog' | 'cat' | 'rodent' | 'rabbit' | 'fish' | 'others'>('others');
  const [age, setAge] = useState<'- 1 ano' | '1 ano' | '2 anos' | '3 anos' | '4 anos' | '+ 4 anos'>('- 1 ano');
  const [gender, setGender] = useState<'male'|'female'>('female');
  const [latitude, setLatitude] = useState(-15.780107);
  const [longitude, setLongitude] = useState(-48.140725);
  const [images, setImages] = useState<ImagesProps[]>([
    {
      id: 0,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 2,
      image: null
    },
    {
      id: 3,
      image: null
    },
  ]);

  useEffect(() => {
    if(currentLocation.lat && currentLocation.lon){
      setLatitude(Number(currentLocation.lat));
      setLongitude(Number(currentLocation.lon));
    }
  },[currentLocation.lat]);

  const handleSelectImage = useCallback((index:number) => {
    launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 625,
      maxWidth: 625,
    }, response => {
      if (response.didCancel){
        return;
      }
      if (response.errorCode){
        Alert.alert('Erro ao atualizar a imagem');
        console.log(response.errorMessage);
        return;
      }

      const imageUri = response.assets[0].uri;

      if(imageUri){
        let newImages = [...images];
        newImages[index].image = imageUri;
        setImages(newImages)
      }

    });
  }, [images]);

  const handleCreatePet = useCallback(async (data:CreatePetFormData) => {
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
        if(image.image){
          hasImage = true;
        }
      });

      if(hasImage){
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
            if(image.image){
              const dataImage = new FormData();

              dataImage.append('image', {
                type: 'image/jpeg',
                name: `${petCreated.id+image.id}.jpg`,
                uri: image.image,
              });
              dataImage.append('pet_id', petCreated.id);

              console.log(dataImage)

              api.patch('images', dataImage).catch(() =>{
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
      }else{
        Alert.alert(
          'Nenhuma imagem selecionada',
          'Selecione pelo menos uma imagem do pet',
        );
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError){
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
  }, [age, gender, specie])

  return(
    <>
      <Header title="Novo Anúncio"/>
        <Container>
        <FormContainer>
              <Form
                ref={formRef}
                onSubmit={handleCreatePet}
                style={{marginTop: 33}}
              >
              <FormHeader>
                <ImagesContainer>
                    {images[0].image ? (
                      <UploadImageButton size={120} radius={60} onPress={() => handleSelectImage(0)}>
                        <MainImage source={{uri:images[0].image}}/>
                      </UploadImageButton>
                    ): (
                      <UploadImageButton size={120} radius={60} onPress={() => handleSelectImage(0)}>
                        <Icon name="camera" size={90} color="#12BABA"/>
                      </UploadImageButton>
                    )}

                    <OthersImagesContainer>
                      {images[1].image ?
                        <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(1)}>
                          <OthersImage source={{uri:images[1].image}}/>
                        </UploadImageButton>
                      :
                        <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(1)}>
                          <Icon name="camera" size={20} color="#12BABA"/>
                        </UploadImageButton>
                      }
                      {images[2].image ?
                        <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(2)}>
                          <OthersImage source={{uri:images[2].image}}/>
                        </UploadImageButton>
                      :
                        <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(2)}>
                          <Icon name="camera" size={20} color="#12BABA"/>
                        </UploadImageButton>
                      }
                      {images[3].image ?
                        <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(3)}>
                          <OthersImage source={{uri:images[3].image}}/>
                        </UploadImageButton>
                      :
                        <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(3)}>
                          <Icon name="camera" size={20} color="#12BABA"/>
                        </UploadImageButton>
                      }
                    </OthersImagesContainer>
                </ImagesContainer>

                <SpeciePickerContainer>
                  <Column>
                    <SpeciePicker
                      isSelected={specie === 'dog'}
                      onPress={() => setSpecie('dog')}
                    >
                      <PetIcons
                        name="dog"
                        size={25}
                        color={specie === "dog" ? "#FFF" : "#C4C4C4"}
                      />
                    </SpeciePicker>
                    <SpeciePicker
                      isSelected={specie === 'rodent'}
                      onPress={() => setSpecie('rodent')}
                    >
                      <PetIcons
                        name="rodent"
                        size={25}
                        color={specie === "rodent" ? "#FFF" : "#C4C4C4"}
                      />
                    </SpeciePicker>
                    <SpeciePicker
                      isSelected={specie === 'fish'}
                      onPress={() => setSpecie('fish')}
                    >
                      <PetIcons
                        name="fish"
                        size={25}
                        color={specie === "fish" ? "#FFF" : "#C4C4C4"}
                      />
                    </SpeciePicker>
                  </Column>
                  <Column>
                    <SpeciePicker
                      isSelected={specie === 'cat'}
                      onPress={() => setSpecie('cat')}
                    >
                      <PetIcons
                        name="cat"
                        size={25}
                        color={specie === "cat" ? "#FFF" : "#C4C4C4"}
                      />
                    </SpeciePicker>
                    <SpeciePicker
                      isSelected={specie === 'rabbit'}
                      onPress={() => setSpecie('rabbit')}
                    >
                      <PetIcons
                        name="rabbit"
                        size={25}
                        color={specie === "rabbit" ? "#FFF" : "#C4C4C4"}
                      />
                    </SpeciePicker>
                    <SpeciePicker
                      isSelected={specie === 'others'}
                      onPress={() => setSpecie('others')}
                    >
                      <PetIcons
                        name="paw"
                        size={25}
                        color={specie === "others" ? "#FFF" : "#C4C4C4"}
                      />
                    </SpeciePicker>
                  </Column>
                </SpeciePickerContainer>
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

                <AgeContainer horizontal showsHorizontalScrollIndicator={false}>
                  <AgeButton isSelected={age === '- 1 ano'} onPress={() => setAge('- 1 ano')}>
                    <AgeText isSelected={age === '- 1 ano'}>
                      - 1 ano
                    </AgeText>
                  </AgeButton>
                  <AgeButton isSelected={age === '1 ano'} onPress={() => setAge('1 ano')}>
                    <AgeText isSelected={age === '1 ano'}>
                      1 ano
                    </AgeText>
                  </AgeButton>
                  <AgeButton isSelected={age === '2 anos'} onPress={() => setAge('2 anos')}>
                    <AgeText isSelected={age === '2 anos'}>
                       2 anos
                    </AgeText>
                  </AgeButton>
                  <AgeButton isSelected={age === '3 anos'} onPress={() => setAge('3 anos')}>
                    <AgeText isSelected={age === '3 anos'}>
                       3 anos
                    </AgeText>
                  </AgeButton>
                  <AgeButton isSelected={age === '4 anos'} onPress={() => setAge('4 anos')}>
                    <AgeText isSelected={age === '4 anos'}>
                       4 anos
                    </AgeText>
                  </AgeButton>
                  <AgeButton isSelected={age === '+ 4 anos'} onPress={() => setAge('+ 4 anos')}>
                    <AgeText isSelected={age === '+ 4 anos'}>
                     + 4 anos
                    </AgeText>
                  </AgeButton>
                </AgeContainer>

                <Label>
                  Genêro
                </Label>
                <GenderContainer>
                  <ButtonWrapper style={{marginRight:17}}>
                    <Button
                      title="Macho"
                      bgColor={gender === 'male' ? "#12BABA" : "#B8EAEA" }
                      borderColor='transparent'
                      color={gender === 'male' ? "#FFF" : "#4E4D4D"}
                      onPress={() => setGender('male')}
                    >
                      <Icon
                        name="male"
                        size={20}
                        color={gender === 'male' ? '#FFF'  : '#129CBA' }
                        style={{marginRight:11}}
                      />
                    </Button>
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <Button
                      title="Femea"
                      bgColor={gender === 'female' ? "#12BABA" : "#B8EAEA" }
                      borderColor='transparent'
                      color={gender === 'female' ? "#FFF" : "#4E4D4D"}
                      onPress={() => setGender('female')}
                    >
                      <Icon
                        name="female"
                        size={20}
                        color={gender === 'female' ? '#FFF' :'#ED9090' }
                        style={{marginRight:11}}
                      />
                    </Button>
                  </ButtonWrapper>
                </GenderContainer>

                <Input
                  name="description"
                  icon="mail"
                  placeholder="breve descrição"
                />

                <LocationContainer>
                  <Label>
                    Localização
                  </Label>
                  <InputContainer>
                    <Input
                      name="location"
                      icon="search"
                      placeholder="buscar..."
                    />
                  </InputContainer>
                  <Map
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                      latitude: latitude,
                      longitude: longitude,
                      latitudeDelta: 0.008,
                      longitudeDelta: 0.008,
                    }}
                  >
                    <Marker
                      icon={MarkerImg}
                      coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                      }}
                    />
                  </Map>
                </LocationContainer>

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
      <TabMenu/>
    </>
  )
}

export default CreatePet;

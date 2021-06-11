import React, { useCallback, useRef } from 'react';

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
} from './styles';

import api from '../../../services/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import DefaultImage from '../../../assets/Vector.png';
import TabMenu from '../../../components/TabMenu';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Button from '../../../components/Button';

const CreatePet: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleCreatePet = useCallback(() => {

  }, [])

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
                    <MainImage source={DefaultImage}/>
                    <OthersImagesContainer>
                      <OthersImage source={DefaultImage}/>
                      <OthersImage source={DefaultImage}/>
                      <OthersImage source={DefaultImage}/>
                    </OthersImagesContainer>
                </ImagesContainer>

                <SpeciePickerContainer>
                  <Column>
                    <SpeciePicker></SpeciePicker>
                    <SpeciePicker></SpeciePicker>
                    <SpeciePicker></SpeciePicker>
                  </Column>
                  <Column>
                    <SpeciePicker></SpeciePicker>
                    <SpeciePicker></SpeciePicker>
                    <SpeciePicker></SpeciePicker>
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
                  <AgeButton>
                    <AgeText>
                      - 1 ano
                    </AgeText>
                  </AgeButton>
                  <AgeButton>
                    <AgeText>
                      1 ano
                    </AgeText>
                  </AgeButton>
                  <AgeButton>
                    <AgeText>
                       2 anos
                    </AgeText>
                  </AgeButton>
                  <AgeButton>
                    <AgeText>
                       3 anos
                    </AgeText>
                  </AgeButton>
                  <AgeButton>
                    <AgeText>
                       4 anos
                    </AgeText>
                  </AgeButton>
                  <AgeButton>
                    <AgeText>
                     + 4 anos
                    </AgeText>
                  </AgeButton>
                </AgeContainer>

                <Label>
                  Genêro
                </Label>
                <GenderContainer>
                  <ButtonWrapper style={{marginRight:17}}>
                    <Button title="Macho" bgColor="#B8EAEA" borderColor='transparent' color="#4E4D4D" >
                      <Icon name="male" size={20} color='#129CBA'/>
                    </Button>
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <Button title="Femea" bgColor="#B8EAEA"  borderColor='transparent' color="#4E4D4D">
                      <Icon name="female" size={20} color='#ED9090'/>
                    </Button>
                  </ButtonWrapper>
                </GenderContainer>

                <Input
                  name="description"
                  icon="mail"
                  placeholder="breve descrição"
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

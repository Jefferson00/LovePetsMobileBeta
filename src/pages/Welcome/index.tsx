import React from 'react';

import {
  Container,
  Title,
  Subtitle,
  ButtonsContainer,
  Button,
  TextButton,
  TextContainer,
} from './styles';

import PetsImg from '../../assets/pets.png';
import DonateImg from '../../assets/donate.png';
import AdoptImg from '../../assets/adopt.png';


import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Welcome: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
    <Container>
      <Image source={PetsImg} />

      <TextContainer>
        <Title>
          Bem vindo!
        </Title>
        <Subtitle>
          Escolha uma opção
        </Subtitle>
      </TextContainer>

      <ButtonsContainer>
          <Button onPress={() => navigation.navigate('SignIn')}>
            <Image source={DonateImg}/>
            <TextButton>
              Doar
            </TextButton>
          </Button>

          <Button color="#12BABA" onPress={() => navigation.navigate('Home')}>
            <Image source={AdoptImg}/>
            <TextButton>
              Adotar
            </TextButton>
          </Button>

      </ButtonsContainer>
    </Container>
    </>
  )
}

export default Welcome;

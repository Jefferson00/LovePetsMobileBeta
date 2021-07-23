import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { Container, Title } from './styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={35} color="#12BABA" />
      </TouchableOpacity>
      <Title>
        {title}
      </Title>
    </Container>
  )
}

export default Header;

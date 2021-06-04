import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {Container, Title} from './styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) =>{
  return(
    <Container>
      <Icon name="arrow-left" size={35} color="#12BABA"/>
      <Title>
        {title}
      </Title>
    </Container>
  )
}

export default Header;

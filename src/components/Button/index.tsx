import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import {Container, ButtonText, ContainerWrapper} from './styles';

interface ButtonProps extends RectButtonProperties{
  bgColor?:string;
  color?:string;
  icon?:string;
  title:string;
}

const Button: React.FC<ButtonProps> = ({children, bgColor, color, icon, title, ...rest}) =>{
  return(
    <ContainerWrapper color={color} bgColor={bgColor}>
        <Container
          {...rest}
        >
          {children}
          <ButtonText color={color}>
            {title}
          </ButtonText>
      </Container>
    </ContainerWrapper>
  )
}

export default Button;

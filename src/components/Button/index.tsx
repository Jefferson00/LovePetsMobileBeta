import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import {Container, ButtonText, ContainerWrapper} from './styles';

interface ButtonProps extends RectButtonProperties{
  children: string;
  bgColor?:string;
  color?:string;
  icon?:string;
}

const Button: React.FC<ButtonProps> = ({children, bgColor, color, icon, ...rest}) =>{
  return(
    <ContainerWrapper color={color} bgColor={bgColor}>
        <Container
          {...rest}
        >
          <ButtonText color={color}>
            {children}
          </ButtonText>
      </Container>
    </ContainerWrapper>
  )
}

export default Button;

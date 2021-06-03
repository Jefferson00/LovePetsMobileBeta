import styled, {css} from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  bgColor?: string;
  color?:string;
}

interface TextProps {
  color?:string;
}

export const ContainerWrapper = styled.View<ContainerProps>`
  border-width: 2px;
  border-color: #12BABA;
  border-style:solid;
  height: 60px;
  border-radius: 20px;
  background: #12BABA;
  margin-bottom: 11px;

  ${(props) => props.bgColor &&
    css`
      background: ${props.bgColor};
    `
  }

  ${(props) => props.color &&
    css`
      border-color: ${props.color};
    `
  }
`

export const Container = styled(RectButton)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  border-radius: 20px;

`

export const ButtonText = styled.Text<TextProps>`
  font-size: 18px;
  font-family: 'Roboto-Medium';
  color: #FFFFFF;

  ${(props) => props.color &&
    css`
      color: ${props.color};
    `
  }
`

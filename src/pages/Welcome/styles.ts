import styled, {css} from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps{
  color?: string;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #F43434;
`

export const TextContainer = styled.View`
  align-items: flex-start;
  width: 100%;
  padding: 40px;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: 18px;
  color: #FFFFFF;
  font-family: 'Roboto-Medium';
  margin-top: 12px;
`

export const Subtitle = styled.Text`
  font-size: 16px;
  color: #FFFFFF;
  font-family: 'Roboto-Regular';
  margin-top: 6px;
`
export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`

export const Button = styled(RectButton)<ButtonProps>`
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #FF7E7E;

  ${(props) => props.color &&
    css`
      background: ${props.color};
    `
  }
`

export const TextButton = styled.Text`
  font-size: 18px;
  color: #FFFFFF;
  font-family: 'Roboto-Medium';
  margin-top: 12px;
`


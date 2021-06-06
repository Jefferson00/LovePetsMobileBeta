import styled, {css} from 'styled-components/native';

import {TextInput} from 'react-native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

interface TextErrorProps{
  isVisible: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  background: #FFFFFF;
  border: 1px solid #BABABA;
  border-radius: 20px;
  padding: 0 15px;
  margin-bottom: 16px;
  align-items: center;
  flex-direction: row;
  position: relative;

  ${(props) => props.isErrored &&
    css`
      border-color: #c53030;
    `
  }
  ${(props) => props.isFocused &&
    css`
      border-color: #12BABA;
    `
  }
`
export const InputText = styled(TextInput)`
  flex: 1;
  margin-left: 8px;
  color: #350808;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`
export const ErrorContainer = styled.View`
  align-items: flex-end;
`
export const TextErrorContainer = styled.View`

`
export const TextError = styled.Text<TextErrorProps>`
  opacity: 0;
  color: #ba1212;
  font-size: 10px;
  margin-bottom: 6px;

  ${(props) => props.isVisible &&
    css`
      opacity: 1;
    `
  }
`

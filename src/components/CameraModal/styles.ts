import styled, { css } from 'styled-components/native';

interface ButtonsProps {
  type?: 'ok' | 'cancel';
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
export const ContainerContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #00000090;
  padding: 0 28px;
`
export const ModalContent = styled.View`
  background: #FFF;
  height: 280px;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  width: 100%;
`

export const Title = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Medium';
  margin-top:36px;
`
export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

`
export const Button = styled.TouchableOpacity`
  margin: 0 16px;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #F1f1f1;
`
export const ButtonCancel = styled.TouchableOpacity`
  margin: 16px 0 36px 0;

`
export const TextButton = styled.Text<ButtonsProps>`
  font-size: 18px;
  font-family: 'Roboto-Medium';

  ${(props) => props.type === 'ok' &&
    css`
      color: #12BABA;
    `
  }
  ${(props) => props.type === 'cancel' &&
    css`
      color: #BABABA;
    `
  }
`

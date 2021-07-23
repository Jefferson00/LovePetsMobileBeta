import styled, { css } from 'styled-components/native';

interface TitleProps {
  type: 'success' | 'error' | 'info' | 'confirmation' | 'loading';
}

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
  align-items: center;
  padding: 34px 22px;
  border-radius: 20px;
  width: 100%;
`

export const Title = styled.Text<TitleProps>`
  font-size: 18px;
  font-family: 'Roboto-Medium';
  margin-top:16px;

  ${(props) => props.type === 'confirmation' &&
    css`
      color: #c53030;
    `
  }
  ${(props) => props.type === 'error' &&
    css`
      color: #c53030;
    `
  }
  ${(props) => props.type === 'success' &&
    css`
      color: #000;
    `
  }
  ${(props) => props.type === 'info' &&
    css`
      color: #000;
    `
  }
`

export const Subtitle = styled.Text<TitleProps>`
  font-size: 14px;
  font-family: 'Roboto-Medium';
  margin:16px 0;

  ${(props) => props.type === 'confirmation' &&
    css`
      color: #350808;
    `
  }
  ${(props) => props.type === 'error' &&
    css`
      color: #350808;
    `
  }
  ${(props) => props.type === 'success' &&
    css`
      color: #000;
    `
  }
  ${(props) => props.type === 'info' &&
    css`
      color: #000;
    `
  }
`
export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`
export const ButtonOk = styled.TouchableOpacity`
  margin: 0 16px;
`
export const ButtonCancel = styled.Text`
  margin: 0 16px;

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
      color: #606060;
    `
  }
`

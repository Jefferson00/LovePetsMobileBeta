import styled, {css} from 'styled-components/native';

interface AgeButtonProps{
  isSelected?: boolean;
}

export const Container = styled.ScrollView`
  margin-top: 11px;
  height: 22px;
  margin-bottom: 29px;
`;

export const AgeButton = styled.TouchableOpacity<AgeButtonProps>`
  height: 20px;
  background: #B8EAEA;
  margin-right: 10px;
  padding: 0 11px;
  border-radius: 10px;

  ${(props) => props.isSelected &&
    css`
      background: #12BABA;
    `
  }
`
export const AgeText = styled.Text<AgeButtonProps>`
  color:#4E4D4D;
  font-size: 14px;
  font-family:'Roboto-Medium';

  ${(props) => props.isSelected &&
    css`
      color: #FFF;
    `
  }
`

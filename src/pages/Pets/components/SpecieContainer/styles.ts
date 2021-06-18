import styled, {css} from 'styled-components/native';

interface SpeciePickerProps{
  isSelected?: boolean;
}

export const Container = styled.View`
  flex-direction: row;
`;

export const Column = styled.View`
  margin-right: 26px;
`
export const SpeciePicker = styled.TouchableOpacity<SpeciePickerProps>`
  width: 34px;
  height: 34px;
  border-width: 1px;
  border-color: #c4c4c4;
  border-radius: 17px;
  margin-bottom: 15px;
  align-items: center;
  justify-content: center;

  ${(props) => props.isSelected &&
    css`
      border-color: #12BABA;
      background: #12BABA;
    `
  }
`

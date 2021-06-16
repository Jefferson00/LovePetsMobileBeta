import styled, {css} from 'styled-components/native';

import MapView from 'react-native-maps';

interface UploadButtonProps {
  size: number;
  radius:number;
}

interface SpeciePickerProps{
  isSelected?: boolean;
}

interface AgeButtonProps{
  isSelected?: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
  height: 100%;
  padding: 16px 17px 125px 17px;
`
export const FormContainer = styled.View`
  flex: 1;
  background: #FFFFFF;
  border-width: 1px;
  border-color: #C4C4C4;
  border-radius: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 17px 16px;
`
export const FormHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ImagesContainer = styled.View`
  margin-left: 26px;
`

export const UploadImageButton = styled.TouchableOpacity<UploadButtonProps>`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-color:#d2d2d2;
  border-width: 1px;
  justify-content: center;
  align-items: center;

  ${(props) => props.size &&
    css`
      width: ${props.size+'px'};
      height: ${props.size+'px'};
      border-radius: ${props.radius+'px'};
    `
  }
`

export const MainImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-color:#d2d2d2;
  border-width: 1px;
`
export const OthersImagesContainer = styled.View`
   flex-direction: row;
   justify-content: space-between;
   margin-top: 16px;
`
export const OthersImage = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border-color:#d2d2d2;
  border-width: 1px;
`
export const SpeciePickerContainer = styled.View`
  flex-direction: row;

`
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
export const FormBody = styled.View`
  width:100%;
  margin-top: 30px;
`
export const Label = styled.Text`
  color:#12BABA;
  font-size: 14px;
  font-family: 'Roboto-Medium';
`
export const AgeContainer = styled.ScrollView`
  margin-top: 11px;
  height: 22px;
  margin-bottom: 29px;
`
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
export const GenderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
`
export const ButtonWrapper = styled.View`
  width:45%;
`
export const LocationContainer = styled.View`
  margin: 18px 0;
  position: relative;
`
export const InputContainer = styled.View`
  position: absolute;
  width: 100%;
  top:54px;
  left: 0;
  z-index: 5;
  padding: 0 30px;
`
export const Map = styled(MapView)`
  height: 335px;
  width: 100%;
  margin-top: 20px;
`

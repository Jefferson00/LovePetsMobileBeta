import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 100px 17px 0 17px;
`
export const FormContainer = styled.View`
  height: 100%;
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
`

export const ImagesContainer = styled.View`

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
export const SpeciePicker = styled.TouchableOpacity`
  width: 34px;
  height: 34px;
  border-width: 1px;
  border-color: #c4c4c4;
  border-radius: 17px;
  margin-bottom: 15px;
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
export const AgeButton = styled.TouchableOpacity`
  height: 20px;
  background: #B8EAEA;
  margin-right: 10px;
  padding: 0 11px;
  border-radius: 10px;
`
export const AgeText = styled.Text`
  color:#4E4D4D;
  font-size: 14px;
  font-family:'Roboto-Medium';
`
export const GenderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  max-width: 100%;
  justify-content: space-between;
  margin-top:15px;
`
export const ButtonWrapper = styled.View`
  width:45%;
`
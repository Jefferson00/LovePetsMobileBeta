import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 17px;
`
export const CardPet = styled.View`
  background: #FFFFFF;
  border-width: 1px;
  border-color: #C4C4C4;
  border-radius: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 27px 16px;
  position: relative;
  margin-bottom: 30px;
`
export const ImagePet = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  margin-bottom: 11px;
`
export const Title = styled.Text`
  color:#000;
  font-size: 24px;
  font-family: 'Roboto-Medium';
`
export const InfoContainer = styled.View`
  flex-direction: row;
  width: 160px;
  align-items: center;
  justify-content: center;
  margin-top:11px;
`
export const InfoText = styled.Text`
  font-size:14px;
  font-family: 'Roboto-Medium';
  color: #AbAbAb;
`
export const EditButton = styled.TouchableOpacity`
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export const EditText = styled.Text`
  color:#12BABA;
  font-size:16px;
  font-family: 'Roboto-Medium';
`
export const DeleteContainer = styled.View`
  position: absolute;
  top:0;
  right: 0;
  padding: 18px 25px;
`
export const DeleteButton = styled.TouchableOpacity`

`
export const NoResultView = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`

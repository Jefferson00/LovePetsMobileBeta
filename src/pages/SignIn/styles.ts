import styled from 'styled-components/native';

import { Dimensions } from 'react-native';

let logoHeight = 'auto';
let logoWidth = 'auto';

if (Dimensions.get('window').height < 800) {
  logoHeight = '65px';
  logoWidth = '65px';
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 48px 17px 0 17px;
`
export const Title = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Medium';
  margin-top: 24px;
  color: #FFFFFF;
`
export const Subtitle = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Regular';
  color: #FFFFFF;
`
export const FormTitle = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Medium';
  color: #9B0F0F;
  margin: 20px 0 16px 16px;
`
export const FormContainer = styled.View`
  background-color: #ffffff;
  width: 100%;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  flex:1;
  margin-top: 28px;
  padding: 25px;
`
export const ForgotPasswordContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 26px;
  margin-right: 16px;
`
export const ForgotPasswordText = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Regular';
  color: #12BABA;
`
export const LinkSignUpContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 6px;
`
export const LinkSignUpText = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Regular';
  color: #9B0F0F;
  margin-left: 8px;
`
export const Logo = styled.Image`

`


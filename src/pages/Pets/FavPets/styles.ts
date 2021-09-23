import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 6px 17px;
`
export const CardPet = styled.View`

  width: 100%;
  position: relative;
  margin-bottom: 45px;
  margin-top: 47px;
  border-radius: 20px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #C4C4C4;
  padding: 6px;
`
export const ImagePet = styled.Image`
  height: 535px;
  width: 342px;
  border-width: 1px;
  border-color: #ffffff;
  border-radius: 20px;
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
export const Subtitle = styled.Text`
  font-size:16px;
  font-family: 'Roboto-Medium';
`
export const DeleteContainer = styled.View`
  position: absolute;
  top:0;
  right: 0;
  padding: 18px 25px;
`
export const FavButton = styled.TouchableOpacity`
  width:40px;
  height: 40px;
  background: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`
export const NoResultView = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`
export const DescriptionContainer = styled.View`
  margin: 30px 0;
  justify-content: flex-start;
  width: 100%;
  padding: 0 18px;
`

export const Description = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color:#656565;
`
export const ContactContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  align-items: center;
`
export const UserInformation = styled.View`
 flex: 1;
 flex-direction: row;
 align-items: center;
`
export const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`
export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
`
export const SharedContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

export const ReportContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`
export const LocationContainer = styled.View`
  align-items: flex-end;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%;
  padding: 0 18px;
`
export const Main = styled.View`
  width: 100%;
  padding: 0 18px;
`
export const TinyText = styled.Text`
  font-size: 12px;
  font-family: 'Roboto-Regular';
  color: #797979;
`

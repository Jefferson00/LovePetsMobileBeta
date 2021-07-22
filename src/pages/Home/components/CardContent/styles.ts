import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const ContentContainer = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #FFF;
  border-radius: 20px;
  height:56px;
`
export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 19px;
`
export const FavButton = styled.TouchableOpacity`

`
export const ExpandButton = styled.TouchableOpacity`
  height: 100%;
  flex:1;
  align-items: center;
  justify-content: center;
`

export const NameContainer = styled.View`
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Medium';
  color: #313131;
`
export const LocationContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 20%;
`

export const Subtitle = styled.Text`
  font-size: 12px;
  font-family: 'Roboto-Regular';
  color: #797979;
`

export const BodyContent = styled.View`
  margin: 16px 19px 0 19px;
`

export const DescriptionContainer = styled.View`
  margin-bottom: 50px;
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
  margin-top: 8px;
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
export const DotsContainer = styled.View`
  position: absolute;
  top: -25px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
export const Dots = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #f43434;
  margin-right: 10px;
  border-width: 1px;
  border-color: #fff;
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
export const RadioContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`
export const ReportTitleContainer = styled.View`
  margin-bottom: 32px;
`
export const RadioLabel = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color:#656565;
`
export const ReportSubmit = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  margin-top: 32px;
  border-radius: 20px;
  background: #12BABA;
  justify-content: center;
  align-items: center;
`
export const ReportSubmitText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color:#FFF;
`
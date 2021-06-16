import styled, {css} from 'styled-components/native';

import {Animated} from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 100px 17px 0 17px;
`
export const ResultList = styled.FlatList`
  flex: 1;
  width: 100%;
`

export const CardItem = styled.View`
  height: 535px;
  width: 100%;
  position: relative;
  margin-bottom: 45px;
  margin-top: 47px;
  border-radius: 20px;
  overflow: hidden;
`
export const PetImage = styled.Image`
  width: 342px;
  height: 100%;
  border-width: 1px;
  border-color: #ffffff;
  border-radius: 20px;
`
export const GenderContainer = styled.View`
  height: 40px;
  width: 40px;
  position: absolute;
  top:12px;
  right: 21px;
  background: #FFF;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`
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

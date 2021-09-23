import styled from 'styled-components/native';


export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 17px;
  margin: 17px 0;
`
export const UserProfileContainer = styled.View`
  min-height: 277px;
  background: #FFFFFF;
  border-width: 1px;
  border-style: solid;
  border-color: #C4C4C4;
  border-radius: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 17px 16px;
`
export const ImageContainer = styled.View`
  position: relative;
`
export const UserAvatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  z-index: 1;
`
export const UpdateAvatarButton = styled.TouchableOpacity`
  width: 33px;
  height: 33px;
  background: #12BABA;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
  border-radius:16px;
  align-items: center;
  justify-content: center;
`

export const UserName = styled.Text`
  font-size: 24px;
  font-family: 'Roboto-Medium';
  margin-top: 22px;
`
export const LocationText = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Regular';
  color: #ABABAB;
`
export const EditContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 22px;
`
export const EditText = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Medium';
  color: #12BABA;
  margin-left: 8px;
`
export const ProfileButton = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
  border-radius: 20px;
  border: 1px solid #c4c4c4;
  background: #ffffff;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`
export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Medium';
  color: #5e5e5e;
`


export const UpdateProfileContainer = styled.View`
  flex: 1;
  background: #FFFFFF;
  border-width: 1px;
  border-style: solid;
  border-color: #C4C4C4;
  border-radius: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 17px 16px;
`

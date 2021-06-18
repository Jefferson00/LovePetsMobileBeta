import styled from 'styled-components/native';

import MapView from 'react-native-maps';

export const Container = styled.View`
  margin: 18px 0;
  position: relative;
`;

export const Label = styled.Text`
  color:#12BABA;
  font-size: 14px;
  font-family: 'Roboto-Medium';
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

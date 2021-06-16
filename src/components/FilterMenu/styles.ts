import styled, {css} from "styled-components/native";

import { Animated } from 'react-native';

interface SpecieButtonProps{
  isSelected?:boolean;
}

export const Container = styled(Animated.View)`
  position: absolute;
  right: 0;
  top:45px;

  background:#F43434;
  border-top-left-radius:20px;
  border-bottom-left-radius:20px;
  z-index: 10;
  padding: 22px;
  overflow: hidden;
`
export const FilterMenuButton = styled.TouchableOpacity`
  height: 24px;
  width: 100%;

`
export const Content = styled.View`
  margin-top: 16px;
`
export const SpecieFilterContainer = styled.View`

`
export const Title = styled.Text`
  font-size: 14px;
  color:#FFF;
  font-family: 'Roboto-Medium';
`
export const SpecieList = styled.ScrollView`
  height: 55px;
  margin-top: 13px;
`
export const SpecieButton = styled.TouchableOpacity<SpecieButtonProps>`
  height: 40px;
  width: 40px;
  background: #FFF;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;

  ${(props) => props.isSelected &&
    css`
      background: #12BABA;
    `
  }
`
export const GenderFilterContainer = styled.View`
  margin-top: 28px;
`
export const GenderList = styled.View`
  height: 55px;
  margin-top: 13px;
  flex-direction: row;
`
export const GenderButton = styled.TouchableOpacity<SpecieButtonProps>`
  height: 50px;
  width: 50px;
  background: #FFF;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  flex-direction: row;

  ${(props) => props.isSelected &&
    css`
      background: #12BABA;
    `
  }
`
export const RadiusContainer = styled.View`
 margin-top: 28px;
`

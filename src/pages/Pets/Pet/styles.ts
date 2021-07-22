import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #F43434;
  justify-content: center;
  padding-top: 100px;
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
  width: 100%;
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
export const EmptyContainer = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
`
export const EmptyText = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Regular';
  color:  #383838;
`

import styled, {css} from 'styled-components/native';

interface UploadButtonProps {
  size: number;
  radius:number;
}

export const Container = styled.View`
  margin-left: 26px;
`;

export const ImageDeleteContainer = styled.View`
  position: relative;
`

export const ImageDeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: -11px;
  right: -14px;
`

export const UploadImageButton = styled.TouchableOpacity<UploadButtonProps>`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-color:#d2d2d2;
  border-width: 1px;
  justify-content: center;
  align-items: center;

  ${(props) => props.size &&
    css`
      width: ${props.size+'px'};
      height: ${props.size+'px'};
      border-radius: ${props.radius+'px'};
    `
  }
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

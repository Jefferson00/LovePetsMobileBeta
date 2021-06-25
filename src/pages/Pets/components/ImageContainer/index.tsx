import React from 'react';

import {
  Container,
  MainImage,
  OthersImage,
  OthersImagesContainer,
  UploadImageButton,
  ImageDeleteContainer,
  ImageDeleteButton,
} from './styles';

import Icon from 'react-native-vector-icons/Ionicons';

interface PetImages{
  id:string | null;
  pet_id:string;
  image:string;
  image_url:string | null;
}

interface ImageContainerProps{
  images: PetImages[];
  isUpdated?:boolean;
  handleSelectImage: (index:number) => void;
}

const ImageContainer: React.FC<ImageContainerProps> = ({images, isUpdated, handleSelectImage}) => {

  return (
    <Container>
      {images[0].image_url ? (
          <UploadImageButton size={120} radius={60} onPress={() => handleSelectImage(0)}>
            <MainImage source={{ uri: images[0].image_url }} />
          </UploadImageButton>
      ) : (
        <UploadImageButton size={120} radius={60} onPress={() => handleSelectImage(0)}>
          <Icon name="camera" size={90} color="#12BABA" />
        </UploadImageButton>
      )}

      <OthersImagesContainer>
        {images[1].image_url ?
          isUpdated ?
          <ImageDeleteContainer>
            <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(1)}>
              <OthersImage source={{ uri: images[1].image_url }} />
            </UploadImageButton>
            <ImageDeleteButton>
              <Icon name="trash" size={20} color="#BA1212"/>
            </ImageDeleteButton>
          </ImageDeleteContainer>
          :
          <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(1)}>
            <OthersImage source={{ uri: images[1].image_url }} />
          </UploadImageButton>
          :
          <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(1)}>
            <Icon name="camera" size={20} color="#12BABA" />
          </UploadImageButton>
        }
        {images[2].image_url ?
          isUpdated ?
          <ImageDeleteContainer>
            <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(2)}>
              <OthersImage source={{ uri: images[2].image_url }} />
            </UploadImageButton>
            <ImageDeleteButton>
              <Icon name="trash" size={20} color="#BA1212"/>
            </ImageDeleteButton>
          </ImageDeleteContainer>
          :
          <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(2)}>
            <OthersImage source={{ uri: images[2].image_url }} />
          </UploadImageButton>
          :
          <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(2)}>
            <Icon name="camera" size={20} color="#12BABA" />
          </UploadImageButton>
        }
        {images[3].image_url ?
          isUpdated ?
          <ImageDeleteContainer>
            <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(3)}>
              <OthersImage source={{ uri: images[3].image_url }} />
            </UploadImageButton>
            <ImageDeleteButton>
              <Icon name="trash" size={20} color="#BA1212"/>
            </ImageDeleteButton>
          </ImageDeleteContainer>
          :
          <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(3)}>
            <OthersImage source={{ uri: images[3].image_url }} />
          </UploadImageButton>
          :
          <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(3)}>
            <Icon name="camera" size={20} color="#12BABA" />
          </UploadImageButton>
        }
      </OthersImagesContainer>
    </Container>
  )
}

export default ImageContainer;

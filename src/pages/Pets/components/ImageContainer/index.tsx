import React from 'react';

import {
  Container,
  MainImage,
  OthersImage,
  OthersImagesContainer,
  UploadImageButton,
} from './styles';

import Icon from 'react-native-vector-icons/Ionicons';

interface ImagesProps{
  id: number;
  image: string | null;
}

interface PetImages{
  id:string | null;
  pet_id:string;
  image:string;
  image_url:string | null;
}

interface ImageContainerProps{
  images: PetImages[];
  handleSelectImage: (index:number) => void;
}

const ImageContainer: React.FC<ImageContainerProps> = ({images, handleSelectImage}) => {

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
          <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(1)}>
            <OthersImage source={{ uri: images[1].image_url }} />
          </UploadImageButton>
          :
          <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(1)}>
            <Icon name="camera" size={20} color="#12BABA" />
          </UploadImageButton>
        }
        {images[2].image_url ?
          <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(2)}>
            <OthersImage source={{ uri: images[2].image_url }} />
          </UploadImageButton>
          :
          <UploadImageButton size={30} radius={15} onPress={() => handleSelectImage(2)}>
            <Icon name="camera" size={20} color="#12BABA" />
          </UploadImageButton>
        }
        {images[3].image_url ?
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

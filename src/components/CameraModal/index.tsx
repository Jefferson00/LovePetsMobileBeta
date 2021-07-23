import React from 'react';
import { ModalBaseProps, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Container,
  ModalContent,
  ButtonsContainer,
  ButtonCancel,
  Button,
  TextButton,
  Title,
  ContainerContent,
} from './styles';

interface ModalProps extends ModalBaseProps {
  onCameraModalCancel: () => void;
  onSelectGallery: () => void;
  onSelectCamera: () => void;
}

const CameraModal: React.FC<ModalProps> = ({
  onCameraModalCancel,
  onSelectGallery,
  onSelectCamera,
  ...rest
}) => {

  return (
    <Container>
      <Modal
        {...rest}
      >
        <ContainerContent>
          <ModalContent>
            <Title> Escolha uma opção </Title>
            <ButtonsContainer>
              <Button onPress={onSelectCamera}>
                <Icon name="camera" size={65} color="#12BABA" />
                <TextButton type="ok">
                  Camera
                </TextButton>
              </Button>
              <Button onPress={onSelectGallery}>
                <Icon name="folder-open" size={65} color="#12BABA" />
                <TextButton type="ok">
                  Galeria
                </TextButton>
              </Button>
            </ButtonsContainer>

            <ButtonCancel onPress={onCameraModalCancel}>
              <TextButton type="cancel">
                Cancelar
              </TextButton>
            </ButtonCancel>
          </ModalContent>
        </ContainerContent>
      </Modal>
    </Container>
  )
}

export default CameraModal;

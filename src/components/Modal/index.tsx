import React, { useCallback, useEffect, useRef, useState, useImperativeHandle, forwardRef, } from 'react';
import { ModalBaseProps, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  ModalContent,
  ButtonsContainer,
  ButtonCancel,
  ButtonOk,
  TextButton,
  Title,
  ContainerContent,
  Subtitle,
} from './styles';

interface ModalProps extends ModalBaseProps {
  title: string;
  subtitle?:string;
  icon: React.FC;
  type: 'success' | 'error' | 'info' | 'confirmation';
  handleConfirm: () => Promise<void>;
  handleCancel?: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({
  icon: Icon, title, type, subtitle, handleCancel, handleConfirm, ...rest
}) =>{

  return(
    <Container>
        <Modal
          {...rest}
         >
        <ContainerContent>
          <ModalContent>
            <Icon/>
            <Title
              type={type}
            >
              {title}
            </Title>
            {subtitle && (
              <Subtitle
                type={type}
              >
                {subtitle}
              </Subtitle>
            )}
            <ButtonsContainer>
              {type === 'confirmation' ?
                <>
                <ButtonOk onPress={handleConfirm}>
                  <TextButton type="ok">
                    OK
                  </TextButton>
                </ButtonOk>
                <ButtonCancel onPress={handleCancel}>
                  <TextButton type="cancel">
                    Cancel
                  </TextButton>
                </ButtonCancel>
                </>
                :
                <ButtonOk onPress={handleConfirm}>
                  <TextButton type="ok">
                    OK
                  </TextButton>
                </ButtonOk>
              }
            </ButtonsContainer>
          </ModalContent>
        </ContainerContent>
      </Modal>
    </Container>
  )
}

export default ModalComponent;

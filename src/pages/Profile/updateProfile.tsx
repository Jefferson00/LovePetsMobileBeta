import React, { useCallback, useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/core';
import { TextInput, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useAuth } from '../../hooks/AuthContext';

import * as Yup from 'yup';
import 'yup-phone';
import getValidationErrors from '../../utils/getValidationErrors';
import ModalIcon from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  UpdateProfileContainer,
  ImageContainer,
  UserAvatar,
  UpdateAvatarButton,
} from './styles';

import TabMenu from '../../components/TabMenu';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

import DefaultImg from '../../assets/default.png';
import ModalComponent from '../../components/Modal';
import CameraModal from '../../components/CameraModal';

interface SignUpFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const UpdateProfile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const inputNameRef = useRef<TextInput>(null);
  const inputPhoneRef = useRef<TextInput>(null);
  const inputOldPasswordRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const inputConfirmPasswordRef = useRef<TextInput>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info' | 'confirmation'>('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');

  const [cameraModal, setCameraModal] = useState(false);

  const handleUpdateProfile = useCallback(async (data: SignUpFormData) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório!').email('Digite um e-mail válido'),
        name: Yup.string().required('Nome é obrigatório!'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (oldPass: string) => !!oldPass.length,
          then: Yup.string().required('Campo obrigatório').min(6, 'Mínimo de 6 caracteres'),
          otherwise: Yup.string(),
        }),
        confirmPassword: Yup.string().when('old_password', {
          is: (oldPass: string) => !!oldPass.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }).equals(
          [Yup.ref('password')], 'a senha deve ser igual'),
        phone: Yup.string().phone('BR', false, 'formato incorreto, Ex: 61 99999-5555').required('Telefone é obrigatório!'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, phone, email, confirmPassword, old_password, password } = data;

      const formData = Object.assign({
        name,
        email,
        phone,
      }, old_password ? {
        old_password,
        password,
        confirmPassword,
      } : {});

      const response = await api.put('/profile', formData);

      updateUser(response.data);


      setModalTitle('Perfil atualizado com sucesso!');
      setModalSubtitle(' ');
      setModalType('success');
      setModalVisible(true);

      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        setModalTitle('Erro na atualização');
        setModalSubtitle('Preencha todos os campos corretamente.');
        setModalType('error');
        setModalVisible(true);
        setLoading(false);

        return;
      }

      setModalTitle('Erro na atualização');
      setModalSubtitle('Ocorreu um erro na atualização dos dados, tente novamente.');
      setModalType('error');
      setModalVisible(true);
    }
    setLoading(false);
  }, [])

  const handleUpdateAvatar = useCallback(() => {
    setCameraModal(true);

  }, [user.id, updateUser]);

  const handleSelectImageFromGallery = useCallback(() => {
    launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 625,
      maxWidth: 625,
    }, response => {
      if (response.didCancel) {
        setCameraModal(false);
        return;
      }
      if (response.errorCode) {
        setModalTitle('Erro na atualização');
        setModalSubtitle('Ocorreu um erro na atualização do seu avatar, tente novamente.');
        setModalType('error');
        setModalVisible(true);
        return;
      }

      const imageUri = response.assets[0].uri;

      const data = new FormData();

      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: imageUri,
      });

      api.patch('users/avatar', data).then(apiResponse => {
        updateUser(apiResponse.data);
      }).catch(() => {
        setModalTitle('Erro na atualização');
        setModalSubtitle('Não foi possível atualizar seu avatar, tente novamente.');
        setModalType('error');
        setModalVisible(true);
      });
    });
  }, [user.id, updateUser]);

  const handleSelectImageFromCamera = useCallback(() => {
    launchCamera({
      mediaType: 'photo',
      maxHeight: 625,
      maxWidth: 625,
    }, response => {
      if (response.didCancel) {
        setCameraModal(false);
        return;
      }
      if (response.errorCode) {
        setModalTitle('Erro na atualização');
        setModalSubtitle('Ocorreu um erro na atualização do seu avatar, tente novamente.');
        setModalType('error');
        setModalVisible(true);
        return;
      }

      const imageUri = response.assets[0].uri;

      const data = new FormData();

      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: imageUri,
      });

      api.patch('users/avatar', data).then(apiResponse => {
        updateUser(apiResponse.data);
      }).catch(() => {
        setModalTitle('Erro na atualização');
        setModalSubtitle('Não foi possível atualizar seu avatar, tente novamente.');
        setModalType('error');
        setModalVisible(true);
      });
    });
  }, [user.id, updateUser]);

  const handleCancelCamera = useCallback(() => {
    setCameraModal(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    setModalVisible(false);
  }, []);

  return (
    <>
      <Header title="Perfil" />
      <Container>

        <UpdateProfileContainer>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            style={{ width: '100%' }}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            <ImageContainer>
              {user.avatar_url ?
                <UserAvatar source={{ uri: user.avatar_url }} />
                :
                <UserAvatar source={DefaultImg} />
              }
              <UpdateAvatarButton onPress={handleUpdateAvatar}>
                <Icon name="camera" size={20} color="#FFFFFF" />
              </UpdateAvatarButton>
            </ImageContainer>

            <Form
              ref={formRef}
              onSubmit={handleUpdateProfile}
              style={{ marginTop: 33 }}
              initialData={{
                email: user.email,
                name: user.name,
                phone: user.phone,
              }}
            >
              <Input
                name="email"
                icon="mail"
                placeholder="e-mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputNameRef.current?.focus();
                }}
              />
              <Input
                ref={inputNameRef}
                name="name"
                icon="user"
                placeholder="nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputPhoneRef.current?.focus();
                }}
              />
              <Input
                ref={inputPhoneRef}
                name="phone"
                icon="phone"
                placeholder="whatsapp"
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputOldPasswordRef.current?.focus();
                }}
              />
              <Input
                ref={inputOldPasswordRef}
                name="old_password"
                icon="lock"
                placeholder="senha atual"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputPasswordRef.current?.focus();
                }}
              />
              <Input
                ref={inputPasswordRef}
                name="password"
                icon="lock"
                placeholder="nova senha"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputConfirmPasswordRef.current?.focus();
                }}
              />
              <Input
                ref={inputConfirmPasswordRef}
                name="confirmPassword"
                icon="lock"
                placeholder="confirmar nova senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button title="Salvar" onPress={() => {
                formRef.current?.submitForm();
              }} />
            </Form>
          </KeyboardAwareScrollView>

          <CameraModal
            onCameraModalCancel={handleCancelCamera}
            onSelectGallery={() => handleSelectImageFromGallery()}
            onSelectCamera={() => handleSelectImageFromCamera()}
            visible={cameraModal}
            transparent
            animationType="slide"
          />
          <ModalComponent
            title={modalTitle}
            subtitle={modalSubtitle}
            type={modalType}
            icon={() => {
              if (modalType === 'error') {
                return (<ModalIcon name="alert-circle" size={45} color='#BA1212' />)
              } else if (modalType === 'success') {
                return (<ModalIcon name="checkmark-circle" size={45} color='#12BABA' />)
              } else {
                return (<ModalIcon name="alert-circle" size={45} color='#BA1212' />)
              }
            }}
            transparent
            visible={modalVisible}
            handleConfirm={handleConfirm}
            animationType="slide"
          />

          <ModalComponent
            type={'loading'}
            icon={() => (
              <ActivityIndicator size="large" color='#BA1212' />
            )}
            transparent
            visible={loading}
            animationType="slide"
          />
        </UpdateProfileContainer>
      </Container>
      <TabMenu />
    </>
  )
}

export default UpdateProfile;

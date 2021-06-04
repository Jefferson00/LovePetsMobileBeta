import React, { useCallback, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useNavigation } from '@react-navigation/core';
import { Alert, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  UpdateProfileContainer,
  ImageContainer,
  UserAvatar,
  UpdateAvatarButton,
} from './styles';

import TabMenu from '../../components/TabMenu';
import { useAuth } from '../../hooks/AuthContext';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface SignUpFormData{
  name:string;
  email:string;
  old_password:string;
  password:string;
  confirmPassword:string;
  phone:string;
}

const UpdateProfile: React.FC = () => {
  const {user, updateUser} = useAuth();

  const formRef = useRef<FormHandles>(null);
  const inputNameRef = useRef<TextInput>(null);
  const inputPhoneRef = useRef<TextInput>(null);
  const inputOldPasswordRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const inputConfirmPasswordRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data:SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório!').email('Digite um e-mail válido'),
        name: Yup.string().required('Nome é obrigatório!'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (oldPass:string) => !!oldPass.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        confirmPassword: Yup.string().when('old_password', {
          is: (oldPass:string) => !!oldPass.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }).equals(
          [Yup.ref('password')], 'a senha deve ser igual'),
        phone: Yup.string().required('Telefone é obrigatório!'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      const {name, phone, email, confirmPassword, old_password, password} = data;

      const formData = Object.assign({
        name,
        email,
        phone,
      }, old_password ? {
        old_password,
        password,
        confirmPassword,
      }: {});

      const response = await api.put('/profile', formData );

      updateUser(response.data);

      //router.push('/home');

      Alert.alert(
        'Perfil atualizado!',
        'Perfil atualizado com sucesso!',
      );

    } catch (error) {
      if (error instanceof Yup.ValidationError){
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        Alert.alert(
          'Erro na atualização',
          'Preencha todos os campos corretamente.',
        );

        return;
      }

      Alert.alert(
        'Erro na atualização',
        'Ocorreu um erro na atualização dos dados, tente novamente.',
      );
    }
  },[])

  return(
    <>
      <Header title="Perfil"/>
      <Container>

        <UpdateProfileContainer>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}
            contentContainerStyle={{alignItems:'center'}}
          >
            <ImageContainer>
              {user.avatar_url && <UserAvatar source={{uri: user.avatar_url}} />}
                <UpdateAvatarButton>
                  <Icon name="camera" size={20} color="#FFFFFF"/>
                </UpdateAvatarButton>
            </ImageContainer>

            <Form
              ref={formRef}
              onSubmit={handleSignUp}
              style={{marginTop: 33}}
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
                onSubmitEditing={() =>{
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
                onSubmitEditing={() =>{
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
                  onSubmitEditing={() =>{
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
                onSubmitEditing={() =>{
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
                onSubmitEditing={() =>{
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
                onSubmitEditing={() =>{
                  formRef.current?.submitForm();
                }}
              />

              <Button onPress={() => {
                formRef.current?.submitForm();
              }}>
                Salvar
              </Button>
            </Form>
          </KeyboardAwareScrollView>
        </UpdateProfileContainer>

      </Container>
      <TabMenu/>
    </>
  )
}

export default UpdateProfile;

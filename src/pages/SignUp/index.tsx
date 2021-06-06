import React, { useCallback, useRef } from 'react';
import { Alert, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  Subtitle,
  FormContainer,
  LinkSignUpContainer,
  LinkSignUpText,
  FormTitle,
} from './styles';
import { useNavigation } from '@react-navigation/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignUpFormData{
  name:string;
  email:string;
  password:string;
  confirmPassword:string;
  phone:string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const inputNameRef = useRef<TextInput>(null);
  const inputPhoneRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const inputConfirmPasswordRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data:SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório!').email('Digite um e-mail válido'),
        name: Yup.string().required('Nome é obrigatório!'),
        password: Yup.string().required('Senha obrigatória'),
        confirmPassword: Yup.string().required('Senha obrigatória').equals(
          [Yup.ref('password')], 'a senha deve ser igual'),
        phone: Yup.string().required('Telefone é obrigatório!'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data );

      Alert.alert(
        'Cadastro realizado!',
        'Cadastro realizado com sucesso.',
      );

      navigation.goBack();

    } catch (error) {
      if (error instanceof Yup.ValidationError){
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        Alert.alert(
          'Erro no cadastro',
          'Preencha todos os campos corretamente.',
        );

        return;
      }

      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro no cadastro, tente novamente.',
      );
    }
  },[])

  return (
    <LinearGradient colors={['#F43434', '#970D0D']} style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

    }}>
      <Container>
        <Image source={logoImg} />

        <Title>
          Love Pets
        </Title>
        <Subtitle>
          Amor aos animais
        </Subtitle>

        <FormContainer>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled
            showsVerticalScrollIndicator={false}
          >
            <FormTitle>
              Cadastro
            </FormTitle>

            <Form ref={formRef} onSubmit={handleSignUp}>
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
                    inputPasswordRef.current?.focus();
                  }}
              />
              <Input
                ref={inputPasswordRef}
                name="password"
                icon="lock"
                placeholder="senha"
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
                placeholder="confirmar senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() =>{
                  formRef.current?.submitForm();
                }}
              />

              <Button title="Cadastrar" onPress={() => {
                formRef.current?.submitForm();
              }}/>
            </Form>

            <LinkSignUpContainer onPress={() => navigation.goBack()}>
              <LinkSignUpText>
                Já tem uma conta?
            </LinkSignUpText>
              <LinkSignUpText style={{ fontFamily: 'Roboto-Medium' }}>
                Entre
            </LinkSignUpText>
              <Icon name="log-in" size={20} color="#9B0F0F" />
            </LinkSignUpContainer>

          </KeyboardAwareScrollView>
        </FormContainer>
      </Container>
    </LinearGradient>
  );
}

export default SignUp;

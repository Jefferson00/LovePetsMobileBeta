import React, { useCallback, useRef } from 'react';
import { Alert, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  Subtitle,
  FormContainer,
  ForgotPasswordContainer,
  ForgotPasswordText,
  LinkSignUpContainer,
  LinkSignUpText,
  FormTitle,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/AuthContext';


interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () =>{
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const {signIn, signInGoogle} = useAuth();

  const handleSignIn = useCallback(async (data : SignInFormData)=>{
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório!').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError){
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais.',
      );

    }
  },[signIn]);

  return(
    <LinearGradient colors={['#F43434', '#970D0D']} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
            Login
          </FormTitle>

          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              name="email"
              icon="mail"
              placeholder="e-mail"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
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
              returnKeyType="send"
              onSubmitEditing={() =>{
                formRef.current?.submitForm();
              }}
            />

            <ForgotPasswordContainer>
              <ForgotPasswordText>
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPasswordContainer>

            <Button onPress={() => {
              formRef.current?.submitForm();
            }}>
              Entrar
            </Button>
          </Form>

          <LinkSignUpContainer onPress={() => navigation.navigate('SignUp')}>
            <LinkSignUpText>
              Não tem uma conta?
            </LinkSignUpText>
            <LinkSignUpText style={{fontFamily: 'Roboto-Medium'}}>
              Cadastre-se
            </LinkSignUpText>
            <Icon name="log-in" size={20} color="#9B0F0F" />
          </LinkSignUpContainer>

          <Button bgColor="#FFFFFF" color="#EA4335" onPress={() => signInGoogle()}>
            Entrar com o gmail
          </Button>
          <Button bgColor="#FFFFFF" color="#1877F2">
            Entrar com o facebook
          </Button>
        </KeyboardAwareScrollView>
        </FormContainer>
      </Container>
    </LinearGradient>
  );
}

export default SignIn;

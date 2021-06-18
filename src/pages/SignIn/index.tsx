import React, { useCallback, useRef, useState } from 'react';
import { Alert, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import ModalIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';
import ModalComponent from '../../components/Modal';

import logoImg from '../../assets/logo.png';
import googleIcon from '../../assets/Google.png';
import facebookIcon from '../../assets/Facebook.png';

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
  const {signIn, signInGoogle, signInFacebook} = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info' | 'confirmation'>('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');

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

      setModalTitle('Erro na autenticação');
      setModalSubtitle('Ocorreu um erro ao fazer login, cheque as credenciais.');
      setModalType('error');
      setModalVisible(true);
    }
  },[signIn]);

  const handleConfirm = useCallback(async() => {
    setModalVisible(false);
  }, []);

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

            <ForgotPasswordContainer onPress={() => navigation.navigate('Forgot')}>
              <ForgotPasswordText>
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPasswordContainer>

            <Button borderColor="transparent" title="Entrar" onPress={() => {
              formRef.current?.submitForm();
            }}>
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

          <Button
            bgColor="#FFFFFF"
            color="#EA4335"
            borderColor="#EA4335"
            onPress={() => signInGoogle()}
            title= "Entrar com o gmail"
          >
            <Image source={googleIcon} style={{marginRight: 16}}/>

          </Button>
          <Button
            bgColor="#FFFFFF"
            borderColor="#1877F2"
            color="#1877F2"
            title="Entrar com o facebook"
            onPress={() => signInFacebook()}
          >
            <Image source={facebookIcon} style={{marginRight: 16}}/>
          </Button>
        </KeyboardAwareScrollView>
        <ModalComponent
              title={modalTitle}
              subtitle={modalSubtitle}
              type={modalType}
              icon={() => {
                if(modalType === 'error' ){
                  return (<ModalIcon name="alert-circle" size={45} color='#BA1212'/>)
                }else if(modalType === 'success' ){
                  return (<ModalIcon name="checkmark-circle" size={45} color='#12BABA'/>)
                }else{
                  return (<ModalIcon name="alert-circle" size={45} color='#BA1212'/>)
                }
              }}
              transparent
              visible={modalVisible}
              handleConfirm={handleConfirm}
              animationType="slide"
          />
        </FormContainer>
      </Container>
    </LinearGradient>
  );
}

export default SignIn;

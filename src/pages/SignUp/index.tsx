import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Image, TextInput, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import ModalIcon from 'react-native-vector-icons/Ionicons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import 'yup-phone';

import Input from '../../components/Input';
import Button from '../../components/Button';
import ModalComponent from '../../components/Modal';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  Subtitle,
  FormContainer,
  LinkSignUpContainer,
  LinkSignUpText,
  FormTitle,
  Logo,
} from './styles';
import { useNavigation } from '@react-navigation/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const inputNameRef = useRef<TextInput>(null);
  const inputPhoneRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const inputConfirmPasswordRef = useRef<TextInput>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info' | 'confirmation'>('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório!').email('Digite um e-mail válido'),
        name: Yup.string().required('Nome é obrigatório!'),
        password: Yup.string().required('Senha obrigatória').min(6, 'Mínimo de 6 caracteres'),
        confirmPassword: Yup.string().required('Senha obrigatória').equals(
          [Yup.ref('password')], 'a senha deve ser igual'),
        phone: Yup.string().phone('BR', false, 'formato incorreto, Ex: 61 99999-5555').required('Telefone é obrigatório!'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      setLoading(false);
      setModalTitle('Cadastro realizado!');
      setModalSubtitle('Cadastro realizado com sucesso.');
      setModalType('success');
      setModalVisible(true);

      setTimeout(() => {
        navigation.goBack();
      }, 1000);

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        setModalTitle('Erro no cadastro!');
        setModalSubtitle('Preencha todos os campos corretamente.');
        setModalType('error');
        setModalVisible(true);
        setLoading(false);

        return;
      }

      setModalTitle('Erro no cadastro!');
      setModalSubtitle('Email ou número de telefone já utilizado, tente novamente');
      setModalType('error');
      setModalVisible(true);
      setLoading(false);
    }
  }, []);

  const handleConfirm = useCallback(async () => {
    setModalVisible(false);
  }, []);

  return (
    <LinearGradient colors={['#F43434', '#970D0D']} style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

    }}>
      <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
        <Container>
          <Logo source={logoImg} />

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
              {loading && (
                <ActivityIndicator size="large" color="#F43434" />
              )}
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
                  onSubmitEditing={() => {
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
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />

                <Button borderColor="transparent" title="Cadastrar" onPress={() => {
                  formRef.current?.submitForm();
                }} />
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
          </FormContainer>
        </Container>
      </ScrollView>
    </LinearGradient>
  );
}

export default SignUp;

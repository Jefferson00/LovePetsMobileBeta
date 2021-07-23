import React, { useCallback, useRef, useState } from 'react';
import { Image, ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import ModalIcon from 'react-native-vector-icons/Ionicons';

import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ModalComponent from '../../components/Modal';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  Subtitle,
  FormContainer,
  FormTitle,
} from './styles';

interface ForgotFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info' | 'confirmation'>('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');

  const handleSendForgot = useCallback(async (data: ForgotFormData) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório!').email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/password/forgot', {
        email: data.email,
      }).finally(() => {
        setModalTitle('Email de recuperação enviado');
        setModalSubtitle('Cheque sua caixa de entrada');
        setModalType('success');
        setModalVisible(true);
        setLoading(false);
      });

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      }

      setModalTitle('Erro');
      setModalSubtitle('Ocorreu um erro ao enviar o e-mail de recuperação, tente novamente.');
      setModalType('error');
      setModalVisible(true);
      setLoading(false);
    }
  }, []);

  const handleConfirm = useCallback(async () => {
    setModalVisible(false);
  }, []);

  return (
    <LinearGradient colors={['#F43434', '#970D0D']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
              Recuperação de senha
            </FormTitle>

            <Form ref={formRef} onSubmit={handleSendForgot}>
              <Input
                name="email"
                icon="mail"
                placeholder="e-mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button borderColor="transparent" title="Enviar" onPress={() => {
                formRef.current?.submitForm();
              }}>
              </Button>
            </Form>
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
          {loading &&
            <View style={{ flex: 1 }}>
              <ActivityIndicator size="large" color="#F43434" />
            </View>
          }
        </FormContainer>
      </Container>
    </LinearGradient>
  );
}

export default ForgotPassword;

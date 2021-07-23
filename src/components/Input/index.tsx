import React, { useCallback, useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { useField } from '@unform/core';
import { TextInputProps } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { Container, InputText, ErrorContainer, TextError } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputElementRef = useRef<any>(null);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    })
  }, [fieldName, registerField]);

  useEffect(() => {
    setIsErrored(!!error)
  }, [error, isErrored]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#12BABA' : '#C4C4C4'}
      />
      <InputText
        ref={inputElementRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
      {error && (
        <ErrorContainer>
          <TextError isVisible={!!error}>
            {error}
          </TextError>
          <Icon name="alert-circle" size={20} color="#d53030" />
        </ErrorContainer>
      )}
    </Container>
  )
}

export default forwardRef(Input);

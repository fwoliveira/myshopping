import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function SignUp() {





  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>Crie sua conta</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
      />

      <Input
        placeholder="senha"
        secureTextEntry
      />
      <Input
        placeholder="confirme sua senha"
        secureTextEntry
      />

      <Button title="Cadastar" onPress={()=>{}} />

      <Account>
        <ButtonText title="Fazer login" onPress={() => { }} />
      </Account>
    </Container>
  );
}
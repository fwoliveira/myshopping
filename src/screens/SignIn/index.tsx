import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';



export function SignIn() {

const navigation = useNavigation();

  function HandleLogin(){
  auth()
  .signInWithEmailAndPassword('francisco.william044@gmail.com', '123456')
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Esse endereço de email já esta em uso!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });

}



  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
      />

      <Input
        placeholder="senha"
        secureTextEntry
      />

      <Button title="Entrar" onPress={HandleLogin} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => { }} />
        <ButtonText title="Criar minha conta" onPress={() => navigation.navigate('SignUp') } />
      </Account>
    </Container>
  );
}
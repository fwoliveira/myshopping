import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';

import { Container, Content, Progress, Transferred } from './styles';
import { Alert } from 'react-native';

export function Upload() {
  const [image, setImage] = useState('');
  const [bytesTransferred, setBytesTransferred] = useState('');
  const [progress,setProgress ] = useState('0');

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  async function handleUpload(){
    const fileName = new Date().getTime();
    const MIME = image.match(/\.(?:.(?!\.))+$/)
     console.log(MIME);
     console.log(image);
    const reference = storage().ref(`/images/${fileName}${MIME}`);

    // reference.putFile(image).then(()=> Alert.alert('Upload concluido')).catch((error)=> console.log(error));

    const uploadTask = reference.putFile(image);
    uploadTask.on('state_changed' , taskSnapshot =>{
      const percent = ((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes)* 100).toFixed(0)
      setProgress(percent);
      setBytesTransferred(`${taskSnapshot.bytesTransferred} tranferidos de ${taskSnapshot.totalBytes}`);
    })
    uploadTask.then(()=>{
      Alert.alert('Upload concluido com sucesso')
    })
   
  }

  return (
    <Container>
      <Header title="Lista de compras" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button
          title="Fazer upload"
          onPress={handleUpload}
        />

        <Progress>
          {progress}%
        </Progress>

        <Transferred>
        {bytesTransferred}
        </Transferred>
      </Content>
    </Container>
  );
}

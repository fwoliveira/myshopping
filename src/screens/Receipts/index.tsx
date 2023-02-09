import React,{useEffect, useState, useCallback} from 'react';
import { Alert, FlatList } from 'react-native';

import { Container, PhotoInfo } from './styles';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';
import { File, FileProps } from '../../components/File';
import { useFocusEffect } from '@react-navigation/native';

// import { photosData } from '../../utils/photo.data';
import storage from '@react-native-firebase/storage';
import { Path } from '../../components/File/styles';

export function Receipts() {

  const [photos, setPhotos] = useState<FileProps[]>([])
  const [photoSelected, setPhotoSelected] = useState('');
  const [photoInfo, setPhotoInfo] = useState('');


async function handleShowImage(path:string){
  const urlImage = await storage().ref(path).getDownloadURL();
  setPhotoSelected(urlImage);


    //tranzendo info do arquivo 
  const info = await storage().ref(path).getMetadata();
  // info.name
  setPhotoInfo(`Upload realizado ${info.timeCreated}| ${info.size} bytes`);
}

async function handleDeleteImage(path:string){
  storage().ref().delete().then(()=>{
    Alert.alert("Imagem Excluida com sucesso!");
    fetchImage();
    setPhotoSelected('');
    setPhotoInfo('');
  })
  .catch((error) => console.log(error));
}



async function fetchImage(){
  storage().ref('images').list().then( result =>{
    const files: FileProps[] = [];
  
    result.items.forEach( file =>{
      files.push({
        name: file.name,
        path: file.fullPath,
      })
      setPhotos(files)
    })
  })

}
  useEffect(()=>{
    fetchImage();
  },[])

useFocusEffect(
  useCallback(() =>{
    fetchImage()
  },[])
)

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>
        {photoInfo}
      </PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  );
}

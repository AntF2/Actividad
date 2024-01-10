import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'

//IMAGE
import * as ImagePicker from 'expo-image-picker';

/// FIREBASE
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { storage } from '../config/Config';

export default function GeneralScreen() {

  const [imagen, setImagen] = useState(' ')

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'test/' + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg'
      });

      console.log('La imagen se subió con éxito');

      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log('URL de desacarga de la imagen: ', imageURL);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <Text>Subir una foto desde la camara</Text>
      <Button title='Abrir camara' onPress={() => pickImage()} />
      <Image source={{ uri: imagen }} style={styles.img} />
      <Button title='subir imagen' onPress={() => subirImagen('avatar2')} />
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  }
})
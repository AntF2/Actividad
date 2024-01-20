import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/Config';

export default function GeneralScreen() {
  const [imagen, setImagen] = useState('');

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImagen(result.uri);
      }
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  };

  async function subirImagen(nombre: string) {
    if (!imagen) {
      Alert.alert('Error', 'Por favor, selecciona una imagen antes de intentar subirla.');
      return;
    }

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
      console.log('URL de descarga de la imagen: ', imageURL);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  }

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/564x/53/3a/84/533a846d728210f19e914cb57c2cf2c0.jpg' }}
      style={styles.backgroundImage}
    >
    <View style={styles.overlay}>
      <Text style={styles.title}>¡Sube una foto desde la cámara!</Text>
      <Button title='Abrir cámara' onPress={pickImage} />
      {imagen ? <Image source={{ uri: imagen }} style={styles.image} /> : null}
      <Button title='Subir imagen' onPress={() => subirImagen('avatar2')} color="green" />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white', // Cambia el color del texto a blanco
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginTop: 20,
    marginBottom: 20,
  },overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center', // Alinea el contenedor al centro horizontalmente
    justifyContent: 'center', // Alinea el contenedor al centro verticalmente
  },
});

import { StyleSheet, Text, View, Button, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/Config';

export default function RecursosScreen() {
  const [imagen, setImagen] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagen(result.assets[0].uri);
    }
  };

  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'usuarios/' + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg'
      });

      console.log('La imagen se subió con éxito');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/ce/6e/39/ce6e392a57ba5ef7e2707a055ce1926b.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Selecciona una imagen desde la galería</Text>
        <Button title='Seleccionar imagen' onPress={pickImage} />
        <Image source={{ uri: imagen }} style={styles.img} />
        <Button title='Cargar imagen' onPress={() => subirImagen('avatar1')} color="green" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center', // Alinea el contenedor al centro horizontalmente
    justifyContent: 'center', // Alinea el contenedor al centro verticalmente
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
  },
  img: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
  },
});

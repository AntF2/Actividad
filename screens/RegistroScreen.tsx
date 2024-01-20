import { StyleSheet, Text, View, Button, Alert, ImageBackground, TextInput } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';
import { getDatabase, ref, set } from "firebase/database";
import { db } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {
  const [correo, setcorreo] = useState('');
  const [contrasenia, setcontrasenia] = useState('');
  const [nick, setNick] = useState('');
  const [edad, setEdad] = useState('');
  const [userId, setuserId] = useState('');

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("REGISTRO CORRECTO");
        navigation.navigate('Drawer_Welcome');
        setuserId(user.uid);
        console.log(userId);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);

        switch (errorCode) {
          case "auth/weak-password":
            Alert.alert("Error", "La contraseña debe poseer 6 caracteres");
            break;
        }
      });
  }

  function guardar(userId: string, correo: string, nick: string, edad: string) {
    set(ref(db, 'users/' + userId), {
      nick: nick,
      email: correo,
      edad: edad
    });
  }

  function compuesta() {
    registro();
    guardar(userId, correo, nick, edad);
  }

  return (
    <ImageBackground
    source={{ uri: 'https://img2.wallspic.com/crops/7/3/4/7/6/167437/167437-ambiente-pendiente-material_propiedad-tintes_y_matices-patron-1536x3073.jpg' }}
    style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>RegistroScreen</Text>
        <TextInput
          placeholder='Ingrese email'
          onChangeText={(texto) => setcorreo(texto)}
          style={styles.input}
        />
        <TextInput
          placeholder='Ingrese contraseña'
          onChangeText={(texto) => setcontrasenia(texto)}
          style={styles.input}
        />
        <TextInput
          placeholder="Ingrese un nick"
          onChangeText={(texto) => setNick(texto)}
          style={styles.input}
        />
        <TextInput
          placeholder="Edad"
          onChangeText={(texto) => setEdad(texto)}
          style={styles.input}
        />

        <Button title='Registrarse' onPress={() => compuesta()} />
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
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 5,
    width: '80%',
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

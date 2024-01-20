import { Button, StyleSheet, Text, View, Alert, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
  const [correo, setcorreo] = useState('');
  const [contrasenia, setcontrasenia] = useState('');

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setcorreo('');
        setcontrasenia('');
        navigation.navigate("Drawer_Welcome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        switch (errorCode) {
          case "auth/invalid-credential":
            Alert.alert("ERROR", "Credenciales incorrectas");
            break;
          case "auth/missing-password":
            Alert.alert("ERROR", "Contraseña perdida");
            break;
          default:
            Alert.alert("ERROR");
            break;
        }
      });
  }

  return (
    <ImageBackground
    source={{ uri: 'https://img2.wallspic.com/crops/7/3/4/7/6/167437/167437-ambiente-pendiente-material_propiedad-tintes_y_matices-patron-1536x3073.jpg' }}
    style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder='Ingresar email'
          keyboardType='email-address'
          onChangeText={(texto: any) => setcorreo(texto)}
          value={correo}
          style={styles.input}
        />

        <TextInput
          placeholder="Ingresar contraseña"
          onChangeText={(texto: any) => setcontrasenia(texto)}
          value={contrasenia}
          secureTextEntry
          style={styles.input}
        />

        <Button title='Ingresar' onPress={() => login()} />

        <Text onPress={() => navigation.navigate('Registro')} style={styles.signupText}> 👉 Regístrate aquí 👈</Text>
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
  },
  signupText: {
    color: 'white',
    marginTop: 20,
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

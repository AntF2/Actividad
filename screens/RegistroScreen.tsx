import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

//FIREBASE
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';


export default function RegistroScreen( {navigation}: any ) {
  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        console.log("REGISTRO CORRECTO");
        navigation.navigate('Drawer_Welcome')
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode)
        
        if ( errorCode=== 'auth/weak-password'){
          Alert.alert("Error", "La contraseña debe poseer 6 caracteres")
        }
        
      });
  }

  return (
    <View>
      <Text>RegistroScreen</Text>
      <TextInput
        placeholder='Ingrese email'
        onChangeText={(texto) => setcorreo(texto)}
      />
      <TextInput
        placeholder='Ingrese contraseña'
        onChangeText={(texto) => setcontrasenia(texto)}
      />
      <TextInput 
        placeholder ="Ingrese un nick"
      />
      <TextInput 
        placeholder="Edad"
      />

      <Button title='Registrarse' onPress={()=> registro() } />
    </View>
  )
}

const styles = StyleSheet.create({})
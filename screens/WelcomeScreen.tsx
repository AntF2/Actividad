import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../config/Config';


export default function WelcomeScreen( {navigation}:any ) {
  const [acceso, setAcceso] = useState('')

 function observable(){ 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setAcceso(uid)
        // ...
      } else {
        // User is signed out
        navigation.navigate("Login")
      }
    });
  }
  

  function compuesta(){
    logout()
    observable()
  }
  
 

  function logout(){
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <View>
      <Text>WelcomeScreen</Text>

      <Button title="logout" onPress={()=> compuesta()}/>
    </View>
  )
}

const styles = StyleSheet.create({})
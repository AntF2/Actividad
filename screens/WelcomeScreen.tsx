import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../config/Config';
import { db } from '../config/Config';
import { ref, onValue } from "firebase/database";

export default function WelcomeScreen({ navigation }: any) {
  const [acceso, setAcceso] = useState('');
  const [id, setid] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Datos: ", uid)
        setid(uid);
      } else {
        setid('');
      }
    });

    const starCountRef = ref(db, 'users/' + id );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log("USUARIO", data);
    });
  }, [id]);

  function observable() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setAcceso(uid);
      } else {
        navigation.navigate("Login");
      }
    });
  }

  function compuesta() {
    logout();
    observable();
  }

  function logout() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz-lJqZJqYHjHUW_fzGU-kvi5HCpuw0I6FDyU-yvmvZGTQrixeCZoQ9OrNg_8V_NUiXHE&usqp=CAU' }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>¡Bienvenido!</Text>

        
        <Button title="Cerrar sesión" onPress={() => compuesta()} color="red" />
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
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
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

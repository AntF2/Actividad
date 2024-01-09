import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';


import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import GeneralScreen from '../screens/GeneralScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Drawer_Welcome" component={MyDrawer} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name="Welcome" component={WelcomeScreen} />
        <Drawer.Screen name="General" component={GeneralScreen} />
        <Drawer.Screen name='Recursos' component={RegistroScreen}/>
    </Drawer.Navigator>
  );
}

export default function MainNavigator(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}
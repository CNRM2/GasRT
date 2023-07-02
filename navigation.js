import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto, MaterialCommunityIcons, MaterialIcons,Ionicons,Entypo,AntDesign,Feather,Octicons } from '@expo/vector-icons';
import InicioSesion from './screens/InicioSesion'
import MenuConfig from './screens/MenuConfig'
import Emergencia from './screens/Emergencia'
import PantallaPrincipal from './screens/PantallaPrincipal'
import RegistroUsuario from './screens/RegistroUsuario'
import RegistroValvula from './screens/RegistroValvula'
import Rutinas from './screens/Rutinas'
import ValvulaInfo from './screens/ValvulaInfo'
import UsuarioInfo from './screens/UsuarioInfo'
import Notificaciones from './screens/Notificaciones'
import ButtonsTabs from './buttontab';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const Navigation = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName='InicioSesion'>
        <Stack.Screen options={{headerShown:false}} name="InicioSesion" component={InicioSesion} />
        <Stack.Screen options={{headerShown:false}} name="MenuConfig" component={MenuConfig} />
        <Stack.Screen options={{headerShown:false}} name="Emergencia" component={Emergencia} />
        <Stack.Screen options={{headerShown:false}} name="RegistroUsuario" component={RegistroUsuario} />
        <Stack.Screen options={{headerShown:false}} name="RegistroValvula" component={RegistroValvula} />
        <Stack.Screen options={{headerShown:false}} name="Rutinas" component={Rutinas} />
        <Stack.Screen options={{headerShown:true,title:"",headerShadowVisible:false}} name="ValvulaInfo" component={ValvulaInfo} />
        <Stack.Screen options={{headerShown:false}} name='Buttons' component={ButtonsTabs}/>
       </Stack.Navigator>
    </NavigationContainer>
  )

}
export default Navigation
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const navigation = () => {
  return (
    <NavigationContainer >
       <Stack.Navigator initialRouteName='InicioSesion'>
        <Stack.Screen options={{headerShown:false}} name="InicioSesion" component={InicioSesion} />
        <Stack.Screen options={{headerShown:false}} name="MenuConfig" component={MenuConfig} />
        <Stack.Screen options={{headerShown:false}} name="Emergencia" component={Emergencia} />
        <Stack.Screen options={{headerShown:false}} name="RegistroUsuario" component={RegistroUsuario} />
        <Stack.Screen options={{headerShown:false}} name="RegistroValvula" component={RegistroValvula} />
        <Stack.Screen options={{headerShown:false}} name="Rutinas" component={Rutinas} />
        <Stack.Screen options={{headerShown:false}} name="ValvulaInfo" component={ValvulaInfo} />
        <Stack.Screen options={{headerShown:false}} name='ButtonsTab' component={ButtonsTab}/>
       </Stack.Navigator>
    </NavigationContainer>

    


  )
  function ButtonsTab() {
    return (
      <Tab.Navigator initialRouteName='PantallaPrincipal' screenOptions={{tabBarHideOnKeyboard:true,tabBarShowLabel:false,tabBarStyle:{backgroundColor:"#E73D07"}, tabBarIconStyle:{opacity:0.6}}}>
        <Tab.Screen options={{headerShown:false,tabBarIcon:({color,size}) => (<AntDesign name='setting' color={"white"} size={30}/> ),}} name="Config" component={MenuConfig} />
        <Tab.Screen options={{headerShown:false,tabBarIcon:({color,size}) => (<Ionicons name='person-outline' color={"white"} size={30}/> ),}} name="UsuarioInfo" component={UsuarioInfo} />
        <Tab.Screen options={{headerShown:false,tabBarIcon:({color,size}) => (<Octicons name='flame' color={"white"} size={30}/> ),}} name="PantallaPrincipal" component={PantallaPrincipal} />
        <Tab.Screen options={{headerShown:false,tabBarIcon:({color,size}) => (<Feather name='bell' color={"white"} size={30}/> ),}} name="Notificaciones" component={Notificaciones} />
        <Tab.Screen options={{headerShown:false, tabBarIcon:({color,size}) => (<Feather name='menu' color={"white"} size={30}/> ),}} name="Menu2" component={MenuConfig} />

        
      </Tab.Navigator>
    )
  }

}
export default navigation
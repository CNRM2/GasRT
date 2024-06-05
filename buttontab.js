import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo, AntDesign, Feather, Octicons } from '@expo/vector-icons';
import MenuConfig from './screens/MenuConfig'
import PantallaPrincipal from './screens/PantallaPrincipal'
import UsuarioInfo from './screens/UsuarioInfo'
import Notificaciones from './screens/Notificaciones'
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
    style={{top:-15,
            justifyContent:'center',
            alignItems:'flex-end',
            ...styles.shadow}}
            onPress={onPress}
    >
        <View style={{
            width:70,
            height:70,
            borderRadius:35,
            backgroundColor: '#E85007',

        }}>
        {children}
        </View>
    </TouchableOpacity>
)

export function Buttons() {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60, backgroundColor: "#E73D07", position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Config')}>
                <AntDesign name='setting' color={"white"} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UsuarioInfo')}>
                <Ionicons name='person-outline' color={"white"} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PantallaPrincipal')}>
                <Octicons name='flame' color={"white"} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
                <Feather name='bell' color={"white"} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Menu2')}>
                <Feather name='menu' color={"white"} size={30} />
            </TouchableOpacity>
        </View>
    );
};

export function ButtonsTab() {
    return (
        <Tab.Navigator
                       initialRouteName='PantallaPrincipal'
                       screenOptions={{ tabBarHideOnKeyboard: true, 
                       tabBarShowLabel: false, tabBarStyle: { backgroundColor: "#E73D07", position: 'absolute',
                       bottom: 25, left:20, right:20,elevation:0, borderRadius:15,height:80, ...styles.shadow }, 
                       tabBarIconStyle: { opacity: 0.6 } }}>
            <Tab.Screen 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name='setting' color={"white"} size={30} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    ), 
                }} 
                name="Config" 
                component={MenuConfig} 
            />
            <Tab.Screen 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='person-outline' color={"white"} size={30} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    ), 
                }} 
                name="UsuarioInfo" 
                component={UsuarioInfo} 
            />
            <Tab.Screen 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({focused ,color, size }) => (
                        <Octicons name='flame' color={"white"} size={30} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    ), 
                    tabBarButton:(props) => (
                        <CustomTabBarButton {...props}/>
                    )
                }} 
                name="PantallaPrincipal" 
                component={PantallaPrincipal} 
            />
            <Tab.Screen 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='bell' color={"white"} size={30} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    ), 
                }} 
                name="Notificaciones" 
                component={Notificaciones} 
            />
            <Tab.Screen 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='menu' color={"white"} size={30} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    ), 
                }} 
                name="Menu2" 
                component={MenuConfig} 
            />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000000',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity: 0.25,
        shadowRadius:3.5,
        elevation: 5
    }
})
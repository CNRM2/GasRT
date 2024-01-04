import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Component } from 'react';
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
        <Tab.Navigator initialRouteName='PantallaPrincipal' screenOptions={{ tabBarHideOnKeyboard: true, tabBarShowLabel: false, tabBarStyle: { backgroundColor: "#E73D07" }, tabBarIconStyle: { opacity: 0.6 } }}>
            <Tab.Screen options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<AntDesign name='setting' color={"white"} size={30} />), }} name="Config" component={MenuConfig} />
            <Tab.Screen options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Ionicons name='person-outline' color={"white"} size={30} />), }} name="UsuarioInfo" component={UsuarioInfo} />
            <Tab.Screen options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Octicons name='flame' color={"white"} size={30} />), }} name="PantallaPrincipal" component={PantallaPrincipal} />
            <Tab.Screen options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Feather name='bell' color={"white"} size={30} />), }} name="Notificaciones" component={Notificaciones} />
            <Tab.Screen options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Feather name='menu' color={"white"} size={30} />), }} name="Menu2" component={MenuConfig} />
        </Tab.Navigator>
    )
}

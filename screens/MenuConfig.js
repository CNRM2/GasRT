import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const MenuConfig = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={style.container}>
            <View style={style.profilepicture}>
                <Image source={require("../Images/nobitches.png")} style={{ borderRadius: 150, width: 200, height: 200 }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 20, padding: 5, marginTop: 20 }}>
                <Image style={{ marginRight: 10 }} source={require("../Images/Ellipse.png")} />
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                    No Bitches?
                </Text>
            </View>
            <SafeAreaView style={[style.ButtonCreate]} >
            <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "white",marginLeft:20}}>CUENTA</Text>
            </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={[style.ButtonCreate]} >
            <TouchableOpacity onPress={() => navigation.navigate("RegistroValvula")}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "white",marginLeft:20}}>CONFIGURACIÓN DE VALVULAS</Text>
            </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={[style.ButtonCreate]} >
            <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "white",marginLeft:20}}>CONFIGURACIÓN</Text>
            </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={[style.SignUpButton]} >
            <TouchableOpacity onPress={() => navigation.navigate("InicioSesion")}>
                
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "white"}}>CERRAR SESION</Text>
            </TouchableOpacity>
            </SafeAreaView>
            
        </SafeAreaView>
    )
}

export default MenuConfig

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    profilepicture: {
        backgroundColor: "transparent",
        marginTop: 100,
        marginHorizontal: 125,
        borderRadius: 150,
        borderColor: "#E73D07",
        borderWidth: 15
    },
    ButtonCreate: {
        backgroundColor: "#E73D07",
        borderRadius: 10,
        marginTop: 20,
        width:350,
        height:65,
        justifyContent:"center",
    },
    SignUpButton: {
        backgroundColor: "#E73D07",
        borderRadius: 10,
        marginTop: 50,
        width:200,
        height:60,
        justifyContent:"center",
        alignItems:"center"
    }
})
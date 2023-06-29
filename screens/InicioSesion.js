import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const InicioSesion = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={[Style.container]}>
            <SafeAreaView style={{ marginTop: 100 }}>
                <Image source={require("../Images/GasLogo2.png")} />
            </SafeAreaView>

            <View style={{ justifyContent: "center", alignContent: "center", marginTop: 10 }}>
                <SafeAreaView style={[Style.TextInputs]}>
                    <TextInput placeholder='CORREO O USUARIO' style={{ marginLeft: 20 }} />
                </SafeAreaView>
                <SafeAreaView style={[Style.TextInputs, { marginTop: 20 }]}>
                    <TextInput placeholder='CONTRASEÑA' secureTextEntry={true} style={{ marginLeft: 20 }} />
                </SafeAreaView>
            </View>
            <TouchableOpacity style={[Style.ButtonCreate]} onPress={() => navigation.navigate('ButtonsTab')}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>INGRESAR</Text>
            </TouchableOpacity>
            <Text style={{marginTop:20}}>¿No tienes una Cuenta?</Text>
            <TouchableOpacity style={[Style.ButtonCreate]} onPress={() => navigation.navigate('RegistroUsuario')}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>CREAR CUENTA</Text>
            </TouchableOpacity>
            

        </SafeAreaView>
    )
}

export default InicioSesion

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF"


    },
    text: {
        fontSize: 11,
        color: '#4D4D4D',
        alignSelf: "baseline",
        marginLeft: 10,
        marginBottom: 5

    },
    TextInputs: {
        backgroundColor: "#EBEBEB",
        height: 45,
        width: 300,
        borderRadius: 15,
        textAlign: "center",
        justifyContent: "center",
        overlayColor: "black",
        marginBottom: 20


    },
    ButtonCreate: {
        backgroundColor: "#E73D07",
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        width: 175,
        borderRadius: 10,
        marginTop: 20
    }
})
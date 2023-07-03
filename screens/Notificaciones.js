import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Notificaciones = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={style.container}>
            <SafeAreaView style={style.header}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>NOTIFICACIONES</Text>
            </SafeAreaView>
            <TouchableOpacity onPress={() => navigation.navigate("Emergencia")} style={{ backgroundColor: "#BCBCBA", padding: 30, marginTop: 40, marginHorizontal: 35, borderRadius: 10, flexDirection: "row" }}>
                <SafeAreaView style={{flexDirection:"column",flex:1,justifyContent:"center"}}>
                    <Text style={{color:"#FF0000",fontSize:20,fontWeight:"700"}}>
                        Alerta:
                    </Text>
                    <Text style={{color:"black"}}>
                        Valvula 1 detecto una fuga
                    </Text>
                </SafeAreaView>
                <SafeAreaView style={{flexDirection:"column",flex:1,alignItems:"center",justifyContent:"center"}}>
                    <Image source={require("../Images/alert.png")} style={{width:50,height:50,marginLeft:40}}/>
                </SafeAreaView>

            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Notificaciones

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        marginTop: 70,
        marginLeft: 40,
    }
})
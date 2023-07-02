import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const PantallaPrincipal = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{alignItems:"center",flex:1,backgroundColor:"#FFFFFF"}}>
         <Image style={{marginBottom:100,marginTop:50}} source={require("../Images/GasLogo.png")}/>
         <SafeAreaView style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <Image style={{alignItems:"flex-start"}} source={require("../Images/angulo-izquierdo.png")}/>
          <SafeAreaView style={{padding:50,backgroundColor:"#EAEAEA99",borderRadius:20,flexDirection:"column"}}>
            <Image source={require("../Images/medidor.png")} />
            <TouchableOpacity onPress={() => navigation.navigate('ValvulaInfo')} style={{flexDirection:"row",justifyContent:"center",backgroundColor:"#E73D07",alignItems:"center",borderRadius:20,padding:5}}>
              <Image style={{marginRight:10}} source={require("../Images/Ellipse.png")}/>
              <Text style={{fontSize:16}}>VALVULA 1</Text>
            </TouchableOpacity>
          </SafeAreaView>
          <Image style={{alignItems:"flex-start"}} source={require("../Images/angulo-derecho.png")}/>
         </SafeAreaView>
         <SafeAreaView style={{flexDirection:"row",marginTop:20}}>
          <TouchableOpacity style={{backgroundColor:"#E73D07",padding:20,borderRadius:10,marginRight:100}}>
            <Image source={require("../Images/despertador.png")}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Emergencia')} style={{backgroundColor:"#E73D07",padding:20,borderRadius:10}}>
            <Image source={require("../Images/alertasensor.png")}/>
          </TouchableOpacity>
         </SafeAreaView>
         <TouchableOpacity style={{backgroundColor:"#E73D07",padding:20,borderRadius:10,marginTop:20}}>
            <Image source={require("../Images/sensorfuego.png")}/>
          </TouchableOpacity>
    </SafeAreaView>
  )
}

export default PantallaPrincipal
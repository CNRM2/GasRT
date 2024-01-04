import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo, AntDesign, Feather, Octicons } from '@expo/vector-icons';
import { Buttons } from '../buttontab'

const Emergencia = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#FF0000", fontSize: 40, fontWeight: "700", marginBottom: 30 }}>
        ¡ALERTA!
      </Text>
      <SafeAreaView style={{ height: 150, width: 350, backgroundColor: "#FF5555", opacity: 0.5, borderRadius: 30, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <SafeAreaView style={{ flexDirection: "column", marginRight: 10 }}>
          <Text style={{ color: "#FF0000", fontWeight: "600" }}>
            ¡El sistema ha detectado una fuga,
          </Text>
          <Text style={{ color: "#FF0000", fontWeight: "600" }}>
            por favor bloquee el suministro
          </Text>
          <Text style={{ color: "#FF0000", fontWeight: "600" }}>
            de gas y llame a emergecias!
          </Text>
        </SafeAreaView>
        <Image source={require("../Images/alert.png")} />
      </SafeAreaView>
      <TouchableOpacity style={{ marginTop: 50, backgroundColor: "#FF0000", padding: 30, borderRadius: 100 }}>
        <Image source={require("../Images/Off.png")} />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 50, backgroundColor: "#FF0000", padding: 30, borderRadius: 100 }}>
        <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>LLAMADA DE EMERGENCIA</Text>
      </TouchableOpacity>
      <Buttons/>
    </SafeAreaView>
  )
}

export default Emergencia
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const RegistroValvula = () => {
  return (
    <SafeAreaView style={[Style.container]}>
      <SafeAreaView style={{ marginTop: 50 }}>
        <Image source={require("../Images/GasLogo.png")} style={{ height: 156, width: 376 }} />
      </SafeAreaView>

      <View style={{ justifyContent: "center", alignContent: "center", marginTop: 50 }}>
        <Text style={[Style.text]}>
          N. de Serie:
        </Text>
        <SafeAreaView style={[Style.TextInputs]}>
          <TextInput style={{ marginLeft: 20 }} />
        </SafeAreaView>
        <Text style={[Style.text]}>
          Nombre de la Valvula:
        </Text>
        <SafeAreaView style={[Style.TextInputs]}>
          <TextInput style={{ marginLeft: 20 }} />
        </SafeAreaView>
      </View>
      <Image source={require("../Images/valvula.png")}/>

      <TouchableOpacity style={[Style.ButtonCreate]}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>REGISTRAR</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default RegistroValvula

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
    marginBottom: 5,
    fontWeight: "600",
    opacity: 0.7

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
    height: 50,
    width: 175,
    borderRadius: 10,
    marginTop: 50
  }
})
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CircularProgress from 'react-native-circular-progress-indicator';
import { useState } from 'react'



const PantallaPrincipal = () => {
  const [proggresColor, setProggrescolor] = useState()

  const navigation = useNavigation();
  const progressColor = { value: 15 };
  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1, backgroundColor: "#FFFFFF" }}>
      <Image style={{ marginBottom: 100, marginTop: 50 }} source={require("../Images/GasLogo.png")} />
      <SafeAreaView style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true} contentContainerStyle={{alignItems:"center",justifyContent:"center", flexDirection:"row"}} >
          <SafeAreaView style={{ paddingVertical: 30, paddingHorizontal: 40, backgroundColor: "#EAEAEA99", borderRadius: 20, flexDirection: "column", alignItems: "center", justifyContent: "center",marginHorizontal:70}}>
            <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: "700" }}>
              Gas Restante:
            </Text>
            <CircularProgress value={progressColor.value} radius={90} valueSuffix='%' circleBackgroundColor='transparent' activeStrokeColor={progressColor.value < 25 ? "red" : "green"} />
            <TouchableOpacity onPress={() => navigation.navigate('ValvulaInfo')} style={{ flexDirection: "row", justifyContent: "center", backgroundColor: "#E73D07", alignItems: "center", borderRadius: 15, paddingVertical: 15, paddingHorizontal: 20, marginTop: 20 }}>
              <Image style={{ marginRight: 10 }} source={require("../Images/Ellipse.png")} />
              <Text style={{ fontSize: 16 }}>VALVULA 1</Text>
            </TouchableOpacity>
          </SafeAreaView>
          <SafeAreaView style={{ paddingVertical: 30, paddingHorizontal: 40, backgroundColor: "#EAEAEA99", borderRadius: 20, flexDirection: "column", alignItems: "center", justifyContent: "center",marginRight:70,marginLeft:80 }}>
            <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: "700" }}>
              Gas Restante:
            </Text>
            <CircularProgress value={progressColor.value} radius={90} valueSuffix='%' circleBackgroundColor='transparent' activeStrokeColor={progressColor.value < 25 ? "red" : "green"} />
            <TouchableOpacity onPress={() => navigation.navigate('ValvulaInfo')} style={{ flexDirection: "row", justifyContent: "center", backgroundColor: "#E73D07", alignItems: "center", borderRadius: 15, paddingVertical: 15, paddingHorizontal: 20, marginTop: 20 }}>
              <Image style={{ marginRight: 10 }} source={require("../Images/Ellipse.png")} />
              <Text style={{ fontSize: 16 }}>VALVULA 1</Text>
            </TouchableOpacity>
          </SafeAreaView>
          <SafeAreaView style={{ paddingVertical: 30, paddingHorizontal: 40, backgroundColor: "#EAEAEA99", borderRadius: 20, flexDirection: "column", alignItems: "center", justifyContent: "center",marginRight:70,marginLeft:70 }}>
            <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: "700" }}>
              Gas Restante:
            </Text>
            <CircularProgress value={progressColor.value} radius={90} valueSuffix='%' circleBackgroundColor='transparent' activeStrokeColor={progressColor.value < 25 ? "red" : "green"} />
            <TouchableOpacity onPress={() => navigation.navigate('ValvulaInfo')} style={{ flexDirection: "row", justifyContent: "center", backgroundColor: "#E73D07", alignItems: "center", borderRadius: 15, paddingVertical: 15, paddingHorizontal: 20, marginTop: 20 }}>
              <Image style={{ marginRight: 10 }} source={require("../Images/Ellipse.png")} />
              <Text style={{ fontSize: 16 }}>VALVULA 1</Text>
            </TouchableOpacity>
          </SafeAreaView>

        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Rutinas')} style={{ backgroundColor: "#E73D07", padding: 20, borderRadius: 10, marginRight: 100 }}>
          <Image source={require("../Images/despertador.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Emergencia')} style={{ backgroundColor: "#E73D07", padding: 20, borderRadius: 10 }}>
          <Image source={require("../Images/alertasensor.png")} />
        </TouchableOpacity>
      </SafeAreaView>
      <TouchableOpacity style={{ backgroundColor: "#E73D07", padding: 20, borderRadius: 10, marginTop: 20 }}>
        <Image source={require("../Images/sensorfuego.png")} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default PantallaPrincipal
import { View, Text, SafeAreaView, TouchableOpacity, Image, Switch } from 'react-native'
import { Component } from 'react-native'
import { useState } from 'react';
import ButtonsTabs from '../buttontab'

const ValvulaInfo = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1, backgroundColor: "#FFFFFF" }}>
      <SafeAreaView style={{ marginTop: 50, marginBottom: 50 }}>
        <Text style={{ fontWeight: "bold", fontSize: 25, marginRight: 120 }}>INFORMACION</Text>
      </SafeAreaView>
      <SafeAreaView style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <SafeAreaView style={{ padding: 50, backgroundColor: "#EAEAEA99", borderRadius: 20, flexDirection: "column" }}>
          <Image source={require("../Images/medidor.png")} />
          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", backgroundColor: "#E73D07", alignItems: "center", borderRadius: 20, padding: 5 }}>
            <Image style={{ marginRight: 10 }} source={require("../Images/Ellipse.png")} />
            <Text style={{ fontSize: 16 }}>VALVULA 1</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={{}}>
        <SafeAreaView style={{ flexDirection: "row", marginBottom: 10, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>Nombre: </Text>
          <Text style={{ fontSize: 16 }}>Válvula 1</Text>
        </SafeAreaView>
        <SafeAreaView style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>No. de Serie: </Text>
          <Text style={{ fontSize: 16 }}>27022002</Text>
        </SafeAreaView>
        <SafeAreaView style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>Estado de la Válvula: </Text>
          <Text style={{ fontSize: 16 }}>Excelente</Text>
        </SafeAreaView>
        <SafeAreaView style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>Fecha de Instalación: </Text>
          <Text style={{ fontSize: 16 }}>21/07/2023</Text>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={{ justifyContent: "center", alignItems: "center", marginTop: 20, backgroundColor: "#D03706", borderRadius: 20, flexDirection: "row", padding: 10 }}>
        <Text style={{ color: isEnabled ? "white" : "black" }}>ENCENDIDO/APAGADO</Text>
        <Switch style={{}} trackColor={{ false: 'gray', true: 'white' }}
          thumbColor={isEnabled ? 'white' : 'black'}
          backgroundColor="#D03706"
          onValueChange={toggleSwitch}
          value={isEnabled} />
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default ValvulaInfo
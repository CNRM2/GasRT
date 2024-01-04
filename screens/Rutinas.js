import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import { Switch } from 'react-native'
import { useState } from 'react'
import { Buttons} from '../buttontab'

const Rutinas = () => {
  const [switchStates, setSwitchStates] = useState([false, false]);
  const [alarmas, setAlarmas] = useState([]);

  const toggleSwitch = (index) => {
    setSwitchStates((previousStates) => {
      const newStates = [...previousStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const agregarAlarma = () => {
    const nuevaAlarma = { hora: '12:00 AM', etiqueta: 'Valvula 1' };
    setAlarmas([...alarmas, nuevaAlarma]);
  };

  return (
    <SafeAreaView style={[style.container]}>
      <SafeAreaView style={[style.header]}>
        <Text style={{ fontSize: 20, fontWeight: "600", marginRight: 200 }}>RUTINAS</Text>
        <TouchableOpacity onPress={agregarAlarma}>
          <Image source={require("../Images/more.png")} style={{ marginRight: 20 }} />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView style={{ maxHeight: 640 }}>
        {alarmas.map((alarma, index) => (
          <SafeAreaView key={index} style={[style.alarmas, { opacity: switchStates[index] ? 1 : 0.9, marginTop: 20 }]}>
            <SafeAreaView style={{ flexDirection: "column", flex: 1 }}>
              <Text style={{ fontSize: 25, color: switchStates[index] ? "white" : "black", fontWeight: "700" }}>{alarma.hora}</Text>
              <Text style={{ fontSize: 18, color: switchStates[index] ? "white" : "black", fontWeight: "700" }}>{alarma.etiqueta}</Text>
            </SafeAreaView>
            <SafeAreaView style={{ flexDirection: "column", flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 13, color: switchStates[index] ? "white" : "black", fontWeight: "700" }}>DIARIAMENTE</Text>
              <Switch
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                trackColor={{ false: 'gray', true: 'white' }}
                thumbColor={switchStates[index] ? 'white' : 'black'}
                backgroundColor="transparent"
                onValueChange={() => toggleSwitch(index)}
                value={switchStates[index]}
              />
            </SafeAreaView>
          </SafeAreaView>
        ))}
      </ScrollView>
      <Buttons />
    </SafeAreaView>
  );
};


export default Rutinas

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    marginTop: 1,
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  alarmas: {
    backgroundColor: "#D75B34",
    padding: 20,
    marginHorizontal: 25,
    borderRadius: 10,
    flexDirection: "row"
  }
})
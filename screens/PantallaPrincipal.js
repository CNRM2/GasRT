import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useNavigation } from '@react-navigation/native';
import { db } from '../components/config';
import { getAuth } from "firebase/auth";
import { ref, onValue, set } from 'firebase/database';
import { axios } from 'axios';

export default function PantallaPrincipal() {
  const [device1Data, setDevice1Data] = useState({
    Id_device: "",
    command: "on",
    led_status: false,
    nombre: "",
    sensor_data: 0,
    state: "activo"
  });

  const [device2Data, setDevice2Data] = useState({
    Id_device: "",
    command: "on",
    led_status: false,
    nombre: "",
    sensor_data: 0,
    state: "activo"
  });
  
 
  const navigation = useNavigation();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  // Manejo de la autenticación
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        console.log('Usuario autenticado:', user.uid); // Verifica el usuario autenticado
      } else {
        setUser(null);
        resetDeviceData(); // Resetear datos si no hay usuario
        console.log('No hay usuario autenticado.'); // Verifica la ausencia de usuario
      }
    });

    // Limpieza de la suscripción
    return () => unsubscribeAuth();
  }, [auth]);

  // Carga de datos en tiempo real
  useEffect(() => {
    if (user) {
      const deviceRef = ref(db, `users/${user.uid}/device`);
      const onDataChange = (snapshot) => {
        const data = snapshot.val();
        console.log('Datos recibidos:', data); // Verifica los datos recibidos

        if (data) {
          let updatedDevice1 = { ...device1Data };
          let updatedDevice2 = { ...device2Data };

          Object.keys(data).forEach((deviceId) => {
            const deviceData = data[deviceId];
            const id = deviceData.Id_device;
            const command = deviceData.command || "on";
            const led_status = command === "on"; // El estado del LED depende del command
            const nombre = deviceData.nombre || "";
            const sensor_data = deviceData.sensor_data || 0;
            const state = deviceData.state || "activo";

            if (deviceId === "-Ny1JGi_Cl-xzrP_fTMG") {
              updatedDevice1 = {
                Id_device: id,
                command: command,
                led_status: led_status,
                nombre: nombre,
                sensor_data: sensor_data < 0 ? 0 : sensor_data,
                state: state
              }; 
            } else if (deviceId === "-Ny1JX-I4AsZQU0nkvGc") {
              updatedDevice2 = {
                Id_device: id,
                command: command,
                led_status: led_status,
                nombre: nombre,
                sensor_data: sensor_data < 0 ? 0 : sensor_data,
                state: state
              };
            }
          });

          setDevice1Data(updatedDevice1);
          setDevice2Data(updatedDevice2);
        } else {
          resetDeviceData(); // Resetear datos si no hay información
        }
      };

      // Suscribirse a los cambios en los datos
      const subscription = onValue(deviceRef, onDataChange);

      // Limpieza de la suscripción
      return () => {
        subscription(); // Cancelar suscripción
      };
    }
  }, [user]);

  // Función para resetear los datos de los dispositivos
  const resetDeviceData = () => {
    setDevice1Data({
      Id_device: "",
      command: "on",
      led_status: false,
      nombre: "",
      sensor_data: 0,
      state: "activo"
    });
    setDevice2Data({
      Id_device: "",
      command: "on",
      led_status: false,
      nombre: "",
      sensor_data: 0,
      state: "activo"
    });
  };

  // Función para alternar el estado del LED
  const toggleLed = async () => {
    if (user) {
      try {
        const newCommand = device1Data.command === 'on' ? 'off' : 'on';
        await set(ref(db, `users/${user.uid}/device/${device1Data.Id_device}/command`), newCommand);
        setDevice1Data(prevData => ({
          ...prevData,
          command: newCommand,
          led_status: newCommand === 'on'
        }));
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('No hay usuario autenticado.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>GasRT</Text>
      <View style={styles.scrollViewContainer}>
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Nivel de Gas:</Text>
            <CircularProgress value={device1Data.sensor_data} radius={90} valueSuffix='%' circleBackgroundColor='transparent' activeStrokeColor={device1Data.sensor_data > 10 ? "red" : "green"} />
            <TouchableOpacity onPress={() => navigation.navigate('ValvulaInfo')} style={styles.button}>
              <Image style={styles.buttonImage} source={require("../Images/Ellipse.png")} />
              <Text style={styles.buttonText}>{device1Data.nombre}</Text>
            </TouchableOpacity>
            <Text style={styles.statusText}>Estatus: {device1Data.state}</Text>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Gas Restante:</Text>
            <CircularProgress value={device2Data.sensor_data} radius={90} valueSuffix='%' circleBackgroundColor='transparent' activeStrokeColor={device2Data.sensor_data > 10 ? "red" : "green"} />
            <TouchableOpacity onPress={() => navigation.navigate('ValvulaInfo')} style={[styles.button, styles.button2]}>
              <Image style={styles.buttonImage} source={require("../Images/Ellipse.png")} />
              <Text style={styles.buttonText}>{device2Data.nombre}</Text>
            </TouchableOpacity>
            <Text style={styles.statusText}>Estatus: {device2Data.state}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Rutinas')} style={styles.iconButton}>
          <Image source={require("../Images/despertador.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLed} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>{device1Data.command === "on" ? "Cerrar Válvula" : "Válvula Cerrada"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative"
  },
  title: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center"
  },
  scrollViewContainer: {
    flex: 0.7,
    marginHorizontal: 70,
  },
  scrollViewContent: {
    alignItems: "center",
    marginTop: 10
  },
  cardContainer: {
    paddingVertical: 30,
    paddingHorizontal: 40,
    backgroundColor: "#EAEAEA99",
    borderRadius: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10
  },
  cardTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "700"
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#E73D07",
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 25
  },
  button2: {
    marginTop: 25
  },
  buttonImage: {
    marginRight: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500"
  },
  statusText: {
    color: "black",
    fontWeight: "600"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  iconButton: {
    backgroundColor: "#E73D07",
    padding: 20,
    borderRadius: 50,
    marginRight: 15
  },
  actionButton: {
    backgroundColor: "#E73D07",
    padding: 20,
    borderRadius: 50
  },
  actionButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "700"
  }
});

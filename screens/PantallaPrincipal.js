import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';

const PantallaPrincipal = () => {
  const [humidityValue, setHumidityValue] = useState(0); // Estado del sensor de humedad
  const [progressColor, setProgressColor] = useState(0); // Estado del círculo de progreso
  const [message, setMessage] = useState(''); // Estado para el mensaje del LED
  const navigation = useNavigation();
  const [ledStatus, setLedStatus] = useState(false);
  const serverURL = 'https://gasrt.000webhostapp.com/index.php'; // URL de tu servidor PHP

  const fetchHumidityValue = async () => {
    try {
      const response = await fetch(serverURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sensor_data: 'humidity' }),
      });
      console.log('Response status:', response.status);
      if (response.ok) {
        const responseBody = await response.json();
        console.log('Response body:', responseBody);
  
        // Actualiza el estado de la humedad y el color del progreso
        const humidity = parseFloat(responseBody.humidity);
        setHumidityValue(humidity);
        setProgressColor(humidity);
  
        const ledStatus = responseBody.led_status === "1";
        setLedStatus(ledStatus);
        const message = ledStatus ? 'Valvula Abierta' : 'Valvula Cerrada';
        setMessage(message);
  
        // Comprueba si la humedad supera el nivel
        if (humidity > 50) {
          console.log('Superado el nivel de gas. Enviando comando "turn_off"');
          await fetch(serverURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'control_command=turn_off',
          });
          console.log('Comando "turn_off" enviado');
        }
  
      } else {
        console.error('Error en la solicitud HTTP al obtener el valor del sensor de humedad.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  
  const toggleLed = async () => {
    try {
        // Envía un comando al ESP32 para encender o apagar la bomba (LED)
        const command = ledStatus ? 'turn_off' : 'turn_on'; // Comando apropiado
        console.log('Solicitud POST:', `control_command=${command}`); // Imprime la solicitud POST
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `control_command=${command}`, // Envía el comando al servidor
        });
        console.log('Response status:', response.status, command);

        if (response.ok) {
            // Actualiza el estado del LED
            setLedStatus(!ledStatus);
        } else {
            console.error('Error en la solicitud HTTP para controlar el LED.');
            // Puedes mostrar un mensaje de error al usuario aquí
        }
    } catch (error) {
        console.error('Error:', error);
        // Puedes mostrar un mensaje de error al usuario aquí
    }
};

  useEffect(() => {
    // Obtiene el valor del sensor inicialmente
    fetchHumidityValue();

    // Establece un intervalo para actualizar el valor del sensor cada 2000 milisegundos (2 segundos)
    const interval = setInterval(fetchHumidityValue, 500);

    // Limpia el intervalo al desmontar el componente
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1, backgroundColor: "#FFFFFF", position:"relative" }}>
      <Text style={{marginTop:100,fontSize:30,fontWeight:"700"}}>GasRT</Text>
      <SafeAreaView style={{ flexDirection: "row",marginTop:80, justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView style={{ paddingVertical: 30, paddingHorizontal: 40, backgroundColor: "#EAEAEA99", borderRadius: 20, flexDirection: "column", alignItems: "center", justifyContent: "center", marginHorizontal: 55 }}>
            <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: "700" }}>
              Nivel de Gas:
            </Text>
            <CircularProgress value={progressColor} radius={90} valueSuffix='%' circleBackgroundColor='transparent' activeStrokeColor={progressColor > 1000 ? "red" : "green"} />
            <TouchableOpacity onPress={() => navigation.navigate('ValvulaInfo')} style={{ flexDirection: "row", justifyContent: "center", backgroundColor: "#E73D07", alignItems: "center", borderRadius: 15, paddingVertical: 15, paddingHorizontal: 20, marginTop: 20 }}>
              <Image style={{ marginRight: 10 }} source={require("../Images/Ellipse.png")} />
              <Text style={{ fontSize: 16,fontWeight:"500" }}>Valvula 1</Text>
            </TouchableOpacity>
            <Text style={{ color: "black",fontWeight:"600" }}>Estatus:{message}</Text>
          </SafeAreaView>
          {/* Agrega más secciones similares si es necesario */}
      </SafeAreaView>
      <SafeAreaView style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Rutinas')} style={{ backgroundColor: "#E73D07", padding: 20, borderRadius: 10, marginRight: 15 }}>
          <Image source={require("../Images/despertador.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLed} style={{ backgroundColor: "#E73D07", padding: 25, borderRadius: 10 }}>
          <Text style={{textAlign:"center", color:"white",fontSize:16,fontWeight:"700"}}>Abrir Valvula</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default PantallaPrincipal;

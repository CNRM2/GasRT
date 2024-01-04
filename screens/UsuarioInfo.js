import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'; // Importa useState y useEffect
import { SafeAreaView } from 'react-native'
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo, AntDesign, Feather, Octicons } from '@expo/vector-icons';

const UsuarioInfo = () => {
  const [ledStatus, setLedStatus] = useState(''); // Estado del LED
  const [buttonText, setButtonText] = useState('Encender Led'); // Texto del botón

  // Función para enviar la solicitud HTTP al ESP32
  const toggleLed = async () => {
    try {
      const response = await fetch('https://gasrt.000webhostapp.com/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'led_status=1', // Datos que deseas enviar al servidor PHP
      });

      if (response.ok) {
        const data = await response.text();
        setLedStatus(data);

        // Cambiar el texto del botón según el estado del LED
        if (data === '"led_status"="1"') {
          setButtonText('Encender Led');
        } else if (data === '"led_status"="0"') {
          setButtonText('Apagar Led');
        }
      } else {
        console.error('Error en la solicitud HTTP');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Actualiza el texto del botón al cargar la página
    if (ledStatus === 'LED_is_off') {
      setButtonText('Encender Led');
    } else if (ledStatus === 'LED_is_on') {
      setButtonText('Apagar Led');
    }
  }, [ledStatus]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Resto de tu código */}
      <TouchableOpacity
        style={{ marginTop: 50, backgroundColor: "#FF0000", padding: 30, borderRadius: 100,marginBottom:20}}
        onPress={toggleLed} // Llama a la función cuando se presione el botón
      >
        <Text style={{ color: buttonText === 'Encender Led' ? "black" : "white", fontSize: 15, fontWeight: "700" }}>{buttonText}</Text>
      </TouchableOpacity>
      {/* Mostrar el estado del LED */}
      <Text style={{ color: "black", fontSize: 15, fontWeight: "700" }}>
        Estado del LED: {ledStatus}
      </Text>
    </SafeAreaView>
  )
}

export default UsuarioInfo;

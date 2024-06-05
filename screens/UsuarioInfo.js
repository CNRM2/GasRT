import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const devicesData = [
  { id: 1, type: 'Valvula GasRT', status: 'Activo' },
  { id: 2, type: 'Sensor GasRT', status: 'Activo' },
  { id: 3, type: 'Bascula GasRT', status: 'Inactiva', battery: '50%' },
  // Agrega más dispositivos si es necesario
];

const DeviceListItem = ({ device, onPress }) => {
  let statusInfo = device.status;
  if (device.type === 'Sensor GasRT' || device.type === 'Valvula GasRT') {
    statusInfo = device.status === 'Activo' ? 'Activo' : 'Inactivo';
  } else if (device.type === 'Bascula GasRT') {
    statusInfo = device.status === 'Inactiva' ? 'Inactiva' : 'Activa';
  }

  const batteryInfo = device.battery ? `Batería: ${device.battery}` : '';

  // Mapea el tipo de dispositivo a su icono correspondiente
  let iconSource;
  switch (device.type) {
    case 'Valvula GasRT':
      iconSource = require('../Images/valvulaGas.png');
      break;
    case 'Sensor GasRT':
      iconSource = require('../Images/gas.png');
      break;
    case 'Bascula GasRT':
      iconSource = require('../Images/bascula.png');
      break;
    default:
      iconSource = null;
  }

  const deviceItemStyle = [
    styles.deviceItem,
    device.status === 'Inactiva' && { backgroundColor: '#BEBEBE' }, // Cambio de fondo si el dispositivo está inactivo
    device.status === 'Activo' && { backgroundColor: '#FF6B00' },
    device.status === 'Conectado' && { backgroundColor: '#FF6B00' },
  ];

  return (
    <TouchableOpacity style={deviceItemStyle} onPress={onPress}>
      {/* Renderiza el icono si está disponible */}
      {iconSource && <Image source={iconSource} style={[styles.icon, { tintColor: 'white' }]} />}
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceText}>{device.type}</Text>
        <Text style={styles.deviceText}>ID: {device.id}</Text>
      </View>
      <Text style={styles.deviceText}>{statusInfo}</Text>
      {batteryInfo ? <Text style={styles.deviceText}>{batteryInfo}</Text> : null}
    </TouchableOpacity>
  );
};

const UsuarioInfo = () => {
  const navigation = useNavigation();

  const handleDevicePress = (device) => {
    // Navegar a la pantalla DispositivoInfo y pasar los datos del dispositivo como parámetros
    navigation.navigate('DispositivosInfo', device);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headertext}>Dispositivos</Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegistroValvula")} style={styles.iconMasContainer}>
          <Image source={require("../Images/more.png")} style={styles.iconoMas} />
        </TouchableOpacity>
      </SafeAreaView>
      <FlatList style={{ marginTop: 20 }}
        data={devicesData}
        renderItem={({ item }) => <DeviceListItem device={item} onPress={() => handleDevicePress(item)} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10, // Modifica la altura del header aquí
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headertext: {
    fontSize: 20,
    fontWeight: '600',
  },
  iconoMas: {
    marginRight: 20,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceText: {
    fontSize: 16,
    color: 'white',
    marginRight: 10,
  },
});

export default UsuarioInfo;
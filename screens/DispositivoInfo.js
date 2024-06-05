import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Switch } from 'react-native';

export default function DispositivoInfo({ route, navigation }) {
  // Obtener los datos del dispositivo de las props de navegación
  const { nombre, descripcion, tipo, habilitado } = route.params;

  // Función para modificar el nombre del dispositivo
  const handleModificarNombre = () => {
    // Lógica para modificar el nombre del dispositivo
  };

  // Función para borrar el dispositivo
  const handleBorrarDispositivo = () => {
    // Lógica para borrar el dispositivo
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>Dispositivo</Text>
        <TouchableOpacity onPress={handleBorrarDispositivo}>
          <Image source={require('../Images/borrar.png')} style={styles.borrarIcono} />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.content}>
        <Text style={styles.nombreDispositivo}>Nombre: Sensor GasRT {nombre}</Text>
        <TouchableOpacity style={styles.editarNombre} onPress={handleModificarNombre}>
          <Text style={styles.editarNombreTexto}>Editar</Text>
          <Image source={require('../Images/editar-texto.png')} style={styles.modificarIcono} />
        </TouchableOpacity>
        <View style={styles.division} />
        <Text style={styles.descripcion}>Descripción: Sensor de gas en cocina {descripcion}</Text>
        <Text style={styles.tipo}>Tipo: Sensor{tipo}</Text>
        <View style={styles.division} />
        <View style={styles.toggleContainer}>
          <Text>Habilitar/Desabilitar:</Text>
          <Switch value={habilitado} onValueChange={() => console.log('Cambiar estado')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginHorizontal:15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  borrarIcono: {
    width: 20,
    height: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  nombreDispositivo: {
    fontSize: 20, // Tamaño de texto aumentado
    fontWeight: '500',
    marginBottom: 20, // Más espacio entre el nombre y la siguiente sección
    marginLeft: 10, // Margen izquierdo agregado para los textos
  },
  editarNombre: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  editarNombreTexto: {
    marginRight: 5,
    color: 'blue', // Color de enlace
  },
  modificarIcono: {
    width: 20,
    height: 20,
  },
  division: {
    borderBottomWidth: 3,
    borderBottomColor: '#E5E5E5',
    marginBottom: 30, // Más espacio después de cada división
  },
  descripcion: {
    fontSize: 18, // Tamaño de texto aumentado
    marginBottom: 20, // Más espacio después de la descripción
    marginLeft: 10, // Margen izquierdo agregado para los textos
  },
  tipo: {
    fontSize: 18, // Tamaño de texto aumentado
    marginBottom: 20,
    marginLeft: 10, // Margen izquierdo agregado para los textos
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
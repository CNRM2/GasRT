import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, Modal, Pressable, Switch, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import { db } from '../components/config';
import { getAuth } from "firebase/auth";
import { ref, push, set, get, onValue, update } from 'firebase/database';

const Rutinas = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [switchStates, setSwitchStates] = useState([]);
  const [alarmas, setAlarmas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevaRutina, setNuevaRutina] = useState({ hora: new Date(), etiqueta: '', dias: [] });
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setAlarmas([]);
        setSwitchStates([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const alarmasRef = ref(db, `users/${user.uid}/routines`);
      const alarmasListener = onValue(alarmasRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const alarmasArray = Object.entries(data).map(([key, value]) => ({ ...value, id: key }));
          setAlarmas(alarmasArray);
          const switches = alarmasArray.map(alarm => alarm.state);
          setSwitchStates(switches);
        } else {
          setAlarmas([]);
          setSwitchStates([]);
        }
      });

      return () => {
        // Desactivar el listener cuando el componente se desmonte
        alarmasListener();
      };
    }
  }, [user]);

  const toggleSwitch = (index) => {
    if (user && alarmas[index]) {
      const newStates = [...switchStates];
      newStates[index] = !newStates[index];
      setSwitchStates(newStates);

      // Obtener el ID de la alarma en el índice proporcionado
      const alarmId = alarmas[index].id;

      // Actualizar el estado en la base de datos
      const rutinaRef = ref(db, `users/${user.uid}/routines/${alarmId}`);
      update(rutinaRef, { state: newStates[index] })
        .then(() => console.log("Estado de la rutina actualizado"))
        .catch((error) => console.error("Error al actualizar el estado de la rutina:", error));
    } else {
      console.error("La alarma en el índice proporcionado no existe o es 'undefined'");
    }
  };


  const agregarAlarma = () => {
    setModalVisible(true);
    setNuevaRutina({ hora: new Date(), etiqueta: '', dias: [] });
  };

  const guardarNuevaRutina = () => {
    if (user) {
      const rutinasRef = ref(db, `users/${user.uid}/routines`);
      const nuevaRutinaRef = push(rutinasRef);

      const horaFormateada = nuevaRutina.hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      set(nuevaRutinaRef, { ...nuevaRutina, hora: horaFormateada })
        .then(() => {
          console.log("Nueva rutina guardada:", nuevaRutina);
          setModalVisible(false);
          Alert.alert('Éxito', 'Nueva rutina guardada exitosamente.');
        })
        .catch((error) => {
          console.error("Error al guardar la nueva rutina:", error);
          Alert.alert('Error', 'Hubo un error al guardar la nueva rutina. Por favor, inténtalo de nuevo.');
        });
    } else {
      console.log("El usuario no está autenticado. No se puede guardar la rutina.");
    }
  };

  const handleTimePickerChange = (event, selectedTime) => {
    if (event.type !== 'dismissed') {
      setNuevaRutina({ ...nuevaRutina, hora: selectedTime });
    }
  };

  const seleccionarHora = () => {
    setShowTimePicker(true);
    setModalVisible(false);
  };

  const cerrarTimePicker = () => {
    setShowTimePicker(false);
    setModalVisible(true);
  };

  const seleccionarDia = (dia) => {
    setNuevaRutina((prevState) => {
      const nuevosDias = prevState.dias.includes(dia) ? prevState.dias.filter((d) => d !== dia) : [...prevState.dias, dia];
      return { ...prevState, dias: nuevosDias };
    });
  };

  const BotonDia = ({ dia }) => {
    const isSelected = nuevaRutina.dias.includes(dia);
    return (
      <TouchableOpacity
        onPress={() => seleccionarDia(dia)}
        style={[styles.botonDia, isSelected && styles.botonDiaSeleccionado]}
      >
        <Text style={styles.textoDia}>{dia}</Text>
      </TouchableOpacity>
    );
  };

  const DiasSeleccionados = ({ dias }) => {
    return (
      <Text style={styles.textoDiasSeleccionados[{ marginLeft: 0 }]}>{dias}</Text>
    );
  };

  const getDiasSeleccionados = (dias) => {
    return dias.map(dia => dia.substring(0, 1)).join(',');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>RUTINAS</Text>
        <TouchableOpacity onPress={agregarAlarma}>
          <Image source={require("../Images/more.png")} style={styles.iconoMas} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {alarmas && alarmas.map((alarma, index) => (
          <View key={index} style={[styles.alarma, { opacity: switchStates[index] ? 1 : 0.9 }]}>
            <View style={styles.contenidoAlarma}>
              <Text style={[styles.textoAlarma, { color: switchStates[index] ? "white" : "black" }]}>{alarma.hora}</Text>
              <DiasSeleccionados dias={getDiasSeleccionados(alarma.dias)} />
              <Text style={[styles.textoAlarma, { color: switchStates[index] ? "white" : "black" }]}>{alarma.etiqueta}</Text>
            </View>
            <View style={styles.switchContainer}>
              <Text style={[styles.textoDiariamente, { color: switchStates[index] ? "white" : "black" }]}>DIARIAMENTE</Text>
              <Switch
                trackColor={{ false: 'gray', true: 'white' }}
                thumbColor={switchStates[index] ? 'white' : 'black'}
                onValueChange={() => toggleSwitch(index)}
                value={switchStates[index]}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Selecciona la hora:</Text>
            <TouchableOpacity style={styles.botonHora} onPress={seleccionarHora}>
              <Text style={styles.textoHora}>
                {nuevaRutina.hora ? nuevaRutina.hora.toString() : 'Seleccionar hora'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>Selecciona los días:</Text>
            <View style={styles.botonesDiasContainer}>
              <BotonDia dia="Lunes" />
              <BotonDia dia="Martes" />
              <BotonDia dia="Miércoles" />
              <BotonDia dia="Jueves" />
              <BotonDia dia="Viernes" />
              <BotonDia dia="Sábado" />
              <BotonDia dia="Domingo" />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={guardarNuevaRutina}
            >
              <Text style={styles.textStyle}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {showTimePicker && (
        <View style={styles.timePickerContainer}>
          <DateTimePicker
            value={nuevaRutina.hora || new Date()}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={handleTimePickerChange}
            locale="es-MX"
          />
          <Button title="OK" onPress={cerrarTimePicker} />
        </View>
      )}
    </SafeAreaView>
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
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 200,
  },
  iconoMas: {
    marginRight: 20,
  },
  scrollView: {
    maxHeight: 520,
  },
  alarma: {
    backgroundColor: '#D75B34',
    padding: 20,
    marginHorizontal: 25,
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 15,
  },
  contenidoAlarma: {
    flexDirection: 'column',
    flex: 1,
  },
  textoAlarma: {
    fontSize: 25,
    fontWeight: '700',
  },
  switchContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoDiariamente: {
    fontSize: 13,
    fontWeight: '700',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  botonesDiasContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  botonDia: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  botonDiaSeleccionado: {
    backgroundColor: '#2196F3',
  },
  textoDia: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  botonHora: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  textoHora: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoDiasSeleccionados: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default Rutinas;
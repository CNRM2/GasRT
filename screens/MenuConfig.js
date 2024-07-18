import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { db } from '../components/config';
import { getAuth } from "firebase/auth";
import { ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

const MenuConfig = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        fetchUserData(user.uid); // Obtener datos del usuario cuando se autentica
      } else {
        setUser(null);
        setFullName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = (userId) => {
    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        const { f_name, l_name } = userData;
        const fullName = `${f_name} ${l_name}`;
        setFullName(fullName);
      } else {
        setFullName('');
      }
    }, (error) => {
      console.error("Error fetching user data:", error);
      setFullName(''); // Reiniciar el estado en caso de error
    });
  };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profilepicture}>
                <Image source={require("../Images/profile-picture.png")} style={{ borderRadius: 150, width: 200, height: 200 }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 20, padding: 5, marginTop: 20 }}>
                <Image style={{ marginRight: 10 }} source={require("../Images/Ellipse.png")} />
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                    {fullName ? fullName : 'Loading...'}
                </Text>
            </View>
            <SafeAreaView style={[styles.ButtonCreate]} >
                <TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "white", marginLeft: 20 }}>CUENTA</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={[styles.ButtonCreate]} >
                <TouchableOpacity onPress={() => navigation.navigate("RegistroValvula")}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "white", marginLeft: 20 }}>CONFIGURACIÓN DE VALVULAS</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={[styles.ButtonCreate]} >
                <TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "white", marginLeft: 20 }}>CONFIGURACIÓN</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={[styles.SignUpButton]} >
                <TouchableOpacity onPress={() => navigation.navigate("InicioSesion")}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>CERRAR SESION</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    profilepicture: {
        backgroundColor: "transparent",
        marginTop: 100,
        marginHorizontal: 125,
        borderRadius: 150,
        borderColor: "#E73D07",
        borderWidth: 15
    },
    ButtonCreate: {
        backgroundColor: "#E73D07",
        borderRadius: 10,
        marginTop: 20,
        width: 350,
        height: 65,
        justifyContent: "center",
    },
    SignUpButton: {
        backgroundColor: "#E73D07",
        borderRadius: 10,
        marginTop: 50,
        marginBottom: 50,
        width: 200,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default MenuConfig;

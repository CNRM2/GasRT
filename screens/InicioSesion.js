import React, { useState } from 'react';
import { Alert, TextInput, View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function InicioSesion() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const isValidEmail = (email) => {
        // Expresión regular para validar un correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        // Verificar que la contraseña tenga al menos 8 caracteres
        return password.length >= 8;
    };

    const handleLogin = () => {
        // Validar el correo electrónico y la contraseña
        if (!isValidEmail(email)) {
            Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
            return;
        }
        if (!isValidPassword(password)) {
            Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        // Iniciar sesión con Firebase Authentication
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Inicio de sesión exitoso
                const user = userCredential.user;
                registerIndieID('jvaldezc', 23057, 'M2YBwa6PvrlD1eMKESgXS7');
                console.log(user);
                Alert.alert('Éxito', 'Inicio de sesión exitoso.');
                navigation.navigate('ButtonsTab');
            })
            .catch((error) => {
                // Error al iniciar sesión
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error al iniciar sesión:', errorMessage);
                Alert.alert('Error', 'Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.');
            });
    };


return (
    <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 100 }}>
            <Image source={require("../Images/GasLogo2.png")} />
        </View>

        <View style={{ justifyContent: "center", alignContent: "center", marginTop: 10 }}>
            <SafeAreaView style={[styles.TextInputs]}>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder='CORREO O USUARIO'
                    style={styles.inputStyle}
                    keyboardType="email-address"
                />
            </SafeAreaView>
            <SafeAreaView style={[styles.TextInputs, { marginTop: 20 }]}>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder='CONTRASEÑA'
                    secureTextEntry={true}
                    style={styles.inputStyle}
                />
            </SafeAreaView>
        </View>
        <TouchableOpacity style={[styles.ButtonCreate]} onPress={handleLogin}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>INGRESAR</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 20 }}>¿No tienes una Cuenta?</Text>
        <TouchableOpacity style={[styles.ButtonCreate]} onPress={() => navigation.navigate('RegistroUsuario')}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>CREAR CUENTA</Text>
        </TouchableOpacity>
    </SafeAreaView>
);
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    text: {
        fontSize: 11,
        color: '#4D4D4D',
        alignSelf: "baseline",
        marginLeft: 10,
        marginBottom: 5
    },
    TextInputs: {
        backgroundColor: "#EBEBEB",
        height: 45,
        width: 300,
        borderRadius: 15,
        textAlign: "center",
        justifyContent: "center",
        overlayColor: "black",
        marginBottom: 20
    },
    ButtonCreate: {
        backgroundColor: "#E73D07",
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        width: 175,
        borderRadius: 10,
        marginTop: 20
    },
    inputStyle: {
        marginLeft: 20
    }
});
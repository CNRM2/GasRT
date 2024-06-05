import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native';
import { ref, get, query, orderByChild, equalTo, set, push } from "firebase/database";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../components/config'; // Importar la instancia de autenticación de Firebase

const RegistroUsuario = () => {
    const [f_name, setF_name] = useState('');
    const [l_name, setL_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputRefs = {
        l_name: useRef(null),
        email: useRef(null),
        password: useRef(null)
    };

    const focusInput = (inputField) => {
        inputRefs[inputField].current.focus();
    };

    const isValidEmail = (email) => {
        // Expresión regular para validar un correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        // Expresión regular para validar la contraseña
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-_&])[A-Za-z\d_-]{8,}$/;
        return passwordRegex.test(password);
    };

    const isValidName = (name) => {
        // Expresión regular para validar nombres y apellidos
        const nameRegex = /^[a-zA-Z\s]*$/;
        return nameRegex.test(name);
    };

    const create = () => {
        // Verificar si algún campo está vacío
        if (!f_name || !l_name || !email || !password) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return; // Salir de la función si algún campo está vacío
        }

        // Validar el correo electrónico
        if (!isValidEmail(email)) {
            Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Validar la contraseña
        if (!isValidPassword(password)) {
            Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres, incluir al menos una letra, un número y dos de los siguientes caracteres: _, -, &.');
            return;
        }

        // Validar nombres y apellidos
        if (!isValidName(f_name) || !isValidName(l_name)) {
            Alert.alert('Error', 'Los nombres y apellidos no deben contener números ni caracteres especiales.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Usuario creado exitosamente
                const user = userCredential.user;
                console.log('Usuario creado:', user);

                // Guardar la información del usuario en Realtime Database
                const userRef = ref(db, `users/${user.uid}`);
                set(userRef, {
                    f_name: f_name,
                    l_name: l_name,
                    email: email,
                    password: password,
                })
                    .then(() => {
                        console.log('Información del usuario guardada en Realtime Database');
                        alert('Usuario creado exitosamente');
                    })
                    .catch((error) => {
                        console.error('Error al guardar la información del usuario en Realtime Database:', error);
                    });
            })
            .catch((error) => {
                // Hubo un error al crear el usuario
                console.error('Error al crear el usuario:', error);
            });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>

            <View style={{ marginTop: 50 }}>
                <Image source={require("../Images/GasLogo.png")} style={{ height: 156, width: 376 }} />
            </View>

            <View style={{ justifyContent: "center", alignContent: "center", marginTop: 50 }}>
                <Text style={styles.text}>Nombre</Text>
                <SafeAreaView style={styles.TextInputs}>
                    <TextInput
                        value={f_name}
                        onChangeText={(text) => setF_name(text)}
                        style={{ marginLeft: 20 }}
                        onSubmitEditing={() => focusInput('l_name')}
                        returnKeyType="next"
                    />
                </SafeAreaView>
                <Text style={styles.text}>Apellidos</Text>
                <SafeAreaView style={styles.TextInputs}>
                    <TextInput
                        ref={inputRefs.l_name}
                        value={l_name}
                        onChangeText={(text) => setL_name(text)}
                        style={{ marginLeft: 20 }}
                        onSubmitEditing={() => focusInput('email')}
                        returnKeyType="next"
                    />
                </SafeAreaView>
                <Text style={styles.text}>Correo Electrónico</Text>
                <SafeAreaView style={styles.TextInputs}>
                    <TextInput
                        ref={inputRefs.email}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={{ marginLeft: 20 }}
                        onSubmitEditing={() => focusInput('password')}
                        returnKeyType="next"
                    />
                </SafeAreaView>
                <Text style={styles.text}>Contraseña</Text>
                <SafeAreaView style={styles.TextInputs}>
                    <TextInput
                        ref={inputRefs.password}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={{ marginLeft: 20 }}
                        returnKeyType="done"
                        secureTextEntry={false}
                    />
                </SafeAreaView>
            </View>
            <TouchableOpacity onPress={create} style={styles.ButtonCreate}>
                <Text style={styles.buttonText}>CREAR CUENTA</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default RegistroUsuario;

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
        marginBottom: 5,
        fontWeight: "600",
        opacity: 0.7
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
        height: 50,
        width: 175,
        borderRadius: 10,
        marginTop: 20
    }
});
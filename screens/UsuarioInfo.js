import { View, Text } from 'react-native'
import React from 'react'
import { Component } from 'react'
import { SafeAreaView } from 'react-native'
import * as Progress from 'react-native-progress';
import CircularProgress from 'react-native-circular-progress-indicator';

const UsuarioInfo = () => {
    return (
        <SafeAreaView style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <CircularProgress value={85}/>
        </SafeAreaView>
    )
}

export default UsuarioInfo
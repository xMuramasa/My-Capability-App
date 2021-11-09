import React, { Component } from "react";
import { Text, View, Button, TextInput, NativeModules } from 'react-native';
import interfaz from '../styles/styles.js';
import styles from "../styles/styles.js";
import GLOBAL from './global.js'
const { ConnectionModule } = NativeModules;


export function JumpScreen() {
	const [messageToNative, setMessageToNative] = React.useState('');

	const MyFunc = () => {
		console.log('We will invoke the native module here!');
		
		//calcular salto en Java
		ConnectionModule.startSaltoVertical(GLOBAL.user_id, 100);		//IMPLEMENTAR OBTENER ALTURA

	}

	return (
		
		<View style={ interfaz.container }>

			<Text>Medir Salto</Text>
			
			{/* <Text> nativeMessage </Text>  */}

			<View style={interfaz.space} />

			<Button onPress={onPress} title="Medir Salto" />

		</View>
	);
}


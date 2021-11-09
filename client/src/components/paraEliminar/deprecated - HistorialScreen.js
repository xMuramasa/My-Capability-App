import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { Button } from 'react-native-paper';
import mapStyles from "../styles/mapStyles.js";

import interfaz from '../styles/styles.js';

import TableComponent from "./TableComponent.js";
import getResultsByUserId from '../API/getResultsByUserId';
import deleteResult from '../API/deleteResult';

const styles = StyleSheet.create({
	viewStyle: {
		height: 40,
		flexDirection: 'row',
		alignItems: "center"
	},
	buttonsContainer: {
		paddingHorizontal: 8,
      	paddingVertical: "10%",
		justifyContent: 'center',
		//justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: "wrap",
	},
	button: {
		width: 100,
		height: 40,
		borderRadius: 20,
		marginBottom: 10,
		backgroundColor: '#3399ff',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 5,
	},
	buttonText: {
		fontWeight: 'bold',
		fontSize: 14,
		color: 'white'
	},
	deleteContainer: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 20,
	},
	deletebutton: {
		width: 120,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#3399ff',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 10,
	},
	inputStyles: {
		height: 40,
		width: 150,
		marginHorizontal: 5,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerStyle: {
		alignItems: 'center',
		flexDirection: 'column',
	},
});


class HistorialScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user_id: 4,		//implementar usuarios
			resultData: [],
			show: "all",
			input: ""
		};
	}
	
	//obtener resultados antes de renderizar la tabla
	async componentDidMount() {
		try{
			getResultsByUserId(this.state.user_id).then((results) => 
				this.setState({ resultData: results }));
		} catch (err) {
			console.error(err);
		}
	}


	//eliminar resultado por id
	deleteData = async () => {
		deleteResult(this.state.input).then(() => {
			console.log("resultado eliminado")
		})
	}

	//guardar input de cuadro de texto
	handleText = (text) => {
		this.setState({ input: text})
	}

	handleShow = (value) => {
		this.setState({ show: value })
	}

	render() {
		
		const rowsEmpty = false;
		const resultJump = this.state.resultData.filter(d => d.type === 0);
		const resultSpeed = this.state.resultData.filter(d => d.type === 1);


		return (
			<View style={styles.containerStyle}>

				
				<View style={styles.buttonsContainer}>
					<Button 
						mode='outlined' onPress={() => this.handleShow("all")}
						style={mapStyles.button2}>
							Todos
					</Button>  
					<Button  
						mode='outlined' onPress={() => this.handleShow("jump")}
						style={mapStyles.button2}>
							Salto
					</Button>  
					<Button 
						mode='outlined' onPress={() => this.handleShow("speed")}
						style={mapStyles.button2}>
							Velocidad
					</Button>  
				</View>
{/*
				<View style={styles.deleteContainer}>
					<TextInput
						style={styles.inputStyles}
						placeholder="Result ID"
						onChangeText={this.handleText}
					/>

					{ /*idea: hacer clic afuera baja el teclado +/ }

					<Button 
						mode='outlined' onPress={ () => {this.deleteData(); alert('Resultado eliminado')}}
						style={mapStyles.button2}>
							Delete Results
					</Button> 

				</View>
*/}
				{rowsEmpty ?
					<View > 
						<Text>Sin Datos</Text>
					</View>
					:
					<View>
						{
							this.state.show === "jump" ? <TableComponent rows={resultJump}/>
							:
							this.state.show === "speed" ? <TableComponent rows={resultSpeed}/>
							:
							<TableComponent rows={this.state.resultData}/>
						}
					</View>
				}
			</View>
		);
	}
}

export default HistorialScreen;

/*
<View style={styles.buttonsContainer}>
	<TouchableOpacity style={styles.button} onPress={() => this.handleShow("all")}>
		<Text style={styles.buttonText}>Todos</Text>
	</TouchableOpacity>
	<TouchableOpacity style={styles.button} onPress={() => this.handleShow("jump")}>
		<Text style={styles.buttonText}>Salto</Text>
	</TouchableOpacity>
	<TouchableOpacity style={styles.button} onPress={() => this.handleShow("speed")}>
		<Text style={styles.buttonText}>Velocidad</Text>
	</TouchableOpacity>
</View>

<TouchableOpacity
	style={styles.deletebutton}
	onPress={() => { this.deleteData(); alert('Resultado eliminado') }}
>
	<Text style={styles.buttonText}>Delete Results</Text>
</TouchableOpacity>


*/
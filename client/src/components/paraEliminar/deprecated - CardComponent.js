import React, { Component } from "react";
import { TabView, SceneMap } from 'react-native-tab-view';
import {NativeBaseProvider, Box, VStack, HStack, Avatar, Image, Text, 
	AspectRatio, Center, Stack, Heading} from 'native-base';
    
class CardComponent extends Component {

	// mostrar tipo de ejercicio solo en pestaña Todos
	tags(All){
		if (All === true){

			var Tipo
			switch (this.props.type){
				case 0:
					Tipo = "Salto Vertical";
					break;
				case 1:
					Tipo = "Velocidad";
					break;
				case 2:
					Tipo = "Salto Horizontal";
					break;
				default:
					Tipo = ""
					break;
			}
			return (
				<VStack>
					<Heading>
						<Text>{Tipo}</Text>
					</Heading>
				</VStack>
			);
		}
	}


	render(){
		//color de tarjeta según tipo de ejercicio
		var Tipo_bg;
		// unidades de resultado
		var unidad;

		switch (this.props.type){
			case 0:
				Tipo_bg = "#EB851E";
				unidad = "m"
				break;

			case 1:
				Tipo_bg = "#5BC0EB";
				unidad = "Km/h"
				break;

			case 2:
				Tipo_bg = "#F9C784";
				unidad = "m"
				break;

			default:
				Tipo_bg = "";
				break;
		}

		return (
			<Box
			// cambiar color según tipo
				bg={Tipo_bg}
				shadow={2}
				rounded="lg"
				width="90%"
				m={2}
				mt={2}
			>
				<Stack space={3} p={["8%", 5, 8]}>
					
					{this.tags(this.props.All)}

					<VStack>
						<HStack flex={1} flexDirection="row" alignItems = 'flex-start'>
							<Heading>
								Resultado: {this.props.resultado.toFixed(2)} {unidad}
							</Heading>
						</HStack>
						<HStack flex={1} flexDirection="row" alignItems = 'flex-end'>
							<Text color="gray.800" size={["md", "lg", "md"]}>{this.props.fecha}</Text>
						</HStack>
					</VStack>
					
				</Stack>
			</Box>
		);
	}
}

export default CardComponent;

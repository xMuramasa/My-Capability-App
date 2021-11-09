import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView
} from "react-native";

import {LineChart} from "react-native-chart-kit";
import getResultsByUserId from '../API/getResultsByUserId';
import GLOBAL from './global'

import styles from '../styles/screensStyles'


splitDate = (d) => {
	// 2021-07-21T00:00
	// 31-07-21
	var f = d.slice(0, 16).split("T")[0]; //fecha
	var f2 = f.split("-").reverse(); //fecha inv
	f2[2] = f2[2].slice(2,4);
	var f3 = f2.join("-");

	// var h = d.slice(0, 16).split("T")[1];//hora

	return f3 /*+ " " + h*/;
}

/* arreglo de fechas equidistantes */
getXAxis = (lista) => {
	let fechas = [];
	let n = lista.length;
	
	if (n/8 > 1){

		let f = Math.floor(n/8)
		for (let i = 0; i < 7; i++ ){
			fechas.push(splitDate(lista[i*f]));
		}
		fechas.push(splitDate(lista[n-1]))
	} else {
		for (let i = 0; i < n; i++ ){
			fechas.push(splitDate(lista[i]));
		}
	}

	return fechas
}

class Graficos extends Component {

	
	constructor(props) {
        super(props);
        this.state = {dataSaltoVert: [],
			dataVelocidad: [],
			dataSaltoHor: [],
			fechaSaltoVert: [],
			fechaVelocidad: [],
			fechaSaltoHor: [],
			dataReady: false
        };
    }
	
	controller = new AbortController();

	
	// dataComp: lista con resultados
	LineChart_Dynamic=(tipoData, dataComp, fecha)=>{

		if (dataComp){
			if(dataComp.length){

				// Título
				var tipoDataTitulo;
				switch (tipoData){
					case "SaltoVert":
						tipoDataTitulo = "Salto vertical [m]"
						break
					case "Sprint":
						tipoDataTitulo = "Sprint [Km/h]"
						break
					case "SaltoHor":
						tipoDataTitulo = "Salto horizontal [m]"
						break
					default:
						console.log("[LineChart_Dynamic] error en título")
				}


				return(
					<View>
						<View style={{alignItems: 'center'}}>
							<Text style={{ fontSize: 20, fontWeight: "bold" }}>{tipoDataTitulo}</Text>
						</View>
						
						<LineChart
							data={{
							labels: fecha,
							datasets: [
								{
									data: dataComp
								}
							]
							}}
							width={Dimensions.get("window").width * 0.96} // from react-native
							height={250}
							yAxisInterval={1} // optional, defaults to 1
							verticalLabelRotation={20}
							chartConfig={{
								backgroundColor: "#ffffff",
								backgroundGradientFrom: "#ffffff",
								backgroundGradientTo: "#ffffff",
								decimalPlaces: 2, // optional, defaults to 2dp
								color: (opacity = 1) => `rgba(240, 136, 84, ${opacity})`,
								labelColor: (opacity = 1) => `rgba(80, 80, 80, ${opacity})`,
								style: {
									borderRadius: 10
								},
								// propsForDots: {
								// 	r: "6",
								// 	strokeWidth: "2",
								// 	stroke: "#ffa726"
								// }
							}}
							bezier
							style={{
							marginVertical: 8,
							borderRadius: 10,
							}}
						/>
					</View>
				)

			} else {
				return(
					<View style={{justifyContent:"center",alignItems:'center',flex:1}}>
						<ActivityIndicator size="large"/>
					</View>
				)
			}

		} else {
			return(
			<View style={{justifyContent:"center",alignItems:'center',flex:1}}>
				<Text>No se encontraron datos</Text>
			</View>
			)}

	}


 	get_chart = () => {

		getResultsByUserId(GLOBAL.user_id).then((results) => {

			this.setState({dataSaltoVert: results
				.filter(d => d.type === 0)
				.map((row, _) => (row.result))
				.reverse()
			});

			this.setState({dataVelocidad: results
				.filter(d => d.type === 1)
				.map((row, _) => (row.result))
				.reverse()
			});
			this.setState({dataSaltoHor: results
				.filter(d => d.type === 2)
				.map((row, _) => (row.result))
				.reverse()
			});
			this.setState({fechaSaltoVert: results
				.filter(d => d.type === 0)
				.map((row, _) => (row.date))
				.reverse()
			});
			this.setState({fechaVelocidad: results
				.filter(d => d.type === 1)
				.map((row, _) => (row.date))
				.reverse()
			});
			this.setState({fechaSaltoHor: results
				.filter(d => d.type === 2)
				.map((row, _) => (row.date))
				.reverse()
			});
			this.setState({dataReady: true})

		}).catch((error) => console.log(error));
	}

	componentDidMount=()=>{
		// this.mounted = true;
		// if(this.mounted) {
			this.get_chart()
		// }
	}
	
	componentWillUnmount = () => {
		// this.mounted = false;
		this.controller.abort();
		// alert('The component is going to be unmounted');
	}

	render() {

		return(
			<View style={[styles.container, {padding: "1%"}]}>

				{/* loading circle */}
				{this.state.dataReady === false &&
					<View style={{ flex: 1, justifyContent: "center", paddingTop: "50%" }}>
						<ActivityIndicator size={"200%"} color="#FC7A1E" />
					</View>
				}

				<ScrollView>

					<View style={[styles.rowView, {marginBottom: "5%"}]}>
						{this.LineChart_Dynamic("SaltoVert", this.state.dataSaltoVert, getXAxis(this.state.fechaSaltoVert))}
					</View>

					<View style={[styles.rowView, {marginBottom: "5%"}]}>
						{this.LineChart_Dynamic("Sprint", this.state.dataVelocidad, getXAxis(this.state.fechaVelocidad))}
					</View>

					<View style={[styles.rowView, {marginBottom: "5%"}]}>
						{this.LineChart_Dynamic("SaltoHor", this.state.dataSaltoHor, getXAxis(this.state.fechaSaltoHor))}
					</View>
				</ScrollView>


			</View>

		)
	}
}

export default Graficos;
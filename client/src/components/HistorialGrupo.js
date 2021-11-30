import React, { Component } from "react";
import { 
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Dimensions,
} from 'react-native';

//Componentes
import Card from "./Card.js";
import { LineChart } from "react-native-chart-kit";
import { Layout, Tab, TabView, Divider, Spinner } from '@ui-kitten/components';

//API
import getStudentResutls from '../API/getStudentResutls.js'

import GLOBAL from './global'


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

class HistorialGrupo extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            studentData: [],
            resultData: false,
            plotData: false,

            dataSaltoVert: [],
			dataSaltoHor: [],
			fechaSaltoVert: [],
			fechaSaltoHor: [],
        };
    }
    
    controller = new AbortController();

    componentDidMount(){
        const { group, student, name } = this.props.route.params;
        getStudentResutls(GLOBAL.user_id, group, student).then((data) => {
            this.setState({ studentData: data, resultData: true})

            this.setState({dataSaltoVert: data
				.filter(d => d.tipo === 0)
				.map((row, _) => (row.res))
				.reverse()
			});
			this.setState({dataSaltoHor: data
				.filter(d => d.tipo === 2)
				.map((row, _) => (row.res))
				.reverse()
			});
			this.setState({fechaSaltoVert: data
				.filter(d => d.tipo === 0)
				.map((row, _) => (row.date))
				.reverse()
			});
			this.setState({fechaSaltoHor: data
				.filter(d => d.tipo === 2)
				.map((row, _) => (row.date))
				.reverse()
			});
            this.setState({ plotData: true})
        })
    }

    componentWillUnmount = () => {
		// this.mounted = false;
		this.controller.abort();
		// alert('The component is going to be unmounted');
	}

    setSelectedIndex = (index) => {
        this.setState({selectedIndex : index})
    }

    LineChart_Dynamic=(tipoData, dataComp, fecha)=>{

		if (dataComp){
			if(dataComp.length){

				// Título
				var tipoDataTitulo;
				switch (tipoData){
					case "SaltoVert":
						tipoDataTitulo = "Salto vertical [cm]"
						break
					case "SaltoHor":
						tipoDataTitulo = "Salto horizontal [cm]"
						break
					default:
						console.log("[LineChart_Dynamic] error en título")
				}

				return(
					<View>
						<View style={{alignItems: 'center'}}>
							<Text style={styles.studentName}>{tipoDataTitulo}</Text>
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

    render(){
        const { group, student, name } = this.props.route.params;


        return ( 
            <View style={styles.container}>
                <TabView
                    selectedIndex={this.state.selectedIndex}
                    onSelect={index => this.setSelectedIndex(index)}
                    tabBarStyle={styles.tabBarStyle}
                    indicatorStyle={{ backgroundColor: 'black' }}
                >
                    <Tab title={TextProps => <Text style={styles.tabTextStyle}>Mediciones</Text>}>  
                        <View>
                            <View style={{flexDirection: 'column', alignItems: 'center', marginVertical: 4}}>
                                <Text style={styles.studentName}> Nombre: {name} </Text>
                                <Divider style={{ backgroundColor: 'black', width: '90%', height: 2}} />
                            </View>

                            <View style={{flexDirection: 'column', alignItems: 'center', marginVertical: 4}}>
                                {this.state.resultData === false &&
                                    <Spinner size='giant' />
                                } 
                            </View>

                            <ScrollView>
                            <View style={styles.tabContainer}>
                                {this.state.studentData.map((row, index) => (
                                    <View style={{paddingTop: '2%'}}>
                                    <Card key={index} cardColor={row.tipo === 0 ? "#EB851E" : "#F9C784"}>
                                        <View style={{ flexDirection: 'column'}}>

                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: '60%', paddingBottom: '1%' }}>
                                                    <Text style={styles.cardTextStyle}> Resultado: {row.res} cm</Text>
                                                </View>
                                                <View style={{ width: '40%', alignItems: 'flex-end' }}>
                                                    <Text style={styles.cardTextStyle}> {row.tipo === 0 ? "Vertical" : "Horizontal"}</Text>
                                                </View>
                                            </View>
                                            
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.cardTextStyle}> Fecha: {splitDate(row.date)}</Text>
                                            </View>

                                        </View>
                                    </Card>
                                    </View>
                                ))}
                            </View> 
                            <View style={{ paddingTop: 300 }}/>
                            </ScrollView>
                        </View>
                    </Tab>

                    <Tab title={TextProps => <Text style={styles.tabTextStyle}>Progreso</Text>}>
                        <View>
                            <View style={{ flexDirection: 'column', alignItems: 'center', marginVertical: 4 }}>
                                <Text style={styles.studentName}> Nombre: {name} </Text>
                                <Divider style={{ backgroundColor: 'black', width: '90%', height: 2 }} />
                            </View>

                            <View style={{flexDirection: 'column', alignItems: 'center', marginVertical: 4}}>
                                {this.state.plotData === false &&
                                    <Spinner size='giant' />
                                } 
                            </View>

                            <ScrollView>
                            <View style={styles.tabContainer}>
                                <View style={[stylesChart.rowView, {marginBottom: "5%"}]}>
                                    {this.LineChart_Dynamic("SaltoVert", this.state.dataSaltoVert, getXAxis(this.state.fechaSaltoVert))}
                                </View>

                                <View style={[stylesChart.rowView, {marginBottom: "5%"}]}>
                                    {this.LineChart_Dynamic("SaltoHor", this.state.dataSaltoHor, getXAxis(this.state.fechaSaltoHor))}
                                </View>
                            </View>
                            <View style={{ paddingTop: 300 }}/>
                            </ScrollView>
			            </View>
                    </Tab>
                </TabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E7E7E7",
        flexDirection: "column",
    },
    textStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        textTransform: "uppercase",
    },
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarStyle: {
        height: 50,
        backgroundColor: "#FF9933",
    },
    tabTextStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
    cardTextStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
    studentName:{
        paddingBottom: '2%',
        paddingTop: '2%',
        fontSize: 20, 
        fontWeight: "bold",  
        color: 'black'
    }
})


const stylesChart = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E7E7E7",
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: "column"
	},
	buttonStyle: {
		backgroundColor: "#FC7A1E",
		borderRadius: 10,
		padding: 5,
		margin: 20,
		height: 150,
		width: 150,
	},
	buttonStyle2: {
		backgroundColor: "#FC7A1E",
		borderRadius: 10,
		padding: 5,
		margin: 20,
		height: 50,
		width: 250,
	},
	imageStyle: {
		height: 100,
		width: 100,
	},
	imageStyle2: {
		height: 40,
		width: 40,
	},
	logosStyle:{
		height: 300,
		width: 300,
		marginTop:-80,
		marginBottom:-30
	},
	textStyle: {
		fontSize: 16,
		fontWeight: "bold",
		margin: 5,
		color: "black"
	},
	textStyle2: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
		color: "black"
	},
	buttonView: {
		justifyContent: 'center',
        alignItems: 'center'
	},
	buttonView2: {
		justifyContent: 'center',
        alignItems: 'center',
		flexDirection: "row"
	},
	rowView: {
		flexDirection: "row",
	}
});

export default HistorialGrupo;
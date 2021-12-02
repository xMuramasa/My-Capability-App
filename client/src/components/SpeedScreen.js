import React from "react";
import {
	Alert,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import RNLocation from "react-native-location";
import moment from "moment";

import GLOBAL from './global.js'

import addResult from "../API/addResult.js";
import getNewResults from "../API/getNewResults.js";
import updateUserScore from "../API/updateUserScore.js"

const haversine = require('haversine')

function updateScore(result){

	score = result * 330

	getNewResults(GLOBAL.user_id).then((data) => {
		data.forEach(element => {
			if (element.type != 1){

				console.log("result, type: ", element.result, element.type)
				
				score += element.result * 330
			}
		})
	})

	updateUserScore(GLOBAL.user_id, score).then(data => {
		console.log(data)
	});
}

function Timer({ interval }) {
	const pad = (n) => n < 10 ? '0' + n : n;
	const duration = moment.duration(interval)
	return (
		<Text style={styles.timer}>
			<Text style={styles.timer}>
				{pad(duration.minutes())}
			</Text> 
			:
			<Text style={styles.timer}>
				{pad(duration.seconds())}
			</Text> 
			:
			<Text style={{fontSize: 30}}>
				{pad(Math.floor(duration.milliseconds() / 10))}
			</Text>
		</Text>
	)
}

export default class Velocidad extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			vAct: null,
			speeds: [],
			start: 0,
			now: 0,
			location: null,
			locs: [],
			cals: 0,
			dist: 0
		};
	}

	componentDidMount() {
		RNLocation.configure({
			distanceFilter: 5.0,
			androidProvider: 'playServices',
			desiredAccuracy: {
				ios: 'best',
				android: 'highAccuracy'
			},
			interval: 100, // Milliseconds
			maxWaitTime: 100, // Milliseconds
		});

		RNLocation.requestPermission({
			ios: "whenInUse",
			android: {
				detail: "fine",
				rationale: {
					title: "Location permission",
					message: "We use your location to demo the library",
					buttonPositive: "OK",
					buttonNegative: "Cancel"
				}
			}
		}).then(granted => {
			if (granted) {
				this._startUpdatingLocation();
			}
		});
	}

	_startUpdatingLocation = async () => {
		this.locationSubscription = await RNLocation.subscribeToLocationUpdates(
			locations => {
				this.setState({ 
					location: locations[0],
					speeds: [...this.state.speeds, locations[0].speed],
					vAct: locations[0].speed *3.6,
					locs: [...this.state.locs, locations[0]]
				});
			}
		);
	};

	_stopUpdatingLocation = () => {
		this.locationSubscription && this.locationSubscription();
	};

	alertOnSpeed = (cals,d ) => {
		const sum = this.state.speeds.reduce((a, b) => a + b, 0);
		const avg = (sum / this.state.speeds.length) || 0;
		const spd = avg*3.6;
		const ds = d/1000;
		Alert.alert('Resultados', 
			"Velocidad Media del Recorrido: "+
			"\n" + spd.toFixed(2)+ " km/h")
			updateScore(spd)
			addResult(GLOBAL.user_id, spd, 1, '')
		this.setState({ 
			speed: 0,
	 	})
		
	}

	startRun = () => {
		const now = new Date().getTime();
		this.setState({
			start: now,
			now,
			speeds: []
		})
		this.clock = setInterval(() => {
			this.setState({
				now: new Date().getTime(),
			}), 100
		})
		this._startUpdatingLocation()
		
		this.setState({ running: true })

	}

	resetRun = () => {
		clearInterval(this.clock);
		this.setState({ 
			running: false,
			speeds: [],
			speed: 0,
			now: 0,
			start: 0,
		 })
		this.clock = null;
		this._stopUpdatingLocation(); 
	}

	calcCals = (w,h,a, d) =>{
		const {now, start} = this.state;
		const time = now-start;
		const duration = moment.duration(time);
		const xtime = duration.asHours();
		
		const bmrM = 13.397*w + 4.799*h - 5.677*a +88.362;
		const bmrF = 9.247*w + 3.098*h - 4.33*a+ 447.593;

		const cals = GLOBAL.sex == 1? bmrF * d /24 * xtime : bmrM * d /24 * xtime ;

		//console.log(cals);
		return (cals);
	}

	endRun = () => {
		const {locs} = this.state;
		clearInterval(this.clock);
		this.setState({ 
			speed: 0,
		})

		const l1 = {
			latitude: locs[0].latitude,
			longitude:  locs[0].longitude
		}

		const l2 = {
			latitude: locs[locs.length-1].latitude,
			longitude:  locs[locs.length-1].longitude
		}

		const dist = haversine(l1,l2, {unit:'meter'});

		const cals = this.calcCals(GLOBAL.weight, GLOBAL.h, GLOBAL.age, dist)

		this.clock = null;
		console.log(cals)
		this.alertOnSpeed(cals, dist);
		this._stopUpdatingLocation(); 
	}

	render() {
		const { location, running, vAct, now, start, speeds } = this.state;
		const timer = now - start;

		return (
			<ScrollView style={styles.container}>
				<SafeAreaView style={styles.innerContainer}>
					<View style={{ alignItems: "center", marginTop: 30 }}>
						<Text style={styles.title}>Medicion de Velocidad</Text>
					</View>
					
					<View style={styles.row}>
						<Text style={[styles.valueTitle, {fontSize: 24, paddingTop: '5%'}]}>
							Tiempo de Recorrido:
						</Text>
					</View>
					<View>
						<Timer interval={timer} />
					</View>
					
					<View style={styles.row}>
						{ !running &&
							<TouchableOpacity
								onPress={this.startRun}
								style={[styles.button, { backgroundColor: "#FF9933" }]}
							>
								<Text style={styles.buttonText}>Inicio</Text>
							</TouchableOpacity>
						}
						{ speeds.length > 0 && running &&
							<View style={styles.row}>
								<TouchableOpacity
									onPress={this.endRun}
									style={[styles.button, {marginHorizontal: '3%', backgroundColor: "#881717" }]}
								>
									<Text style={styles.buttonText}>Fin</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={this.resetRun}
									style={[styles.button, {marginHorizontal: '3%', backgroundColor: "#808080" }]}
								>
									<Text style={styles.buttonText}>Reiniciar</Text>
								</TouchableOpacity>
							</View>
						}
					</View>
				</SafeAreaView>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E7E7E7"
	},
	innerContainer: {
		marginVertical: 30
	},
	timer: {
		color: 'black',
		fontSize: 45,
		fontWeight: '200',
		textAlign: "center",
	},
	title: {
		textAlign: "center",
		color: "black",
		fontSize: 30,
		fontWeight: "bold"
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: '10%',
		marginBottom: '10%'
	},
	button: {
		flex: 1,
		marginHorizontal: '24%',
		marginTop: '20%',
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		padding: 25
	},
	buttonText: {
		fontSize: 30,
		color: "#FFFFFF"
	},
	valueTitle: {
		color: 'black',
		fontSize: 30,
		textAlign:'center',
		fontWeight: "bold"
	},
});

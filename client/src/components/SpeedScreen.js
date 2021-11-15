import React from "react";
import {
	Alert,
	Linking,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import RNLocation from "react-native-location";
import moment from "moment";


function Timer({ interval }) {
	const pad = (n) => n <10 ? '0' + n : n;
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
			location: null
		};
		this.timer = null;
	}

	componentDidMount() {
		RNLocation.configure({
			distanceFilter: 5.0,
			androidProvider: 'playServices',
			desiredAccuracy: {
				ios: 'best',
				android: 'highAccuracy'
			},
			interval: 1000, // Milliseconds
			maxWaitTime: 1000, // Milliseconds
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

	_startUpdatingLocation = () => {
		this.locationSubscription = RNLocation.subscribeToLocationUpdates(
			locations => {
				this.setState({ 
					location: locations[0],
					speeds: [...this.state.speeds, locations[0].speed],
					vAct: locations[0].speed *3.6
				});
			}
		);
	};

	_stopUpdatingLocation = () => {
		this.locationSubscription && this.locationSubscription();
	};

	alertOnSpeed = () => {
		const sum = this.state.speeds.reduce((a, b) => a + b, 0);
		const avg = (sum / this.state.speeds.length) || 0;
		const spd = avg*3.6;
		Alert.alert('Resultados', 
			"Velocidad Media del Recorrido: "+
			"\n" + spd.toFixed(2)+ " km/h")
		// addResult(GLOBAL.user_id, spd, 1, '')
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

		this.timer = setInterval(() => {
			this.setState({
				now: new Date().getTime()
			}), 100
		})

		this._startUpdatingLocation()
		
		this.setState({ running: true })

	}

	resetRun = () => {
		clearInterval(this.timer);
		this.setState({ 
			running: false,
			speeds: [],
			speed: 0,
			now: 0,
			start: 0,
			timer: null
	 	})
		this._stopUpdatingLocation(); 
	}

	endRun = () => {
		clearInterval(this.timer);
		this.setState({ 
			speed: 0,
			now: 0,
			start: 0,
			timer: null
	 	})
		this.alertOnSpeed();
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

						<Text style={{textAlign: 'center', fontSize:20, padding: '5%'}}>
							Tu Velocidad Actual es: {running ? vAct.toFixed(2) : 0} Km/h
						</Text>
					</View>
					
					<View style={styles.row}>
						{ !running &&
							<TouchableOpacity
								onPress={this.startRun}
								style={[styles.button, { backgroundColor: "#126312" }]}
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
		backgroundColor: "#CCCCCC"
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

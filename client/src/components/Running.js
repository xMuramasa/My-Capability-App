import React, { StyleSheet } from "react";

import MapView, { Polyline, PROVIDER_GOOGLE, Marker, AnimatedRegion, Animated} from 'react-native-maps';
import RNLocation from 'react-native-location';

import { Alert, View } from 'react-native';
import { Button, Text, Icon } from 'react-native-paper';
import mapStyles from "../styles/mapStyles.js";
import mapStylo from "../styles/mapStylo.js";
import GLOBAL from './global.js'
import moment from "moment";

const haversine = require('haversine')
const permissions = {
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
};

function Timer( interval ) {
	const pad = (n) => n <10 ? '0' + n : n;
	const duration = moment.duration(interval)
	return (
		<Text style={mapStyles.timer}>
			<Text style={mapStyles.timer}>
				{pad(duration.minutes())}
			</Text> 
			:
			<Text style={mapStyles.timer}>
				{pad(duration.seconds())}
			</Text> 
			:
			<Text style={{fontSize: 30}}>
				{pad(Math.floor(duration.milliseconds() / 10))}
			</Text>
		</Text>
	)
}

export default class Running extends React.Component {
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
			dist: 0,
			reg: {
				latitude: 0.01,
				longitude: -0.01,
				latitudeDelta: 0.001,
				longitudeDelta: 0.001},
			coord: [],
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

		RNLocation.requestPermission(permissions).then(granted => {
			if (granted) {
				this.getLocation();
			}
		});
	}

	getLocation = () =>{
		RNLocation.requestPermission(permissions).then(async granted => {
			if (granted) {
				const loc = await RNLocation.getLatestLocation({timeout:100});
				// console.log(loc)
				this.setState({
					reg:{
						latitude: loc.latitude,
						longitude: loc.longitude,
						latitudeDelta: 0.001,
						longitudeDelta: 0.001
					},
					coord: []
				})
			}
		});
	}

	_startUpdatingLocation = async () => {
		this.locationSubscription = await RNLocation.subscribeToLocationUpdates(
			locations => {
				const r = {
					latitude: locations[0].latitude,
					longitude: locations[0].longitude,
					latitudeDelta: 0.001,
					longitudeDelta: 0.001
				}
				this.setState({ 
					location: locations[0],
					speeds: [...this.state.speeds, locations[0].speed],
					vAct: locations[0].speed *3.6,
					locs: [...this.state.locs, locations[0]],
					reg: r,
					// coord: [...this.state.coord, r]
				});
			}
		);
	};

	_stopUpdatingLocation = () => {
		this.locationSubscription && this.locationSubscription();
	};

	startRun = () => {
		RNLocation.requestPermission(permissions).then(granted => {
			if (granted) {
				// this.getLocation();
				this._startUpdatingLocation();
			}
		});

		const now = new Date().getTime();
		this.setState({
			start: now,
			now,
			speeds: [],
			coord: []
		})
		this.clock = setInterval(() => {
			this.setState({
				now: new Date().getTime(),
			}), 100
		})
		
		RNLocation.requestPermission(permissions).then(granted => {
			if (granted) {
				this._startUpdatingLocation();
			}
		});
		
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
		this.alertOnSpeed(cals, dist);
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
		this.setState({cals: cals})
		//console.log(cals);
		return (cals);
	}

	alertOnSpeed = (dist, cals) => {
		const {speeds, now, start } = this.state;
		const sum = speeds.reduce((a, b) => a + b, 0);
		const avg = (sum / speeds.length) || 0;
		const spd = avg*3.6;
		const ds = dist/1000;
		const t = moment.duration(now-start);
		Alert.alert('Resultados', 
			"Distancia Recorrida: "+
			"\n" + ds.toFixed(2)+ " km" + '\n' +
			"Velocidad Media del Recorrido: "+
			"\n" + spd.toFixed(2)+ " km/h" + '\n' +
			"Calorias quemadas:"+'\n'+
			cals.toFixed(2)+'\n'+
			"Tiempo empleado:"+'\n'+
			t.hours()+'h '+t.minutes()+'min '+t.seconds()+'s')
		// addResult(GLOBAL.user_id, spd, 1, '')
	}

	onRegionChangeComplete = (region) => {
		
		const newLatLong = {
			latitude: region.latitude,
			longitude: region.longitude,
		}
		if(this.state.running){
			if (region.latitude !== 0){
				this.setState({
					coord: [...this.state.coord, newLatLong]
				})
			}
		}
	}

	render(){
		const {reg, coord, now, start, running, speeds, vAct} = this.state;
		const timer = now-start;
		return (
			<View style={ mapStyles.container }>
					
				<Text style={mapStyles.headerStyle}>Compañero de Trote {"\n"}</Text>
				<View style={mapStyles.dividerStyle}/> 
				<View style={mapStyles.space} />
			
				<View style={{ padding: 10, flex: 1}}>
					<MapView
							provider={PROVIDER_GOOGLE} showsUserLocation={true}
							showsMyLocationButton={false}
							customMapStyle={mapStylo} style={{flex: 1}}
							onRegionChangeComplete={this.onRegionChangeComplete}
							region={reg}
					>
						<Polyline
							coordinates={coord}
							strokeColor="#FF0000"
							strokeWidth={10}
						/>
					</MapView>
					<View style={mapStyles.buttonInsideMap}>
						<Button 
							icon="map-marker"
							color='black' 
							mode='outlined' 
							onPress={this.getLocation}
							style={mapStyles.button2}
						>
							<Text>Mi Posición</Text>
						</Button>
					</View>
					<View style={mapStyles.space} />
					<View style={mapStyles.space} />
					<View style={mapStyles.dividerStyle}/>
				</View>
				<View style={mapStyles.space} />

				<Text style={mapStyles.headerStyle}>Recorrido {"\n"}</Text>

				<Timer interval={timer} />

				<View style={mapStyles.rowView2}>
					<View>
						<Button
							style={mapStyles.button}
							icon='map-marker-path' 
							color='black' 
							mode='outlined' 
							onPress={this.startRun}
							labelStyle={{fontSize: 25}}
						>
							<Text style={mapStyles.textStyle}> Iniciar</Text>
						</Button>
					</View>
					<View>
						<Button 
							style={mapStyles.button}
							icon='stop-circle' 
							color='black' 
							mode='outlined' 
							onPress={this.endRun}
							labelStyle={{fontSize: 25}}
						>
							<Text style={mapStyles.textStyle}> Finalizar</Text>

						</Button>
					</View>
				</View>  
				
				<View style={mapStyles.space} />

				<View style={mapStyles.container}>
					{ running ?
						<Text style={mapStyles.subLabel}>Distancia Recorrida: {()=>{vAct.toFixed(2)}} Km</Text>
						:
						<Text style={mapStyles.subLabel}>Inicia un recorrido para saber tu distancia recorrida</Text>
					}

					{ running ?
						<Text style={mapStyles.subLabel}>Calorias Quemadas: {()=>{cals.toFixed(2)}} Km/h</Text>
						:
						<Text style={mapStyles.subLabel}>
							Inicia y termina un recorrido para saber cuantas calorías quemaste
						</Text>
					}
				</View>
			</View>    
		);
	}
}

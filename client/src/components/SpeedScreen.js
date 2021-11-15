import React, { useState, TouchableOpacity, Image, useEffect, useRef } from "react";

import MapView, { Polyline, PROVIDER_GOOGLE, Marker, AnimatedRegion, Animated} from 'react-native-maps';
import RNLocation from 'react-native-location';

import { Alert, View } from 'react-native';
import { Button, Text, Icon } from 'react-native-paper';
import mapStyles from "../styles/mapStyles.js";
import mapStylo from "../styles/mapStylo.js";
import addResult from "../API/addResult.js";
import GLOBAL from './global.js'
 
RNLocation.configure({
	distanceFilter: 5.0,
	androidProvider: 'playServices',
	desiredAccuracy:{
	ios:'best',
	android: 'balancedPowerAccuracy'},
})

export function SpeedScreen() {

	const [velocidad, setVelocidad] = useState(0);
	const [velocidades, setVelocidades] = useState([]);
	const [accu,setAccu] = useState(0)
	const [accus,setAccus]=useState([])

	const [coord, setCoord] = useState([])

	const [reg, setReg] = useState({
		latitude: 51.5079145,
		longitude: -0.0899163,
		latitudeDelta: 0.001,
		longitudeDelta: 0.001
	});

	const [runStop, setRunStop] = useState(false);

	const getLocation = async (running) => {
		let permission = await RNLocation.checkPermission({
			ios: 'whenInUse', // or 'always'
			android: {
			detail: 'fine' // or 'fine'
			}
		});

		let location;
		if(!permission) {
			permission = await RNLocation.requestPermission({
			ios: "whenInUse",
			android: {
				detail: "fine",
				rationale: {
					title: "We need to access your location",
					message: "We use your location to show where you are on the map",
					buttonPositive: "OK",
					buttonNegative: "Cancel"
					}
			}})
		} 
		location = await RNLocation.getLatestLocation({timeout: 100})
		//console.log(location)

		if(!running){
			setRunStop(true)
		}
	
		setReg({
			latitude: location.latitude,
			longitude: location.longitude,
			latitudeDelta: 0.001,
			longitudeDelta: 0.001
		})
		setVelocidad(location.speed)
		setAccu(location.accuracy)   
	}

	const [time, setTime] = useState(0);
	const timer = useRef(null);

	const startRun = () => {
		setCoord([]);
		
		setVelocidad(0);
		setVelocidades([]);
		setAccu(0);
		setAccus([]);
		
		setRunStop(false);

		if (!timer.current) {
			timer.current = setInterval(() => {
				setTime(currentTime => currentTime + 1);
				getLocation(true);
			}, 1000);
		} 
	};

	const stopRun = () => {
		setRunStop(true);
		if (timer.current) {
			clearInterval(timer.current);
			timer.current = null;
			setTime(0);
		}
		calculateAvg(velocidades, accus);
	}  

	const onRegionChangeComplete = (region) => {
		setReg(region);

		const newLatLong = {
			latitude: reg.latitude,
			longitude: reg.longitude,
		}
		if(!runStop){
			if (reg.latitude !== 0){
				setCoord(coord =>[
					...coord,
					newLatLong
				])
				setVelocidades(velocidades => [...velocidades, velocidad])
				setAccus(accus => [...accus,accu])
			}
		}
	}

	const calculateAvg = (v, a) => {
		let avg = (array) => array.reduce((a,b)=> a+b)/array.length
		let vx = (avg(v) * 3.6).toFixed(2) 
		let ax = (avg(a)* 3.6).toFixed(2)
		if (vx > 0){
			addResult(GLOBAL.user_id, vx, 1)
		}
		console.log(vx, ax)
		Alert.alert('Resultados', 
			"Velocidad Media: " + vx.toString() + 
			" km/h\nPrecisión: " + ax.toString() + " km/h")
	}

	
	return (
			<View style={ mapStyles.container }>
					
					<Text style={styles.headerStyle}>Medir Velocidad {"\n"}</Text>
					<View style={styles.dividerStyle}/> 
					<View style={mapStyles.space} />
			
				<View style={{ padding: 10, flex: 1}}>
					<View style={{ flex: 1 }}>
						<MapView
								provider={PROVIDER_GOOGLE} showsUserLocation={true}
								showsMyLocationButton={false}
								customMapStyle={mapStylo} style={{flex: 1}}

								onRegionChangeComplete={onRegionChangeComplete}
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
									onPress={() => {getLocation(false);}}
									
									style={mapStyles.button2}>
										<Text>Mi Posición</Text>
									</Button>
							</View>
							<View style={mapStyles.space} />
						</View>
							
					<View style={mapStyles.space} />
					<View style={styles.dividerStyle}/>
					
				</View>
				<View style={mapStyles.space} />

					<Text style={styles.headerStyle}>Medición {"\n"}</Text>

					<View style={mapStyles.rowView2}>
						<View>
							<Button
								style={styles.button}
								icon='map-marker-path' 
								color='black' 
								mode='outlined' 
								onPress={startRun}
								labelStyle={{fontSize: 25}}
							>
								<Text style={styles.textStyle}> Iniciar</Text>
							</Button>
						</View>
						<View>
							<Button 
								style={styles.button}
								icon='stop-circle' 
								color='black' 
								mode='outlined' 
								onPress={stopRun}
								labelStyle={{fontSize: 25}}
							>
								<Text style={styles.textStyle}> Finalizar</Text>

							</Button>
						</View>
					</View>  
					<View style={mapStyles.space} />

					
					<View style={mapStyles.container}>
					{
						runStop ?
						<Text style={mapStyles.subLabel}>Velocidad Actual: {velocidad.toFixed(2)} Km/h</Text>
						:
						<Text style={mapStyles.subLabel}>Inicia una medición para saber tu velocidad</Text>
					}
					</View>
			</View>    
		);
}
/*
<View style={mapStyles.row}>
			
		
			<Button
				icon='run'
				mode='outlined' onPress={() => {calculateAvg(velocidades, accus);}}
				style={mapStyles.button}>
					Velocidad
			</Button>
		</View>
*/
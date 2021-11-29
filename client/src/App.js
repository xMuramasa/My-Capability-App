import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Running from './components/Running';
import Velocidad from './components/SpeedScreen';

import Login from './components/Login';
import SignUp from './components/SignUp';
import HomeScreen from './components/HomeScreen';
import Mediciones from './components/Mediciones.js';
import HistorialIndividual from './components/HistorialIndividual.js'
import Historiales from './components/Historiales.js';
import Perfil from './components/Perfil.js';
import { Calentamiento } from './components/Calentamiento'
import { CalentamientoVelocidad } from './components/CalentamientoVelocidad'
import { CalentamientoTrote } from './components/CalentamientoTrote'
import { CalentamientoVertical } from './components/CalentamientoVertical'
import { CalentamientoHorizontal } from './components/CalentamientoHorizontal'
import Graficos from './components/Graficos';

import TutorialVelocidad from './components/TutorialVelocidad';
import TutorialTrote from './components/TutorialTrote';
import TutorialVertical from './components/TutorialVertical';
import TutorialHorizontal from './components/TutorialHorizontal';

import Consejos from './components/Consejos';
import ConsejosN from './components/ConsejosNutricion';
import ConsejosF from './components/ConsejosFisicos';
import MejorarSalto from './components/MejorarSalto';
import MejorarVelocidad from './components/MejorarVelocidad';

const Stack = createStackNavigator();


export default function App() {
	return (

		<NavigationContainer>

			< Stack.Navigator initialRouteName = "Iniciar sesion" >
			{/* < Stack.Navigator initialRouteName = "Velocidad" > */}
				<Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Iniciar sesion" component={Login} options={{ headerShown: false }} />
				<Stack.Screen name="Registrarse" component={SignUp} />
				<Stack.Screen name="Velocidad" component={Velocidad} />
				<Stack.Screen name="Running" component={Running} options={{ headerShown: false }} />
				<Stack.Screen name="Mediciones" component={Mediciones} options={{ headerShown: false }}/>
				<Stack.Screen name="Historiales" component={Historiales} options={{ headerShown: false }} />
				<Stack.Screen name="HistorialIndividual" component={HistorialIndividual} />
				<Stack.Screen name="Graficos" component={Graficos} />
				<Stack.Screen name="Perfil" component={Perfil} />
				<Stack.Screen name="Calentamiento" component={Calentamiento} options={{ headerShown: false }}/>
				<Stack.Screen name="Consejos" component={Consejos} options={{ headerShown: false }}/>
				<Stack.Screen name="ConsejosN" component={ConsejosN}options={{ headerShown: false }} />
				<Stack.Screen name="ConsejosF" component={ConsejosF}options={{ headerShown: false }} />
				<Stack.Screen name="MejorarSalto" component={MejorarSalto} options={{ headerShown: false }} />
				<Stack.Screen name="MejorarVelocidad" component={MejorarVelocidad} options={{ headerShown: false }} />
				<Stack.Screen name="CalentamientoVertical" component={CalentamientoVertical} options={{ headerShown: false }}/>
				<Stack.Screen name="CalentamientoTrote" component={CalentamientoTrote} options={{ headerShown: false }}/>
				<Stack.Screen name="CalentamientoVelocidad" component={CalentamientoVelocidad} options={{ headerShown: false }}/>
				<Stack.Screen name="CalentamientoHorizontal" component={CalentamientoHorizontal} options={{ headerShown: false }}/>
				<Stack.Screen name="TutorialVertical" component={TutorialVertical} options={{ headerShown: false }}/>
				<Stack.Screen name="TutorialHorizontal" component={TutorialHorizontal} options={{ headerShown: false }}/>
				<Stack.Screen name="TutorialVelocidad" component={TutorialVelocidad} options={{ headerShown: false }}/>
				<Stack.Screen name="TutorialTrote" component={TutorialTrote} options={{ headerShown: false }}/>
			</Stack.Navigator>

		</NavigationContainer>
	);
}

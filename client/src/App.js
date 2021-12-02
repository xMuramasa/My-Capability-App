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

import Ranking from './components/Ranking.js';

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
import Planificacion from './components/Planificacion';

import MedicionGrupal from './components/MedicionGrupal';
import HistorialGrupo from './components/HistorialGrupo';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const Stack = createStackNavigator();

const options = {
	title: '',
	headerStyle: {
		backgroundColor: '#E7E7E7'
	}
}

export default function App() {
	return (
		<>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.light}>
		<NavigationContainer>

			< Stack.Navigator initialRouteName = "Iniciar sesion" screenOptions={options} >
			{/* < Stack.Navigator initialRouteName = "Velocidad" > */}
				<Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false}} />
				<Stack.Screen name="Iniciar sesion" component={Login} options={{ headerShown: false}}/>
				<Stack.Screen name="Registrarse" component={SignUp}  />
		
				<Stack.Screen name="Mediciones" component={Mediciones} options={{title: 'Medir'}}/>
				<Stack.Screen name="Velocidad" component={Velocidad}  />
				<Stack.Screen name="Running" component={Running}  />
				
				<Stack.Screen name="Historiales" component={Historiales}  options={{title: 'Mi Historial'}}/>
				<Stack.Screen name="HistorialIndividual" component={HistorialIndividual} options={{title: 'Mis Resultados'}}/>
				<Stack.Screen name="Graficos" component={Graficos} />
				<Stack.Screen name="Ranking" component={Ranking} options={{title: 'Ranking MyCapability'}}/>

				<Stack.Screen name="Perfil" component={Perfil} options={{title: 'Mi Perfil'}}/>
				<Stack.Screen name="Calentamiento" component={Calentamiento} />

				<Stack.Screen name="Consejos" component={Consejos} />
				<Stack.Screen name="ConsejosN" component={ConsejosN} />
				<Stack.Screen name="ConsejosF" component={ConsejosF} />
				<Stack.Screen name="MejorarSalto" component={MejorarSalto}  />
				<Stack.Screen name="MejorarVelocidad" component={MejorarVelocidad}  />

				<Stack.Screen name="CalentamientoVertical" component={CalentamientoVertical} />
				<Stack.Screen name="CalentamientoTrote" component={CalentamientoTrote} />
				<Stack.Screen name="CalentamientoVelocidad" component={CalentamientoVelocidad} />
				<Stack.Screen name="CalentamientoHorizontal" component={CalentamientoHorizontal} />

				<Stack.Screen name="TutorialVertical" component={TutorialVertical} />
				<Stack.Screen name="TutorialHorizontal" component={TutorialHorizontal} />
				<Stack.Screen name="TutorialVelocidad" component={TutorialVelocidad} />
				<Stack.Screen name="TutorialTrote" component={TutorialTrote} />

				<Stack.Screen name="Planificacion" component={Planificacion}  options={{title:'Planificador de Rutinas'}}/>
				
				<Stack.Screen name="MedicionGrupal" component={MedicionGrupal} />
				<Stack.Screen name="HistorialGrupo" component={HistorialGrupo} />
			</Stack.Navigator>

		</NavigationContainer>
		</ApplicationProvider>
		</>
	);
}

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {LocaleConfig} from 'react-native-calendars';
import { Select, SelectItem, Divider, Icon } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';

import GLOBAL from "./global";

//API
import addCalendar from "../API/addCalendar";
import getRoutinesById from "../API/getRoutinesById";
import getCalendarById from "../API/getCalendarById";

LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb.','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['D','L','Ma','Mi','J','V','S'],
  today: 'Hoy'
};  
LocaleConfig.defaultLocale = 'es';

splitDate = (d) => {
	// 2021-07-21T00:00
	var f = d.slice(0, 16).split("T")[0]; //fecha
	var f2 = f
	return f2;
}

class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myDates: {},
            myColor: "",
            rutinas: [],
            calendario: [],
            checked: null,
            selectedIndex: 0,
            routineSelected: false,
            selectedValue: "Seleciona una rutina",
            rutina_id: null
        };
    }

    async componentDidMount() {
        this.getCalendar()
    }

    async getCalendar(){
        try {
            let calendar = {}
            let ruts = {}
            getRoutinesById(GLOBAL.user_id).then((results) => {
                results.forEach(element => {
                    ruts[element.id] = element.color
                })
                this.setState({ rutinas: results })
            })
            getCalendarById(GLOBAL.user_id).then((results) => {
                results.forEach(element => {
                    let date = splitDate(element.date)
                    let idx = element.routine_id
                    if (!(date in calendar)){
                        calendar[date] = {dots: [{ color: ruts[idx] }], selected: false}
                    } 
                    else{
                        calendar[date].dots.push({ color: ruts[idx]})
                    }
                });
                this.setState({ myDates: calendar })
            })
        } catch (err) {
            console.error(err);
        }
    }

    addDates = (day) => {
        if (this.state.routineSelected){
            addCalendar(GLOBAL.user_id, this.state.rutina_id, day.dateString)
            this.getCalendar()
        }
    }

    setSelectedIndex = (index) => {
        let pos = index.row
        let r = this.state.rutinas[pos]
        this.setState({ selectedIndex: index})
        this.setState({ rutina_id: r.id })
        this.setState({ selectedValue: r.routine})
        this.setState({ routineSelected: true })
    }

    render() {
        const markedDates= {
            '2021-12-25': { dots: [{ key: 'rutina 1', color: 'red' }, { color: 'blue' }, { color: 'green' }], selected: false },
            '2021-12-26': { dots: [{ color: 'green' }, { color: 'red' }] }
        }
        return (
            <View style={styles.container}>
                <View style={{paddingTop: '2%'}}>
                    <View style={{alignItems: 'center'}}>

                        <View style={{flexDirection: 'column', alignItems: 'center', padding: '1%'}}>
                            <Text style={styles.headerStyle}> Al seleccionar una rutina, </Text>
                             <Text style={styles.headerStyle}> marca un día en el calendario</Text>
                            <Divider style={{ backgroundColor: 'black', width: '90%', height: 2}} />
                        </View>

                        <View style={styles.selectView}>
                            <Select
                                selectedIndex={this.state.selectedIndex}
                                value={(TextProps) => 
                                    <Text style={{ marginVertical: 5, fontSize: 20, color: 'black' }}> {this.state.selectedValue} </Text>
                                }
                                onSelect={index => this.setSelectedIndex(index)}
                                size='large'
                            >
                                {this.state.rutinas.map((row, index) => ( 
                                    <SelectItem
                                        key = {index}
                                        title={(TextProps) => 
                                            <Text style={{ color: 'black', fontWeight: "bold"}}> {row.routine} </Text>
                                        }
                                        accessoryRight={<Icon style={{ width: 50, height: 50 }} fill={row.color} name='droplet'/>}
                                    />    
                                ))}
                            </Select>
                        </View>
                    </View>
                    
                    <View style={{paddingTop: '5%'}}>
                        <Calendar
                            minDate={'2021-01-01'}
                            markingType={'multi-dot'}
                            firstDay={1}
                            enableSwipeMonths={true}
                            // Handler which gets executed on day press. Default = undefined
                            onDayPress={(day) => { this.addDates(day) }}
                            markedDates={this.state.myDates}
                            theme={{
                                todayTextColor:"#FF9933",
                                textDayFontSize: 18,
                                textMonthFontSize: 20,
                                textDayHeaderFontSize: 18
                            }} 
                        />
                    </View>


                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E7E7E7",
        flexDirection: "column",
    },
    buttonStyle: {
        backgroundColor: "#FF9933",
        borderRadius: 10,
        padding: 5,
        margin: 20,
        height: 50,
        width: 150,
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 5,
        color: "black",
        textTransform: "uppercase",
    },
    modalButton: {
        flexDirection: "row",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: "5%",
        backgroundColor: "#008080",
        color: "#ffffff",
        height: 40,
        width: "100%"
    },
    modalButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    },
    selectView: {
        width: "95%",
        borderRadius: 4, 
        margin: 1.5, 
        padding: 1.5, 
        backgroundColor: '#FF9933', 
        marginBottom: '3%', 
        marginTop: '3%',
        justifyContent: "center",
    },
    headerStyle:{
        fontSize: 18, 
        fontWeight: "bold",  
        textAlign: "center",
        color: 'black'
    },
});

export default Calendario;
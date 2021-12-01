import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {LocaleConfig} from 'react-native-calendars';
import { Select, SelectItem, Divider, Icon } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';

import GLOBAL from "./global";

//API
import getRoutinesById from "../API/getRoutinesById";

LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb.','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['D','L','Ma','Mi','J','V','S'],
  today: 'Hoy'
};  
LocaleConfig.defaultLocale = 'es';


class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            touch: false,
            myDates: {},
            myColor: "",
            rutinas: [],
            checkList: new Array(3).fill(false),
            checked: null,
            selectedIndex: 0,
            selectedValue: "Seleciona una rutina",
        };
    }

    async componentDidMount() {
        try {
            getRoutinesById(GLOBAL.user_id).then((results) => {
                this.setState({ rutinas: results })
                //this.setState({ group_ids: g_ids.reverse()})
            })
        } catch (err) {
            console.error(err);
        }
    }

    addDates = (day) => {
        if(this.state.touch){
            //console.log(day.dateString)
            let newDates = this.state.myDates
            newDates[day.dateString] = { selected: true, marked: true, selectedColor: this.state.myColor }
            
            this.setState({ myDates: newDates})
            //console.log("update", this.state.myDates)
        }
    }

    changeRutina = (pos) => {
        let r = Object.entries(this.state.rutinas)
        this.setState({ myColor: r[pos][1], touch: true})
    }

    setSelectedIndex = (index) => {
        let r = Object.entries(this.state.rutinas)
        let pos = index.row
        this.setState({ selectedIndex: index})
        this.setState({ myColor: r[pos][1], touch: true})
        this.setState({ selectedValue: "Rutina " + pos})
    }

    render() {
        const markedDates= {
            '2021-12-25': { dots: [{ key: 'rutina 1', color: 'red' }, { color: 'blue' }, { color: 'green' }], selected: true, selectedColor: '#50cebb' },
            '2021-12-26': { dots: [{ color: 'green' }, { color: 'red' }], disabled: true }
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
                            markedDates={markedDates}
                            disableAllTouchEventsForInactiveDays={true}
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
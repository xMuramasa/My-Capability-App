import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb.','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['Dom','Lun','Mar','Mi','Jue','Vie','Sáb'],
  today: 'Hoy'
};  
LocaleConfig.defaultLocale = 'es';


class Planificacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myDates: {},
        };
    }

    addDates = (day) => {
        console.log("func")
        console.log(day.dateString)
        let newDates = this.state.myDates
        newDates[day.dateString] = { selected: true, marked: true, selectedColor: '#FF9933' }
        this.setState({ myDates: newDates})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{paddingTop: '10%'}}>
                    <Calendar
                        minDate={'2021-01-01'}
                        firstDay={1}
                        enableSwipeMonths={true}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => { { console.log('selected day', day), this.addDates(day)} }}
                        markedDates={this.state.myDates}
                    />
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

});

export default Planificacion;
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {LocaleConfig} from 'react-native-calendars';
import { CheckBox } from 'react-native-elements'

LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb.','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['D','L','Ma','Mi','J','V','S'],
  today: 'Hoy'
};  
LocaleConfig.defaultLocale = 'es';


class Planificacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            touch: false,
            myDates: {},
            myColor: "",
            rutinas: {r1:"red", r2:"blue", r3:"green"},
            checkList: new Array(3).fill(false),
            checked: null
        };
    }

    addDates = (day) => {
        if(this.state.touch){
            console.log(day.dateString)
            let newDates = this.state.myDates
            newDates[day.dateString] = { selected: true, marked: true, selectedColor: this.state.myColor }
            this.setState({ myDates: newDates})
            console.log("update", this.state.myDates)
        }
    }

    changeRutina = (pos) => {
        let r = Object.entries(this.state.rutinas)
        this.setState({ myColor: r[pos][1], touch: true})
    }

    onCheck = (index) => {
        let newCheckList = new Array(Object.entries(this.state.rutinas).length).fill(false)
        newCheckList[index] = true
        this.setState({ checkList: newCheckList })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{paddingTop: '10%'}}>
                    <Calendar
                        minDate={'2021-01-01'}
                        markingType={'multi-dot'}
                        firstDay={1}
                        enableSwipeMonths={true}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => { console.log('selected day', day), this.addDates(day) }}
                        markedDates={this.state.myDates}
                        disableAllTouchEventsForInactiveDays={true}
                        theme={{
                            todayTextColor:"#FF9933",
                            textDayFontSize: 18,
                            textMonthFontSize: 20,
                            textDayHeaderFontSize: 18
                        }} 
                    />
                    
                    {this.state.checkList.map((row, index) => (
                        <CheckBox
                            key={index}
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                            left
                            title={<Text style={{ color: 'black', fontWeight: "bold", }}> Rutina {index} </Text>}
                            checkedColor='#FF9933'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.checkList[index]}
                            onPress={() => {this.onCheck(index), this.changeRutina(index)}}
                        />
                    ))}

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

});

export default Planificacion;
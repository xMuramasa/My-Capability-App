import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Tab, TabView, Select } from '@ui-kitten/components';
import Calendario from "./Calendario"
import Rutinas from "./Rutinas"

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

class Planificacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        };
    }

    setSelectedIndex = (index) => {
        this.setState({ selectedIndex: index})
    }

    render() {
        const shouldLoadComponent = (index) => index === this.state.selectedIndex;

        return (
            <View style={styles.container}>                
                <View>
                    <TabView
                        selectedIndex={this.state.selectedIndex}
                        onSelect={index => this.setSelectedIndex(index)}
                        tabBarStyle={styles.tabBarStyle}
                        indicatorStyle={{ backgroundColor: 'black' }}
                    >
                        <Tab title={textProps => <Text style={styles.tabTextStyle}> Calendario </Text>}> 
                            <View></View>
                        </Tab>           
                        <Tab title={textProps => <Text style={styles.tabTextStyle}> Rutinas </Text>}>
                            <View></View>
                        </Tab>
                    </TabView>           
                </View>  

                {this.state.selectedIndex === 0 ? <Calendario /> : null}

                {this.state.selectedIndex === 1 ? <Rutinas /> : null}
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
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarStyle: {
        height: 50,
        backgroundColor: "#FF9933",
    },
    tabTextStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        textTransform: "uppercase",
    },

});

export default Planificacion;
import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  Animated,
  useWindowDimensions,
  StyleSheet,
  Modal, 
  Text, 
  TouchableOpacity,
  Image,
  View 
} from "react-native";

import  MyCarousel from './MyCarousel';

export function CalentamientoHorizontal ({route, navigation}) {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalImages, setModalImages] = useState(0);
  
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();
  
  return (
    <View style={styles.container3}>
      <View>
          <Text style={styles.headerStyle}>Medición Salto Horizontal{"\n"}</Text>
          <View style={styles.dividerStyle}/> 
      </View>
      <View style={styles.container}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            
            
            <SafeAreaView style={styles.container2}>
              <View style={styles.scrollContainer}>
                
                <MyCarousel type={modalImages}/>

              </View>
            </SafeAreaView> 
              <View style={styles.rowView}>
                <View>
                    <TouchableOpacity 
                        style={styles.buttonStyle2}
                        onPress={() => {setModalVisible(!modalVisible),navigation.navigate('TutorialHorizontal')}
                        }
                    >
                        <View style={styles.buttonView2}>
                            <Image style={styles.imageStyle2} source={require("../images/patras.png")} />
                            <Text style={styles.textStyle}>Atrás </Text>
                        </View>
                    </TouchableOpacity>
                </View>
              </View> 
            </View>
          </View>
        </Modal>
        
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7E7E7",
    flexDirection: "column",
    alignItems:'center',
    justifyContent:'center'    
  },
  container3: {
    flex: 1,
    backgroundColor: "#E7E7E7",
    flexDirection: "column",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'column',
  },
  scrollContainer: {
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    backgroundColor: "#FF9933",
		borderRadius: 10,
		padding: 5,
		margin: 20,
		height: '10%',
		width: '30%',
  },
  buttonOpen: {
    backgroundColor: "#FF9933",
  },
  buttonClose: {
    backgroundColor: "#FF9933",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  rowView: {
		flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -10
	},
  rowView2: {
		flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:"40%"
	},
  buttonView2: {
		justifyContent: 'center',
    alignItems: 'center',
		flexDirection: "row",
	},
  imageStyle2: {
		height: 35,
		width: 35,
	},
  buttonStyle2: {
		backgroundColor: "#FF9933",
		borderRadius: 10,
		padding: 5,
		margin: 20,
		height: 50,
		width: 250,
	},
  headerStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    marginLeft: 30,
  },
  textStyle: {
		fontSize: 16,
		fontWeight: "bold",
		margin: 5,
		color: "black"
	},
  dividerStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginLeft: 20,
    marginRight: 20,
  },
});

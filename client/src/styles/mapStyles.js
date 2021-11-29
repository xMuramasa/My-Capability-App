import { StyleSheet } from 'react-native';


export default mapStyles = StyleSheet.create({
    map: {
      width: '95%',
      height: '50%',
      alignSelf: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: "#E7E7E7",
      flexDirection: "column",
    },
    timer: {
      color: 'black',
      fontSize: 45,
      fontWeight: '200',
      textAlign: "center",
    },
    headerStyle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
      marginTop: "4%",
      marginLeft: 30,
    },
    dividerStyle: {
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      marginLeft: 20,
      marginRight: 20,
    },  
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingTop:"5%",
      textAlign:'center'
    },
    button: {
      paddingVertical: "5%",
      alignSelf: "center",
      marginHorizontal: "2%",
      marginBottom: "2%",
      minWidth: "30%",
      textAlign: "center",
      backgroundColor: '#FF9933',
      
    },
    button2: {
      paddingRight:"5%",
      minWidth: "30%",
      alignSelf: "center",
      textAlign: "center",
      backgroundColor: '#FF9933',
    },
    buttonInsideMap: {
      position:'absolute',
      top:'75%',
      right:'5%',
    },
    selectedLabel: {
      color: "white",
    },
    subLabel: {
      fontSize: 15,
      fontWeight: "bold",
      color: "black",
      marginTop: "5%",
      marginLeft: "5%",
    },
    space: {
      marginBottom: "0%",
      padding: "1%"
    },
    text: {
      fontSize: 10
    },
    buttonView: {
      justifyContent: 'center',
          alignItems: 'center'
    },
    imageStyle: {
      height: "5%",
      width: "5%",
    },
    textStyle: {
      fontSize: 15,
      fontWeight: "bold",
      color: "black"
    },
    rowView2: {
      flexDirection: "row",
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: -10
    },
  });
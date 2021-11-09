import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E7E7E7",
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: "column"
	},
	buttonStyle: {
		backgroundColor: "#FC7A1E",
		borderRadius: 10,
		padding: 5,
		margin: 20,
		height: 150,
		width: 150,
	},
	buttonStyle2: {
		backgroundColor: "#FC7A1E",
		borderRadius: 10,
		padding: 5,
		margin: 20,
		height: 50,
		width: 250,
	},
	imageStyle: {
		height: 100,
		width: 100,
	},
	imageStyle2: {
		height: 40,
		width: 40,
	},
	logosStyle:{
		height: 300,
		width: 300,
		marginTop:-80,
		marginBottom:-30
	},
	textStyle: {
		fontSize: 16,
		fontWeight: "bold",
		margin: 5,
		color: "black"
	},
	textStyle2: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
		color: "black"
	},
	buttonView: {
		justifyContent: 'center',
        alignItems: 'center'
	},
	buttonView2: {
		justifyContent: 'center',
        alignItems: 'center',
		flexDirection: "row"
	},
	rowView: {
		flexDirection: "row",
	}
});

export default styles;
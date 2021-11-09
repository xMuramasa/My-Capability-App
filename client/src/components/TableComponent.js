import React from 'react';
import { DataTable, Provider as PaperProvider } from 'react-native-paper';
import { View, Text, StyleSheet } from "react-native";

const numberOfItemsPerPageList = [3, 4, 5];

const splitDate = (d) => {
    // 2021-07-21T00:00
    // 31-07-21
    var f = d.slice(0, 16).split("T")[0]; //fecha
    var f2 = f.split("-").reverse(); //fecha inv
    f2[2] = f2[2].slice(2,4);
    var f3 = f2.join("-");

    var h = d.slice(0, 16).split("T")[1];//hora

    return f3 /*+ " " + h*/;
}

const TableComponent = (props) => {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, setItemsPerPage] = React.useState(6);

    const rowsLength = props.rows.length;

    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, rowsLength);

    React.useEffect(() => {
    setPage(0);
    }, [numberOfItemsPerPageList]);

    return (
        <PaperProvider style={styles.tableContainer}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Ejercicio</DataTable.Title>
                    <DataTable.Title>Resultado</DataTable.Title>
                    <DataTable.Title>Fecha</DataTable.Title>
                </DataTable.Header>

                {/* rows: lista con resultados
                    slice: genera listas con resultados para cada página
                    map: separa cada valor de resultados en columnas */}
                {props.rows
                    .slice(page * numberOfItemsPerPage, page * numberOfItemsPerPage + numberOfItemsPerPage)
                    .map((row, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell>{row.type === 0 ? "Salto" : "Velocidad"}</DataTable.Cell>
                            <DataTable.Cell>{row.type === 0 ? `${row.result.toFixed(2)} m` : `${row.result.toFixed(2)} Km/h`}</DataTable.Cell>
                        <DataTable.Cell>{splitDate(row.date)}</DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(rowsLength / numberOfItemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} of ${rowsLength}`}
                    numberOfItemsPerPage={6}
                    //numberOfItemsPerPageList={numberOfItemsPerPageList}
                    onItemsPerPageChange={setItemsPerPage}
                    showFastPaginationControls
                    //optionsLabel={'Rows per page'}
                />
            
            </DataTable>
        </PaperProvider>
    
    );
}

const styles = StyleSheet.create({
    tableContainer: {
        width: "95%"
    }
});

export default TableComponent;


/*const rows = [
    {
        title: "Frozen yogurt",
        calories: 159,
        fat: 8.0
    },
    {
        title: "Frozen ice cream",
        calories: 10,
        fat: 200.0
    },
    {
        title: "Frozen sandwich",
        calories: 2000,
        fat: 16.0
    }, 
    {
        title: "Frozen soda",
        calories: 34,
        fat: 0.0
    },
    {
        title: "Frozen yogurt",
       calories: 159002,
        fat: 8.0
    },
    {
        title: "Frozen ice cream",
        calories: 129390,
        fat: 200.0
    },
    {
        title: "Frozen sandwich",
        calories: 200293920,
        fat: 16.0
        }
];
*/
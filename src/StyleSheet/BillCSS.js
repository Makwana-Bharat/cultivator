import { StyleSheet } from 'react-native'
export const BillStyles = StyleSheet.create({
    container: {
        width: '50%',
        flexDirection: 'column', // backgroundColor: '#000',
        // padding: 10,
    },
    row: {
        width: '100%',
        display: 'flex',
        marginBottom: 5,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between'
    },
    header1: {

        color: '#fff',
        fontSize: 8,
        fontWeight: '700',
        width: '30%'
    },
    header2: {

        color: '#fff',
        fontSize: 8,
        fontWeight: '700',
        width: '25%',
        textAlign: 'left'
    },
    header3: {

        color: '#fff',
        fontSize: 8,
        fontWeight: '700',
        width: '50%',
        textAlign: 'right',
        paddingRight: 15,
    },
    dataContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
    },
    data1: {
        color: '#fff',
        fontSize: 6,
        width: '30%',
    },
    data2: {
        color: '#fff',
        fontSize: 6,
        width: '25%',
        textAlign: 'left'
    },
    data3: {
        color: '#fff',
        fontSize: 7,
        width: '50%',
        height: 10,
        overflow: 'hidden',
        textAlign: 'right',
        paddingRight: 15,
    },

});

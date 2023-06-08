import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '50%',
        flexDirection: 'column', // backgroundColor: '#000',
        padding: 10,
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
        width: '30%'
    },
    header3: {

        color: '#fff',
        fontSize: 8,
        fontWeight: '700',
        width: '40%',
        textAlign: 'center'
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
        width: '15%',
    },
    data2: {
        color: '#fff',
        fontSize: 6,
        width: '25%',
        textAlign: 'center'
    },
    data3: {
        color: '#fff',
        fontSize: 7,
        width: '50%',
        height: 10,
        textAlign: 'left',
        overflow: 'hidden',
        paddingLeft: 10,
    },

});

const BillEntry = ({ Entrydata }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header1}>રકમ (₹)</Text>
                    <Text style={styles.header2}>તારીખ</Text>
                    <Text style={styles.header3}>વિગત</Text>
                </View>
            </View>
            <View style={styles.row}>
                {Entrydata.map((entry, index) => {
                    return (
                        <View style={styles.dataContainer} key={index}>
                            <Text style={styles.data1}>{entry.data.Balace}</Text>
                            <Text style={styles.data2}>{entry.data.Date}</Text>
                            <Text style={styles.data3}>{entry.data.Detail.length > 20 ? entry.data.Detail.substr(0, 17) + '...' : entry.data.Detail}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    );
};


export default BillEntry;

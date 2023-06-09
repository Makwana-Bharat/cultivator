import React from 'react';
import { View, Text } from 'react-native';
import { BillStyles } from '../../StyleSheet/BillCSS';
const BillEntry = ({ Entrydata }) => {
    return (
        <View style={BillStyles.container}>
            <View style={BillStyles.row}>
                <View style={BillStyles.headerContainer}>
                    <Text style={BillStyles.header1}>રકમ (₹)</Text>
                    <Text style={BillStyles.header2}>તારીખ</Text>
                    <Text style={BillStyles.header3}>વિગત</Text>
                </View>
            </View>
            <View style={BillStyles.row}>
                {Entrydata.map((entry, index) => {
                    return (
                        <View style={BillStyles.dataContainer} key={index}>
                            <Text style={BillStyles.data1}>{entry.data.Balance}</Text>
                            <Text style={BillStyles.data2}>{entry.data.Date}</Text>
                            <Text style={BillStyles.data3}>{entry.data.Detail.length > 20 ? entry.data.Detail.substr(0, 17) + '...' : entry.data.Detail}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    );
};


export default BillEntry;

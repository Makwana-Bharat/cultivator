import React from 'react';
import { View, Text } from 'react-native';
import { BillStyles } from '../../StyleSheet/BillCSS';

const BillEntry = ({ Entrydata }) => {
    const entryKeys = Object.keys(Entrydata); // Get an array of object keys
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
                {entryKeys.map(key => {
                    const entry = Entrydata[key];
                    return (
                        <View style={BillStyles.dataContainer} key={key}>
                            <Text style={BillStyles.data1}>{entry.RUPEE}</Text>
                            <Text style={BillStyles.data2}>{entry.DATE}</Text>
                            <Text style={BillStyles.data3}>
                                {entry.DETAILS.length > 20
                                    ? entry.DETAILS.substr(0, 17) + '...'
                                    : entry.DETAILS}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default BillEntry;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { DashboardStyles } from '../../StyleSheet/DashboardCSS';
import { Farmer } from './Dashboard/Farmer';
import AddFarmer from './Dashboard/AddFarmer';
import { selectTraders } from '../../redux/slices/authSlice';
import { Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
export const DashboardScreen = () => {
    const [loading, setLoading] = useState(true);
    const [isVisible, setVisible] = useState(false);
    const trader = useSelector(selectTraders);
    const [Farmers, setFarmers] = useState(trader.Farmer);
    const [visibleMsg, setVisibleMsg] = useState(false);
    useEffect(() => {
        setFarmers(trader.Farmer)

    }, [trader.Farmer]);
    return (
        <View style={DashboardStyles.container}>
            <View style={DashboardStyles.header}>
                <Text style={DashboardStyles.headerText}>ખેડૂતમિત્રો</Text>
                <View style={DashboardStyles.iconContainer}>
                    <TouchableOpacity onPress={() => setVisibleMsg(true)}>
                        <FontAwesome name="search" size={20} color="white" style={DashboardStyles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setVisibleMsg(true)}>
                        <FontAwesome name="filter" size={20} color="white" style={DashboardStyles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <Farmer farmers={Farmers} loading={loading} />
            <View style={DashboardStyles.bottom}>
                <View style={{ width: '70%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: 10, alignItems: 'center' }}>
                    <FontAwesome name="rupee" size={18} color={Object.values(Farmers).reduce((acc, farmer) => acc + Number(farmer.Balance), 0) == 0 ? '#7DAFEA' : Object.values(Farmers).reduce((acc, farmer) => acc + Number(farmer.Balance), 0) < 0 ? '#E57158' : '#79B046'} />
                    <Text style={{ color: Object.values(Farmers).reduce((acc, farmer) => acc + Number(farmer.Balance), 0) == 0 ? '#7DAFEA' : Object.values(Farmers).reduce((acc, farmer) => acc + Number(farmer.Balance), 0) < 0 ? '#E57158' : '#79B046', fontSize: 18, fontWeight: 'bold' }} > {Object.values(Farmers).reduce((acc, farmer) => acc + Number(farmer.Balance), 0)}</Text>
                </View>
                <TouchableOpacity style={DashboardStyles.fab} onPress={() => setVisible(true)}>
                    <FontAwesome5 name='user-plus' size={24} color='white' />
                </TouchableOpacity>
            </View>
            <AddFarmer isVisible={isVisible} setVisible={setVisible} />
            <Snackbar
                style={{ backgroundColor: '#1F242B', position: 'absolute', bottom: 0, left: 0 }}
                visible={visibleMsg}

                onDismiss={() => setVisibleMsg(false)}>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 0, paddingVertical: 2 }}>
                    <Text style={{ color: '#B8B106', fontWeight: 'bold', letterSpacing: .8 }}>સર્વિસ ઉપલબ્ધ નથી.. </Text>
                    <MaterialIcons name='info-outline' color={'#B8B106'} size={24} />
                </View>
            </Snackbar>
        </View>
    );
}
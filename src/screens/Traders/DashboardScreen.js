import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { DashboardStyles } from '../../StyleSheet/DashboardCSS';
import { Farmer } from './Dashboard/Farmer';
import AddFarmer from './Dashboard/AddFarmer';
import { selectTraders } from '../../redux/slices/authSlice';
export const DashboardScreen = () => {
    const [loading, setLoading] = useState(true);
    const [isVisible, setVisible] = useState(false);
    const trader = useSelector(selectTraders);
    const [Farmers, setFarmers] = useState(trader.Farmer);
    const [sum, setSum] = useState(0);
    useEffect(() => {
        setFarmers(trader.Farmer)
        const balanceSum = Object.values(Farmers).reduce((acc, farmer) => acc + Number(farmer.Balance), 0);
        setSum(balanceSum);
    }, [trader]);
    return (
        <View style={DashboardStyles.container}>
            <View style={DashboardStyles.header}>
                <Text style={DashboardStyles.headerText}>ખેડૂતમિત્રો</Text>
                <View style={DashboardStyles.iconContainer}>
                    <TouchableOpacity onPress={() => alert('સર્વિસ ઉપલબ્ધ નથી.. ')}>
                        <FontAwesome name="search" size={20} color="white" style={DashboardStyles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('સર્વિસ ઉપલબ્ધ નથી.. ')}>
                        <FontAwesome name="filter" size={20} color="white" style={DashboardStyles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <Farmer farmers={Farmers} loading={loading} />
            <View style={DashboardStyles.bottom}>
                <View style={{ width: '70%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: 10, alignItems: 'center' }}>
                    <FontAwesome name="rupee" size={18} color={sum == 0 ? '#7DAFEA' : sum < 0 ? '#E57158' : '#79B046'} />
                    <Text style={{ color: sum == 0 ? '#7DAFEA' : sum < 0 ? '#E57158' : '#79B046', fontSize: 18, fontWeight: 'bold' }} > {sum}</Text>
                </View>
                <TouchableOpacity style={DashboardStyles.fab} onPress={() => setVisible(true)}>
                    <FontAwesome5 name='user-plus' size={24} color='white' />
                </TouchableOpacity>
            </View>
            <AddFarmer isVisible={isVisible} setVisible={setVisible} />
        </View>
    );
}
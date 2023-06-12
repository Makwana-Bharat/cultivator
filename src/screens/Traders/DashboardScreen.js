import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addFarmerToDetail } from '../../redux/slices/authSlice';
import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { DashboardStyles } from '../../StyleSheet/DashboardCSS';
import { Farmer } from './Dashboard/Farmer';
import AddFarmer from './Dashboard/AddFarmer';
import { firebase } from '../../../config/firebase';
const auth = getAuth(firebase);
const db = getFirestore();
export const DashboardScreen = () => {
    const [loading, setLoading] = useState(true);
    const id = useSelector(state => state.userAuth.id);
    const FarmerDocumentPath = `Traders/${id}/Farmer`;
    const usersRef = collection(db, FarmerDocumentPath);
    const [isVisible, setVisible] = useState(false);
    const [Farmers, setFarmers] = useState();
    const [sum, setSum] = useState(0);
    useEffect(() => {
        let unsubscribe;
        const fetchData = async () => {
            unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const farmerDocs = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    })).sort((a, b) => a.data.Name.localeCompare(b.data.Name));

                    const balanceSum = farmerDocs.reduce((sum, farmer) => eval(sum + '+' + farmer.data.Balance), 0);
                    setSum(balanceSum)
                    setFarmers(farmerDocs);
                } else {
                    setFarmers([]);
                }
                setLoading(false);
            }, (error) => {
                Alert.alert('Error retrieving user data:', error);
            });
        };

        fetchData();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [usersRef]);
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
                <TouchableOpacity style={DashboardStyles.fab}
                    onPress={() => setVisible(true)}
                >
                    <FontAwesome5 name='user-plus' size={24}
                        color='white' />
                </TouchableOpacity>
            </View>
            <AddFarmer isVisible={isVisible} setVisible={setVisible} />
        </View>
    );
};

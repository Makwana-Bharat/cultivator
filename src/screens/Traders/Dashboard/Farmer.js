import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { selectFarmer } from '../../../redux/slices/farmerSlice';
import { farmerStyle } from '../../../StyleSheet/DashboardCSS';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
export const Farmer = ({ farmers, loading }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return loading ? (
        <ActivityIndicator color="#FFFFFF" />
    ) :
        (
            <ScrollView
                endFillColor="#31363C"
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
            >
                {farmers == undefined || farmers.length == 0 ?
                    <View style={{ flex: 1, height: 400, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='emoticon-dead-outline' size={50} color={'#E57158'} />
                        <Text style={{ color: '#E57158', fontWeight: 'bold', letterSpacing: 1, fontSize: 24, marginBottom: 10 }}>Oops.!! </Text>
                        <Text style={{ color: '#E57158', fontWeight: 'bold', letterSpacing: 1 }}>કોય ખેડૂત નથી.. </Text>
                    </View> :
                    farmers.map((farmer, index) => {
                        if (farmer == undefined) {
                            return <></>;
                        }
                        return (
                            <TouchableOpacity
                                style={farmerStyle.container}
                                key={index}
                                onPress={() => {
                                    dispatch(selectFarmer({
                                        id: farmer.id,
                                        name: farmer.data.Name,
                                        village: farmer.data.Village,
                                        Balance: farmer.data.Balance
                                    }))
                                    navigation.navigate('Crops', { farmerId: farmer.id })
                                }}
                            >
                                <View style={farmerStyle.content}>
                                    <Image
                                        source={{ uri: farmer.data.Image }}
                                        style={farmerStyle.image}
                                    />
                                    <View style={farmerStyle.subcontainer}>
                                        <Text style={farmerStyle.name}>
                                            {farmer.data.Name.length > 20 ? farmer.data.Name.substring(0, 20) + '...' : farmer.data.Name}
                                        </Text>
                                        <View style={farmerStyle.moneyContainer}>
                                            <FontAwesome name="rupee" size={14} color={farmer.data.Balance == 0 ? '#7DAFEA' : farmer.data.Balance < 0 ? '#E57158' : '#79B046'} style={farmerStyle.currencyIcon} />
                                            <Text style={[farmerStyle.money, { color: farmer.data.Balance == 0 ? '#7DAFEA' : farmer.data.Balance < 0 ? '#E57158' : '#79B046' }]}>{farmer.data.Balance}</Text>
                                        </View>
                                    </View>
                                    <FontAwesome name="chevron-right" size={24} color="white" style={farmerStyle.rightIcon} />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        );
};
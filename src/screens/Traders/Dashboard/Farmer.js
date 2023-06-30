import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { farmerStyle } from '../../../StyleSheet/DashboardCSS';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ModifySelection, selection } from '../../../redux/slices/authSlice';
export const Farmer = ({ farmers, loading }) => {
    const navigation = useNavigation();
    const selectedIndex = useSelector(selection)
    const dispatch = useDispatch();
    return (
        <ScrollView
            endFillColor="#31363C"
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
        >
            {farmers == undefined || Object.keys(farmers).length == 0 ? (
                <View style={{ flex: 1, height: 400, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name='emoticon-dead-outline' size={50} color={'#E57158'} />
                    <Text style={{ color: '#E57158', fontWeight: 'bold', letterSpacing: 1, fontSize: 24, marginBottom: 10 }}>Oops.!! </Text>
                    <Text style={{ color: '#E57158', fontWeight: 'bold', letterSpacing: 1 }}>કોય ખેડૂત નથી.. </Text>
                </View>
            ) : (
                Object.keys(farmers).map((key) => {
                    const farmer = farmers[key];
                    if (farmer == undefined) {
                        return null;
                    }
                    return (
                        <TouchableOpacity
                            style={farmerStyle.container}
                            key={key}
                            onPress={() => {
                                dispatch(ModifySelection({ ...selectedIndex, FarmerIndex: key }))
                                navigation.navigate('Folders')
                            }}
                        >
                            <View style={farmerStyle.content}>
                                <Image
                                    source={{ uri: farmer.Pic == "" ? "https://w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png" : farmer.Pic }}
                                    style={farmerStyle.image}
                                />
                                <View style={farmerStyle.subcontainer}>
                                    <Text style={farmerStyle.name}>
                                        {farmer.Name.length > 20 ? farmer.Name.substring(0, 20) + '...' : farmer.Name}
                                    </Text>
                                    <View style={farmerStyle.moneyContainer}>
                                        <FontAwesome name="rupee" size={14} color={farmer.Balance == 0 ? '#7DAFEA' : farmer.Balance < 0 ? '#E57158' : '#79B046'} style={farmerStyle.currencyIcon} />
                                        <Text style={[farmerStyle.money, { color: farmer.Balance == 0 ? '#7DAFEA' : farmer.Balance < 0 ? '#E57158' : '#79B046' }]}>{farmer.Balance}</Text>
                                    </View>
                                </View>
                                <FontAwesome name="chevron-right" size={24} color="white" style={farmerStyle.rightIcon} />
                            </View>
                        </TouchableOpacity>
                    )
                })
            )}
        </ScrollView>
    );
};

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, FontAwesome, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, updateDoc, doc } from 'firebase/firestore';
import { Modal } from 'react-native-paper';
import app from '../../../../config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { newFarmer, updateFarmer, selectId } from '../../../redux/slices/authSlice';
import { selectedFarmerId } from '../../../redux/slices/farmerSlice';
const auth = getAuth(app);
const db = getFirestore();
const UpdateFarmerInfo = () => {
    const id = useSelector(selectId);
    let farmerId = useSelector(selectedFarmerId)
    const Farmer = useSelector((state) => state.userAuth.detail.Farmer);
    const farmerIndex = Farmer ? Farmer.findIndex((f) => f.id === farmerId) : -1;
    console.log(Farmer[farmerIndex].data)
    const [name, setName] = useState(Farmer[farmerIndex] != undefined ? Farmer[farmerIndex].data.Name : '')
    const [village, setVillage] = useState(Farmer[farmerIndex] != undefined ? Farmer[farmerIndex].data.Village : '')
    const [mobileNumber, setMobileNumber] = useState(Farmer[farmerIndex] != undefined ? Farmer[farmerIndex].data.MobileNo : '')
    const [balance, setBalance] = useState(Farmer[farmerIndex] != undefined ? Farmer[farmerIndex].data.Balance.toString() : '')
    const [Vname, setVName] = useState(true);
    const [VmobileNumber, setVMobileNumber] = useState(true);
    const [Vvillage, setVVillage] = useState(true);
    const [isLoading, setLoading] = useState(false); // Added isLoading state
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const validateInputs = () => {
        let valid = true;
        if (name == '') {
            setVName(false);
            valid = false;
        }
        if (village == "") {
            setVVillage(false);
            valid = false;
        }
        if (mobileNumber.length != 10) {
            setVMobileNumber(false);
            valid = false;
        }
        return valid;
    };
    const handleFarmer = () => {
        if (!validateInputs()) {
            return;
        }
        setLoading(true); // Set loading state to true
        const FarmerDocumentPath = `Traders/${id}/Farmer`;
        const newInfo = {
            Image: 'https://w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png',
            MobileNo: mobileNumber,
            Name: name,
            Village: village,
            Balance: balance
        }
        const farmerRef = doc(db, FarmerDocumentPath, farmerId);
        updateDoc(farmerRef, newInfo)
            .then(() => {
                alert('ખેડૂતની માહિતી સુધારાઈ..');
                dispatch(updateFarmer({ farmerId, newInfo }));
            })
            .catch((error) => {
                console.log(error);
                alert('Server is Busy...');
            })
            .finally(() => {
                setLoading(false); // Set loading state to false
                navigation.navigate('Dashboard')
            });
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{
                position: 'absolute',
                top: 30,
                left: 20,
                backgroundColor: '#1F242B',
                padding: 7,
                borderRadius: 20
            }} >
                <AntDesign name='left' size={18} color='#fff' />
            </TouchableOpacity>
            <Image source={{ uri: Farmer[farmerIndex] != undefined ? Farmer[farmerIndex].data.Image : '' }} style={{
                marginBottom: 20, width: 120, height: 120, borderRadius: 120, borderWidth: 5, borderColor: '#fff'
            }} />
            <View style={styles.inputContainer}>
                <View style={[styles.input_group, !Vname && { borderColor: '#C3533A' }]}>
                    <FontAwesome5 name="user-tie" size={28} color="#fff" style={{
                        paddingHorizontal: 8
                    }} />
                    <TextInput
                        style={styles.input}
                        placeholder="ખેડૂતનામ "
                        value={name}
                        placeholderTextColor="#BDBFC2"
                        onChange={(e) => {
                            e.persist();
                            setName(e.nativeEvent.text);
                        }}
                    />
                    {!Vname && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                </View>
                <View style={[styles.input_group, !Vvillage && { borderColor: '#C3533A' }]}>
                    <FontAwesome5 name="map-marked-alt" size={24} color="#fff" style={{
                        paddingHorizontal: 8
                    }} />
                    <TextInput
                        style={styles.input}
                        placeholder="ગામ  "
                        value={village}
                        placeholderTextColor="#BDBFC2"
                        onChange={(e) => {
                            e.persist();
                            setVillage(e.nativeEvent.text);
                        }}
                    />
                    {!Vvillage && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                </View>
                <View style={[styles.input_group, !VmobileNumber && { borderColor: '#C3533A' }]}>
                    <Entypo name="old-phone" size={28} color="#fff" style={{
                        paddingHorizontal: 8
                    }} />
                    <TextInput
                        style={styles.input}
                        placeholder="0000000000"
                        value={mobileNumber}
                        placeholderTextColor="#BDBFC2"
                        onChange={(e) => {
                            e.persist();
                            setMobileNumber(e.nativeEvent.text);
                        }}
                    />
                    {!VmobileNumber && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                </View>
                <View style={[styles.input_group]}>
                    <FontAwesome name="rupee" size={28} color="#fff" style={{
                        paddingHorizontal: 15
                    }} />
                    <TextInput
                        style={styles.input}
                        placeholder="0000000000"
                        value={balance}
                        placeholderTextColor="#BDBFC2"
                    />
                </View>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={handleFarmer} style={styles.button} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>માહિતી સુધારો</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#31363C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        marginBottom: 20,
    },
    typeSelection: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    radioButton: {
        backgroundColor: '#53595F',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 5,
    },
    radioButtonSelected: {
        backgroundColor: '#1F242B',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input_group: {
        backgroundColor: '#1F242B',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderRadius: 12,
        borderColor: '#1F242B',
        marginBottom: 10
    },
    input: {
        backgroundColor: '#53595F',
        width: 250,
        height: 45,
        color: '#fff',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 10,
    },
    createNew: {
        marginBottom: 10,
    },
    button: {
        width: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F242B',
        marginBottom: 10,
        paddingHorizontal: 45,
        paddingVertical: 12,
        borderColor: '#1F242B',
        borderWidth: 4,
        borderRadius: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UpdateFarmerInfo;

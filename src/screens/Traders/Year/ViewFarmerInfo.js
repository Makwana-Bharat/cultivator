import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, FontAwesome, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Modal } from 'react-native-paper';
import { selectedFarmerId } from '../../../redux/slices/farmerSlice';
import app from '../../../../config/firebase';
import { useSelector } from 'react-redux';
const auth = getAuth(app);
const db = getFirestore();

const ViewFarmerInfo = ({ isVisible, setVisible, path, farmerId }) => {
    // const farmerId = useSelector(selectedFarmerId);
    const usersRef = collection(db, path);
    const [selectedFarmer, setSelectedFarmer] = useState({ data: {} });
    useEffect(() => {
        const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
            if (!querySnapshot.empty) {
                const FarmerDocs = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                const selectedData = FarmerDocs.find(item => item.id === farmerId);
                setSelectedFarmer(selectedData)
            }
        }, (error) => {
            console.error('Error retrieving user data:', error);
            // setLoading(false)
        })
        return () => unsubscribe();
    }, []);
    return (
        <Modal animationType="slide" visible={isVisible} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {selectedFarmer != undefined ? <View style={styles.container}>
                <TouchableOpacity onPress={() => setVisible(false)} style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: '#1F242B',
                    padding: 6,
                    borderRadius: 20
                }} >
                    <AntDesign name='close' size={18} color='#fff' />
                </TouchableOpacity>

                <Image source={{ uri: selectedFarmer.data.Image }} style={{
                    marginTop: 50, marginBottom: 20, width: 120, height: 120, borderRadius: 120, borderWidth: 5, borderColor: '#fff'
                }} />
                <View style={styles.inputContainer}>
                    <View style={[styles.input_group]}>
                        <FontAwesome5 name="user-tie" size={28} color="#fff" style={{
                            paddingHorizontal: 8
                        }} />
                        <TextInput
                            style={styles.input}
                            placeholder="ખેડૂતનામ "
                            value={selectedFarmer.data.Name}
                            placeholderTextColor="#BDBFC2"

                        />
                    </View>
                    <View style={[styles.input_group]}>
                        <FontAwesome5 name="map-marked-alt" size={24} color="#fff" style={{
                            paddingHorizontal: 8
                        }} />
                        <TextInput
                            style={styles.input}
                            placeholder="ગામ  "
                            value={selectedFarmer.data.Village}
                            placeholderTextColor="#BDBFC2"
                        />
                    </View>
                    <View style={[styles.input_group]}>
                        <Entypo name="old-phone" size={28} color="#fff" style={{
                            paddingHorizontal: 8
                        }} />
                        <TextInput
                            style={styles.input}
                            placeholder="0000000000"
                            value={selectedFarmer.data.MobileNo}
                            placeholderTextColor="#BDBFC2"
                        />
                    </View>
                    <View style={[styles.input_group]}>
                        <FontAwesome name="rupee" size={28} color="#fff" style={{
                            paddingHorizontal: 15
                        }} />
                        <TextInput
                            style={styles.input}
                            placeholder="0000000000"
                            value={selectedFarmer.data.Balance && selectedFarmer.data.Balance.toString()}
                            placeholderTextColor="#BDBFC2"
                        />
                    </View>
                </View>
            </View> :
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => setVisible(false)} style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: '#1F242B',
                        padding: 6,
                        borderRadius: 20
                    }} >
                        <AntDesign name='close' size={18} color='#fff' />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 20 }}>ખેડૂત ઉપલબ્ધ નથી.. </Text>
                </View>}
        </Modal>
    );

};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        top: -50,
        padding: 12,
        height: 500,
        borderRadius: 10,
        backgroundColor: '#31363C',
        width: 320,
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
        width: '100%',
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

export default ViewFarmerInfo;

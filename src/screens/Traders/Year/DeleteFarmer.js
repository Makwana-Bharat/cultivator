import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, FontAwesome, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, deleteDoc } from 'firebase/firestore';
import { Modal } from 'react-native-paper';
import app from '../../../../config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFarmer, newFarmer } from '../../../redux/slices/authSlice';
const auth = getAuth(app);
const db = getFirestore();
const DeleteFarmer = ({ isVisible, setVisible, farmerId }) => {
    const id = useSelector((state) => state.userAuth.id);
    const [isLoading, setLoading] = useState(false); // Added isLoading state
    const naviation = useNavigation()
    const dispatch = useDispatch();
    const deleteIt = async () => {
        setLoading(true);
        try {
            const FarmerDocumentPath = `Traders/${id}/Farmer`;
            const farmerRef = doc(db, FarmerDocumentPath, farmerId);
            await deleteDoc(farmerRef);
            setVisible(false);
            Alert.alert('ખેડૂત હટવાયો.. ')
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert('Server is Busy...');
            setLoading(false);
        }
        finally {
            naviation.navigate('Dashboard');
            dispatch()
        }
    };

    return (
        <Modal animationType="slide" visible={isVisible} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                <FontAwesome name='warning' size={80} color={'#E57158'} />
                <Text style={{ marginTop: 10, fontSize: 26, color: '#fff', fontWeight: 'bold' }}>Are you Sure..?</Text>
                <Text style={{ marginVertical: 10, fontSize: 15, color: '#fff', fontWeight: '400', opacity: .8, width: '70%', textAlign: 'center' }}>Do you really want to delete this farmer? This Process cannot be undone</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 }}>
                    <TouchableOpacity style={styles.button} onPress={() => setVisible(false)}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#E57158', borderColor: '#E57158' }]} onPress={deleteIt}><Text style={styles.buttonText}>{isLoading ? <ActivityIndicator color={'#fff'} /> : 'Delete It!'}</Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        top: -50,
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#31363C',
        paddingTop: 20,
        width: 320,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 130,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F242B',
        marginBottom: 10,
        paddingHorizontal: 10,
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

export default DeleteFarmer;

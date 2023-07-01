import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { Modal } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import URL from "../../../../config/URL"
import { selectId, addFarmer } from '../../../redux/slices/authSlice';
import { Snackbar } from 'react-native-paper';
const AddFarmer = ({ isVisible, setVisible }) => {
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [village, setVillage] = useState('');
    const [Vname, setVName] = useState(true);
    const [VmobileNumber, setVMobileNumber] = useState(true);
    const [Vvillage, setVVillage] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [visibleMsg, setVisibleMsg] = useState(false);
    const [response, setResponse] = useState(false);
    const SID = useSelector(selectId);
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
    const handleFarmer = async () => {
        if (!validateInputs()) {
            return;
        }
        setLoading(true);
        await fetch(`${URL}/APIS/Farmer_CRUD/Add.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `SID=${SID}&Name=${name}&Image=${'https://w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png'}&Village=${village}&Mobile=${mobileNumber}`
        }).then(response => response.json())
            .then(data => {
                setResponse(data.status)
                setVisibleMsg(true);
                setTimeout(() => {
                    setMobileNumber('')
                    setName('')
                    setVillage('')
                    if (data.status !== "success") {
                        return;
                    }
                    const currentDate = new Date();
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    const year = String(currentDate.getFullYear());

                    const formattedDate = `${day}-${month}-${year}`;
                    const newFarmer = {
                        Name: name,
                        Village: village,
                        Mobile: mobileNumber,
                        Pic: 'https://w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png',
                        Balance: 0,
                        Date: formattedDate,
                        Folder: {}
                    };
                    dispatch(addFarmer({ ...newFarmer, FID: data.ID }));
                    navigation.navigate('Dashboard')
                }, 1000);
            }).finally(() => {
                setLoading(false);
                setVisible(false)
            })
    };
    return (<>
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
                <Image source={{ uri: 'https://w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png' }} style={{
                    marginBottom: 20, width: 120, height: 120, borderRadius: 120, borderWidth: 5, borderColor: '#fff'
                }} />
                <View style={styles.inputContainer}>
                    <View style={[styles.input_group, !Vname && { borderColor: '#C3533A' }]}>
                        <FontAwesome5 name="user-tie" size={28} color="#fff" style={{
                            paddingHorizontal: 8
                        }} />
                        <TextInput
                            onFocus={() => setVName(true)}
                            style={styles.input}
                            placeholder="ખેડૂતનામ "
                            value={name}
                            inputMode='text'
                            onChangeText={setName}
                            placeholderTextColor="#BDBFC2"
                        />
                        {!Vname && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                    </View>
                    <View style={[styles.input_group, !Vvillage && { borderColor: '#C3533A' }]}>
                        <FontAwesome5 name="map-marked-alt" size={24} color="#fff" style={{
                            paddingHorizontal: 8
                        }} />
                        <TextInput
                            onFocus={() => setVVillage(true)}
                            style={styles.input}
                            placeholder="ગામ  "
                            value={village}
                            inputMode='text'
                            onChangeText={setVillage}
                            placeholderTextColor="#BDBFC2"
                        />
                        {!Vvillage && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                    </View>
                    <View style={[styles.input_group, !VmobileNumber && { borderColor: '#C3533A' }]}>
                        <Entypo name="old-phone" size={28} color="#fff" style={{
                            paddingHorizontal: 8
                        }} />
                        <TextInput
                            onFocus={() => setVMobileNumber(true)}
                            style={styles.input}
                            placeholder="0000000000"
                            value={mobileNumber}
                            inputMode='numeric'
                            keyboardType='numeric'
                            onChangeText={setMobileNumber}
                            placeholderTextColor="#BDBFC2"
                        />
                        {!VmobileNumber && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                    </View>
                </View>
                <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={handleFarmer} style={styles.button} disabled={isLoading}>
                        {isLoading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>ખેડૂત ઉમેરો</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <Snackbar
            style={{ backgroundColor: '#1F242B', }}
            visible={visibleMsg}
            onDismiss={() => setVisibleMsg(false)}>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10, paddingVertical: 2 }}>
                <Text style={{ color: response !== "error" ? '#79B046' : '#E57158', fontWeight: 'bold', letterSpacing: .8 }}>{response !== "error" ? `સફળતાપૂર્વક ખેડૂત ઉમેરાયો` : 'મોબાઈલ નંબર ઉપલબ્ધ છે..!'}</Text>
                {response !== "error" && <Feather name='check-circle' color={'#79B046'} size={19} />}
                {response === "error" && <MaterialIcons name='error-outline' color={'#E57158'} size={19} />}
            </View>
        </Snackbar>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
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

export default AddFarmer;

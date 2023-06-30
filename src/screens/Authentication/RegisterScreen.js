import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { ModifySelection, setSignIn } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../../config/URL';
const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [trade, setTrade] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    //validation
    const [Vemail, setVEmail] = useState(true);
    const [Vname, setVName] = useState(true);
    const [Vtrade, setVTrade] = useState(true);
    const [Vpassword, setVPassword] = useState(true);
    //Other
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const validateInputs = () => {
        let valid = true;
        if (email == '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) || email.trim() === '') {
            setVEmail(false);
            valid = false;
        }
        if (password == '' || password.length < 6) {
            setVPassword(false);
            valid = false;
        }
        if (name.length < 3 || name.length == '') {
            setVName(false);
            valid = false;
        }
        if (trade.length < 3 || trade.length == '') {
            setVTrade(false)
            valid = false;
        }
        return valid;
    };
    const handleRegister = () => {
        if (validateInputs()) {
            fetch(`${URL}/APIS/Authentication/Register.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `name=${name}&email=${email}&password=${password}&trade=${trade}&trade_img=${'https://raw.githubusercontent.com/AJAX-Codder/cultivator/master/assets/Default_avatar.png'}`
            }).then(response => response.json())
                .then(data => {
                    if (data.message = "Trader inserted successfully") {
                        fetch(`${URL}/APIS/Authentication/Login.php`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: `email=${email}&password=${password}`
                        })
                            .then(response => response.json())
                            .then(data => {
                                AsyncStorage.setItem('Auth', email);
                                const modifiedSelection = {
                                    TraderId: data.Trader.SID,
                                    FarmerIndex: null,
                                    FolderIndex: null,
                                    EntryIndex: null
                                };
                                dispatch(ModifySelection(modifiedSelection));
                                dispatch(setSignIn({
                                    id: data.Trader.SID,
                                    isLoggedIn: true,
                                    traders: data.Trader,
                                    selection: modifiedSelection
                                }));
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    }
                })
        }
    };

    const navigateToRegister = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'piedra-font', color: '#fff', fontSize: 40, letterSpacing: 1, marginBottom: 20 }}>REGISTRATION</Text>
            <Image
                source={{ uri: 'https://raw.githubusercontent.com/AJAX-Codder/cultivator/master/assets/Default_avatar.png' }}
                style={{
                    marginBottom: 20,
                    width: 120,
                    height: 120,
                    borderRadius: 120,
                    borderWidth: 5,
                    borderColor: '#fff'
                }}
            />
            <View style={styles.inputContainer}>
                <View style={[styles.input_group, !Vemail && { borderColor: '#C3533A' }]}>
                    <MaterialCommunityIcons
                        name="email"
                        size={28}
                        color="#fff"
                        style={{
                            paddingHorizontal: 8
                        }}
                    />
                    <TextInput
                        onFocus={() => setVEmail(true)}
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        inputMode="email"
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        placeholderTextColor="#BDBFC2"
                    />
                    {!Vemail && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                </View>
                <View style={[styles.input_group, !Vname && { borderColor: '#C3533A' }]}>
                    <FontAwesome5
                        name="user-tie"
                        size={28}
                        color="#fff"
                        style={{
                            paddingHorizontal: 10
                        }}
                    />
                    <TextInput
                        onFocus={() => setVName(true)}
                        style={styles.input}
                        placeholder="Username"
                        value={name}
                        inputMode="text"
                        onChangeText={setName}
                        placeholderTextColor="#BDBFC2"
                    />
                    {!Vname && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                </View>
                <View style={[styles.input_group, !Vtrade && { borderColor: '#C3533A' }]}>
                    <Ionicons
                        name="business"
                        size={28}
                        color="#fff"
                        style={{
                            paddingHorizontal: 8
                        }}
                    />
                    <TextInput
                        onFocus={() => setVTrade(true)}
                        style={styles.input}
                        placeholder="Trade Name"
                        value={trade}
                        onChangeText={setTrade}
                        placeholderTextColor="#BDBFC2"
                    />
                    {!Vtrade && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                </View>
                <View style={[styles.input_group, !Vpassword && { borderColor: '#C3533A' }]}>
                    <FontAwesome5
                        name="lock"
                        size={26}
                        color="#fff"
                        style={{
                            paddingHorizontal: 8,
                            paddingLeft: 12
                        }}
                    />
                    <TextInput
                        onFocus={() => setVPassword(true)}
                        style={styles.input}
                        placeholder="New Password"
                        secureTextEntry
                        value={password}
                        importantForAutofill="yes"
                        onChangeText={setPassword}
                        placeholderTextColor="#BDBFC2"
                    />
                    {!Vpassword && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                </View>
                <View style={styles.input_group}>
                    <FontAwesome5
                        name="lock"
                        size={26}
                        color="#fff"
                        style={{
                            paddingHorizontal: 8,
                            paddingLeft: 12
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Re-type Password"
                        secureTextEntry
                        value={repassword}
                        onChangeText={setRePassword}
                        placeholderTextColor="#BDBFC2"
                    />
                </View>
            </View>
            <View style={{ width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={handleRegister} style={styles.button}>
                    {isLoading ? (
                        <ActivityIndicator color="#FFFFFF" /> // Display the loading indicator
                    ) : (
                        <Text style={styles.buttonText}>Register</Text>
                    )}
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={navigateToRegister} style={{ marginTop: 10 }}>
                <Text style={styles.buttonText}>
                    Already Have Account ? <FontAwesome5 name="hand-point-left" size={24} color="white" />
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#31363C',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20
    },
    inputContainer: {
        marginBottom: 20
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
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: 10
    },
    button: {
        width: 150,
        backgroundColor: '#1F242B',
        paddingHorizontal: 45,
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default RegisterScreen;

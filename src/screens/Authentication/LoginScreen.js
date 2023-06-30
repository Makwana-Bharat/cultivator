import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome5, Entypo, MaterialIcons, Feather } from '@expo/vector-icons';
import { setSignIn, ModifySelection } from '../../redux/slices/authSlice';
import VerifyOTP from './VerifyOTP';
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../../config/URL';
import { Snackbar } from 'react-native-paper';
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [userType, setUserType] = useState('Trader');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [Vemail, setVEmail] = useState(true);
    const [Vpassword, setVPassword] = useState(true);
    const [VmobileNumber, setVMobileNumber] = useState(true);
    const [visibleMsg, setVisibleMsg] = useState(false);
    const [response, setResponse] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const validateInputs = (Type) => {
        let valid = true;
        if (Type === 'Trader') {
            if (email === '' || email.trim() === '') {
                setVEmail(false);
                valid = false;
            }
            if (password === '' || password.length < 6) {
                setVPassword(false);
                valid = false;
            }
        } else {
            if (mobileNumber.length !== 10) {
                setVMobileNumber(false);
                valid = false;
            }
        }
        return valid;
    };

    const handleLogin = async () => {
        if (!validateInputs(userType))
            return;
        setLoading(true);
        if (userType === 'Trader') {
            try {
                await fetch(`${URL}/APIS/Authentication/Login.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `email=${email}&password=${password}`
                })
                    .then(response => response.json())
                    .then(data => {
                        setVisibleMsg(true);
                        setResponse(data.status);
                        if (data.status == "error") {
                            setEmail('');
                            setPassword('');
                            AsyncStorage.removeItem('Auth');
                        }
                        else {
                            AsyncStorage.setItem('Auth', data.Trader.SID);
                            setTimeout(() => {
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
                            }, 1000);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } catch (error) {
                setEmail('');
                setPassword('');
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('wrong')
            } finally {
                setLoading(false);
            }
        } else {
            alert('સર્વિસ ઉપલબ્ધ નથી.. ')
            setLoading(false);
        }
    };

    const navigateToScreen = (screen) => {
        navigation.navigate(screen);
    };
    if (loading2) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color={"#fff"} size={"large"} />
            </View>
        )
    }
    else
        return (
            <View style={styles.container}>
                <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                <Text style={{ fontFamily: 'piedra-font', color: '#fff', fontSize: 50, letterSpacing: 1, marginBottom: 20 }}>LOGIN</Text>
                <View style={styles.typeSelection}>
                    <TouchableOpacity
                        style={[styles.radioButton, userType === 'Trader' && styles.radioButtonSelected]}
                        onPress={() => setUserType('Trader')}
                    >
                        <Text style={{ color: !userType == 'Farmer' ? '#fff' : '#BDBFC2', fontWeight: 'bold', letterSpacing: 1, fontSize: 16 }}>Trader</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.radioButton, userType === 'Farmer' && styles.radioButtonSelected]}
                        onPress={() => setUserType('Farmer')}
                    >
                        <Text style={{ color: userType == 'Farmer' ? '#fff' : '#BDBFC2', fontWeight: 'bold', letterSpacing: 1, fontSize: 16 }}>Farmer</Text>
                    </TouchableOpacity>
                </View>
                {userType === 'Trader' ? (
                    <View style={styles.inputContainer}>
                        <View style={[styles.input_group, !Vemail && { borderColor: '#C3533A' }]}>
                            <MaterialCommunityIcons name="email" size={28} color="#fff" style={{
                                paddingHorizontal: 8
                            }} />
                            <TextInput
                                onFocus={() => setVEmail(true)}
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                inputMode='email'
                                keyboardType='email-address'
                                onChangeText={setEmail}
                                placeholderTextColor="#BDBFC2"
                            />
                            {!Vemail && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                        </View>
                        <View style={[styles.input_group, !Vpassword && { borderColor: '#C3533A' }]}>
                            <FontAwesome5 name="lock" size={26} color="#fff" style={{
                                paddingHorizontal: 11
                            }} />
                            <TextInput
                                onFocus={() => setVPassword(true)}
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry
                                value={password}
                                importantForAutofill='yes'
                                onChangeText={setPassword}
                                placeholderTextColor="#BDBFC2"
                            />
                            {!Vpassword && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                        </View>

                        <TouchableOpacity onPress={() => navigateToScreen('Forget')} style={styles.createNew}>
                            <Text style={{ color: '#BDBFC2' }}> Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.inputContainer}>
                        <View style={[styles.input_group, !VmobileNumber && { borderColor: '#C3533A' }]}>
                            <Entypo name="old-phone" size={28} color="#fff" style={{
                                paddingHorizontal: 8
                            }} />
                            <TextInput
                                onFocus={() => setVMobileNumber(true)}
                                style={styles.input}
                                placeholder="Mobile Number"
                                value={mobileNumber}
                                inputMode='numeric'
                                keyboardType='numeric'
                                onChangeText={(text) => { setVMobileNumber(true), setMobileNumber(text) }}
                            />
                            {!VmobileNumber && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                        </View>
                    </View>
                )}
                <View style={{ width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFFFFF" /> // Show loader if loading state is true
                        ) : (
                            <Text style={styles.buttonText}>{userType === 'Trader' ? 'Login' : 'Send OTP'}</Text>
                        )}
                    </TouchableOpacity>
                </View>
                {userType === 'Trader' ? (
                    <TouchableOpacity onPress={() => navigateToScreen('Register')} style={{ marginTop: 50 }}>
                        <Text style={styles.buttonText}><FontAwesome5 name="hand-point-right" size={24} color="white" />  New Trader ? </Text>
                    </TouchableOpacity>
                ) : null}
                <VerifyOTP isVisible={isVisible} setVisible={setVisible} code={confirm} setcode={setConfirm} />
                <Snackbar
                    style={{ backgroundColor: '#1F242B', }}
                    visible={visibleMsg}
                    onDismiss={() => setVisibleMsg(false)}>
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10, paddingVertical: 2 }}>
                        <Text style={{ color: response !== "error" ? '#79B046' : '#E57158', fontWeight: 'bold', letterSpacing: .8 }}>{response !== "error" ? `Successfully Login` : 'invalid email or password..!'}</Text>
                        {response !== "error" && <Feather name='check-circle' color={'#79B046'} size={19} />}
                        {response === "error" && <MaterialIcons name='error-outline' color={'#E57158'} size={19} />}
                    </View>
                </Snackbar>
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#31363C',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
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
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#1F242B',
        paddingHorizontal: 35,
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
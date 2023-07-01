import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import URL from '../../../config/URL';
const Verify = (props) => {
    const [OTP, setOTP] = useState([0, 0, 0, 0, 0, 0]);
    const [otpInput, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const naviation = useNavigation();
    const [visibleMsg, setVisibleMsg] = useState(false);
    const [msg, setMsg] = useState('');
    const [response, setResponse] = useState(false);
    const credential = props.route.params.email;
    const verifyOTP = async () => {
        setLoading(true);
        await fetch(`${URL}/PHP/Verify_OTP.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `UserOTP=${otpInput}`
        })
            .then(response => response.json())
            .then(data => {
                setResponse(data.status);
                setVisibleMsg(true);
                if (data.status == "success") {
                    setMsg("Registration Done..");
                    fetch(`${URL}/APIS/Authentication/Register.php`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `name=${props.route.params.name}&email=${props.route.params.email}&password=${props.route.params.password}&trade=${props.route.params.trade}&trade_img=${'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/e/10e6c0a439e17280a6f3fa6ae059819af5517efd.png'}`
                    }).then(response => response.json())
                        .then(async data => {
                            setResponse(data.status);
                            setVisibleMsg(true)
                        })
                    setTimeout(() => {
                        (data.status !== "error") && naviation.navigate('Login');
                    }, 2000);
                }
                else
                    setMsg(data.message);
            }).finally(() => {
                setLoading(false);
            });
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => naviation.navigate('Login')} style={{ position: 'absolute', top: 30, left: 20 }}>
                <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'piedra-font', color: '#fff', fontSize: 40, letterSpacing: 1, marginBottom: 80 }}>
                Verify OTP
            </Text>
            <Image source={require('../../../assets/logo.png')} style={styles.logo} />
            <Text style={{ color: 'rgba(255,255,255,.5)', fontSize: 16, marginBottom: 20, lineHeight: 25, textAlign: 'center', width: 350 }}>we have send the OTP on<Text style={{ color: 'rgba(255,255,255,.9)', fontWeight: 'bold' }}> {credential}</Text></Text>
            <View style={[styles.inputContainer, { height: 50 }]}>
                <View style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', width: 300 }}>
                    {OTP.map((digit, index) => (
                        <View
                            key={index}
                            style={{
                                borderBottomColor: index === otpInput.length ? '#1F242B' : 'rgba(255,255,255,.5)',
                                borderBottomWidth: index === otpInput.length ? 5 : 2,
                                width: 40,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 28, color: OTP.reduce((acc, digit) => acc + digit) > 0 && index < otpInput.length ? '#fff' : 'rgba(255,255,255,.5)', fontWeight: 'bold' }}>{digit}</Text>
                        </View>
                    ))}
                </View>
                <TextInput
                    style={{ borderColor: 'red', borderWidth: 1, width: 250, position: 'relative', top: -40, height: 50, width: 300, opacity: 0 }}
                    value={otpInput}
                    keyboardType="number-pad"
                    maxLength={6}
                    onChangeText={(text) => {
                        const digits = text.split('').map(Number);
                        const updatedOTP = [...OTP];
                        for (let i = 0; i < updatedOTP.length; i++) {
                            updatedOTP[i] = digits[i] || 0;
                        }
                        setOtp(text);
                        setOTP(updatedOTP);
                    }}
                />

            </View>
            <Text style={{ color: 'rgba(255,255,255,.5)', fontSize: 16, lineHeight: 25, textAlign: 'center', position: 'relative', top: -20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>if you don't receive a code!
                <Text style={{ color: 'rgba(255,255,255,.9)', fontWeight: 'bold', fontSize: 16 }} onPress={() => { }}> Resend</Text>
            </Text>
            <View style={{ width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={verifyOTP} style={styles.button}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" /> // Show loader if loading state is true
                    ) : (
                        <Text style={styles.buttonText}>{'Verify OTP'}</Text>
                    )}
                </TouchableOpacity>
            </View>
            <Snackbar
                style={{ backgroundColor: '#1F242B', position: 'absolute', bottom: 0, left: 0 }}
                visible={visibleMsg}
                onDismiss={() => setVisibleMsg(false)}>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10, paddingVertical: 2 }}>
                    <Text style={{ color: response !== "error" ? '#79B046' : '#E57158', fontWeight: 'bold', letterSpacing: .8 }}>{msg}</Text>
                    {response !== "error" && <Feather name='check-circle' color={'#79B046'} size={19} />}
                    {response === "error" && <MaterialIcons name='error-outline' color={'#E57158'} size={19} />}
                </View>
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45,
    },
    borderStyleHighLighted: {
        borderColor: '#03DAC6',
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },
    underlineStyleHighLighted: {
        borderColor: '#03DAC6',
    },
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
        marginBottom: 10,
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
        marginTop: 50,
        width: '100%',
        backgroundColor: '#1F242B',
        paddingHorizontal: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Verify;

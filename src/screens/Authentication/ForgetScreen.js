import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome5, AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import URL from '../../../config/URL';
import { Snackbar } from 'react-native-paper';
import VerifyOTP from './VerifyOTP';
const ForgetScreen = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [visibleMsg, setVisibleMsg] = useState(false);
    const [msg, setMsg] = useState('');
    const [response, setResponse] = useState(false);
    const navigation = useNavigation();
    const handleForget = async () => {
        setLoading(true)
        await fetch(`${URL}/PHP/ChangePass.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `EMAIL=${email}`
        })
            .then(response => response.json())
            .then(data => {
                setResponse(data.status);
                setMsg(data.message + " check your mail");
                setVisibleMsg(true);
                setTimeout(() => {
                    (data.status !== "error") && setVisible(true);
                }, 1000);
            }).finally(() => {
                setLoading(false);
            });
    };
    const navigateToScreen = (screen) => {
        navigation.navigate(screen);
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigateToScreen('Login')} style={{
                position: 'absolute',
                top: 30,
                left: 20
            }} >
                <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <Image source={require('../../../assets/logo.png')} style={styles.logo} />
            <Text style={{ fontFamily: 'piedra-font', color: '#fff', fontSize: 40, letterSpacing: 1, marginBottom: 20 }}>Forgot Password</Text>
            <View style={styles.inputContainer}>
                <View style={styles.input_group}>
                    <MaterialCommunityIcons name="email" size={28} color="#fff" style={{
                        paddingHorizontal: 8
                    }} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        inputMode='email'
                        keyboardType='email-address'
                        onChangeText={setEmail}
                        placeholderTextColor="#BDBFC2"
                    />
                </View>
            </View>
            <View style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={handleForget} style={styles.button}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" /> // Show loader if loading state is true
                    ) : (<Text style={styles.buttonText}>Send OTP</Text>
                    )}
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigateToScreen('Register')} style={{ position: 'absolute', bottom: 10 }}>
                <Text style={styles.buttonText}><FontAwesome5 name="hand-point-right" size={24} color="white" />  New Trader ? </Text>
            </TouchableOpacity>
            <VerifyOTP isVisible={isVisible} setVisible={setVisible} />
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

export default ForgetScreen;
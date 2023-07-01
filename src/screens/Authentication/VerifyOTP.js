import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { Modal } from 'react-native-paper';
import URL from '../../../config/URL';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
const VerifyOTP = ({ isVisible, setVisible }) => {
    const [isLoading, setLoading] = useState(false);
    const [OTP, setOTP] = useState();
    const [visibleMsg, setVisibleMsg] = useState(false);
    const [msg, setMsg] = useState('');
    const [response, setResponse] = useState(false);
    const naviation = useNavigation();
    const Verify = async () => {
        setLoading(true);
        await fetch(`${URL}/PHP/Verify_OTP.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `UserOTP=${OTP}`
        })
            .then(response => response.json())
            .then(data => {
                setResponse(data.status);
                setMsg(data.message);
                setVisibleMsg(true);
                setTimeout(() => {
                    (data.status !== "error") && naviation.navigate('Reset');
                    setVisible(false);
                }, 2000);
            }).finally(() => {
                setLoading(false);
            });
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
                <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                <View style={styles.inputContainer}>
                    <View style={styles.input_group}>
                        <TextInput
                            style={styles.input}
                            placeholder="000000 "
                            value={OTP}
                            inputMode='numeric'
                            keyboardType='number-pad'
                            onChangeText={setOTP}
                            placeholderTextColor="#BDBFC2"
                        />
                    </View>
                </View>
                <View style={{ width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={Verify} style={styles.button} disabled={isLoading}>
                        {isLoading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>VerifyOTP</Text>
                        )}
                    </TouchableOpacity>
                </View>
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
        </Modal>
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
        width: 200,
        height: 45,
        color: '#fff',
        borderRadius: 10,
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

export default VerifyOTP;

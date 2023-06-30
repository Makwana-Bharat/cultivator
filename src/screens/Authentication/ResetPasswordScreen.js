import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { MaterialCommunityIcons, FontAwesome5, AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import URL from '../../../config/URL';
import { useNavigation } from '@react-navigation/native';
const ResetPasswordScreen = () => {
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    // validation
    const [validNewPassword, setValidNewPassword] = useState(true);
    const [validRepeatPassword, setValidRepeatPassword] = useState(true);
    // Other
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [response, setResponse] = useState('');
    const naviation = useNavigation();
    const resetPassword = async () => {
        let valid = true;

        if (newPassword.length < 6 || newPassword === '') {
            setValidNewPassword(false);
            valid = false;
        }

        if (repeatPassword !== newPassword) {
            setValidRepeatPassword(false);
            valid = false;
        }

        if (valid) {
            setIsLoading(true);
            await fetch(`${URL}/PHP/ChangePassord.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `Pass=${newPassword}`
            })
                .then(response => response.json())
                .then(data => {
                    setResponse(data.status);
                    setVisible(true);
                    setTimeout(() => {
                        setIsLoading(false);
                        setNewPassword('');
                        setRepeatPassword('');
                        naviation.navigate('Login')
                    }, 1000);
                })
            // Perform the password reset API request here
            // You can replace the following code with your actual API call
            // For demonstration purposes, we simulate a delay of 2 seconds
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'piedra-font', color: '#fff', fontSize: 32, letterSpacing: 1, marginBottom: 20 }}>
                CHANGE PASSWORD
            </Text>
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
            {/* Input fields for new password and repeat password */}
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => navigateToScreen('Login')} style={{
                    position: 'absolute',
                    top: 30,
                    left: 20
                }} >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <View style={[styles.input_group, !validNewPassword && { borderColor: '#C3533A' }]}>
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
                        onFocus={() => setValidNewPassword(true)}
                        style={styles.input}
                        placeholder="New Password"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholderTextColor="#BDBFC2"
                    />
                    {!validNewPassword && (
                        <MaterialIcons name="error" size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />
                    )}
                </View>
                <View style={[styles.input_group, !validRepeatPassword && { borderColor: '#C3533A' }]}>
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
                        placeholder="Repeat Password"
                        secureTextEntry
                        value={repeatPassword}
                        onChangeText={setRepeatPassword}
                        placeholderTextColor="#BDBFC2"
                    />
                    {!validRepeatPassword && (
                        <MaterialIcons name="error" size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />
                    )}
                </View>
            </View>

            <View
                style={{
                    width: '80%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                }}
            >
                <TouchableOpacity onPress={resetPassword} style={styles.button}>
                    {isLoading ? (
                        <ActivityIndicator color="#FFFFFF" /> // Display the loading indicator
                    ) : (
                        <Text style={styles.buttonText}>Change Password</Text>
                    )}
                </TouchableOpacity>
            </View>

            <Snackbar
                style={{ backgroundColor: '#1F242B' }}
                visible={visible}
                onDismiss={() => setVisible(false)}
            >
                <View
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingRight: 10,
                        paddingVertical: 2
                    }}
                >
                    <Text
                        style={{
                            color: response === 'success' ? '#79B046' : '#E57158',
                            fontWeight: 'bold',
                            letterSpacing: 0.8
                        }}
                    >
                        {response === 'success' ? 'Password reset successful!' : 'Password reset failed!'}
                    </Text>
                    {response === 'success' && <Feather name="check-circle" color={'#79B046'} size={19} />}
                    {response !== 'success' && <MaterialIcons name="error-outline" color={'#E57158'} size={19} />}
                </View>
            </Snackbar>
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
        width: 292,
        backgroundColor: '#1F242B',
        paddingHorizontal: 45,
        paddingVertical: 18,
        borderRadius: 5,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default ResetPasswordScreen;

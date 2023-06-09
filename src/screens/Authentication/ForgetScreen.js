import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import app from '../../../config/firebase';
const auth = getAuth(app);
const ForgetScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [userType, setUserType] = useState('Trader');
    const navigation = useNavigation();

    const handleForget = () => {
        // Handle Forget logic here
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent');
                // Navigate to a success/reset password confirmation screen if needed
            })
            .catch((error) => {
                // if (error == " [FirebaseError: Firebase: Error (auth/user-not-found).] ")
                alert('Please Register First...');
                // console.log(error)
                // Handle the error, show an error message, etc.
            }).finally(() => navigateToScreen('Login'));
    };

    const navigateToScreen = (screen) => {
        navigation.navigate(screen); // Replace 'Register' with the appropriate screen name for your register screen
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
            <Image source={require('../../../assets/Forget_Password.png')} alt='Forgot Password' style={styles.title} />
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
                    <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigateToScreen('Register')} style={{ position: 'absolute', bottom: 10 }}>
                <Text style={styles.buttonText}><FontAwesome5 name="hand-point-right" size={24} color="white" />  New Trader ? </Text>
            </TouchableOpacity>
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
        width: '105%',
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
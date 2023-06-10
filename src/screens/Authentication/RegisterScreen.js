import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../../../config/firebase';

const auth = getAuth(app);
const db = getFirestore();

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
        Alert.alert("સર્વિસ ઉપલબ્ધ નથી.. સંપર્ક +91 9409450471  ");
        return;
        /*

        Tempory Comment Until Payment Module
        
        */

        if (!validateInputs()) {
            return;
        }
        if (password !== repassword) {
            alert("Passwords do not match");
            return;
        }

        setIsLoading(true); // Start the loading indicator

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userDetails = {
                    email: email,
                    name: name,
                    trade: trade,
                    Balance: 0,
                    tradeImg: "https://raw.githubusercontent.com/AJAX-Codder/cultivator/master/assets/Default_avatar.png"
                };
                addDoc(collection(db, 'Traders'), userDetails)
                    .then(() => {
                        setIsLoading(false); // Stop the loading indicator
                        Alert.alert('User registered successfully');
                        navigation.navigate('Login');
                    })
                    .catch((error) => {
                        setIsLoading(false); // Stop the loading indicator
                        Alert.alert("Server is Busy...");
                        // Handle the error appropriately (e.g., display an error message).
                    });
            })
            .catch((error) => {
                setIsLoading(false); // Stop the loading indicator
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert("Something wrong...");
                // Handle the error appropriately (e.g., display an error message).
            });
    };

    const navigateToRegister = () => {
        navigation.navigate('Login'); // Replace 'Register' with the appropriate screen name for your register screen
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
    title: {
        marginBottom: 20
    },
    typeSelection: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    radioButton: {
        backgroundColor: '#53595F',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 5
    },
    radioButtonSelected: {
        backgroundColor: '#1F242B'
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
    createNew: {
        marginBottom: 10
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

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Modal } from 'react-native-paper';
const VerifyOTP = ({ isVisible, setVisible, code, setcode }) => {
    return <></>
    // const [isLoading, setLoading] = useState(false);
    // const [OTP, setOTP] = useState();
    // const Verify = () => {
    //     setLoading(true);
    //     code.confirm(OTP).then((result) => {
    //         Alert.alert("Success",
    //             "Verification Done..."
    //         )
    //     }).catch((error) => {
    //         Alert.alert('Error', 'Wrong OTP')
    //     }).finally(() => {
    //         setLoading(false)
    //         setVisible(false)
    //     })
    // };
    // return (
    //     <Modal animationType="slide" visible={isVisible} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //         <View style={styles.container}>
    //             <TouchableOpacity onPress={() => setVisible(false)} style={{
    //                 position: 'absolute',
    //                 top: 10,
    //                 right: 10,
    //                 backgroundColor: '#1F242B',
    //                 padding: 6,
    //                 borderRadius: 20
    //             }} >
    //                 <AntDesign name='close' size={18} color='#fff' />
    //             </TouchableOpacity>
    //             <Image source={require('../../../assets/logo.png')} style={styles.logo} />
    //             <View style={styles.inputContainer}>
    //                 <View style={styles.input_group}>
    //                     <TextInput
    //                         style={styles.input}
    //                         placeholder="000000 "
    //                         value={OTP}
    //                         inputMode='numeric'
    //                         keyboardType='number-pad'
    //                         onChangeText={setOTP}
    //                         placeholderTextColor="#BDBFC2"
    //                     />
    //                 </View>
    //             </View>
    //             <View style={{ width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
    //                 <TouchableOpacity onPress={Verify} style={styles.button} disabled={isLoading}>
    //                     {isLoading ? (
    //                         <ActivityIndicator color="#FFFFFF" />
    //                     ) : (
    //                         <Text style={styles.buttonText}>VerifyOTP</Text>
    //                     )}
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     </Modal>
    // );
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

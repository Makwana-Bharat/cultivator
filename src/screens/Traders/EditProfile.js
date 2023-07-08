import React from 'react'
import { useSelector } from 'react-redux';
import { View, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, Text } from "react-native";
import { FontAwesome5, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
const width = Dimensions.get("screen").width;
const EditProfile = () => {
    const user = useSelector(state => state.userAuth);
    const [name, setName] = useState(user.traders.NAME);
    const [trade, setTrade] = useState(user.traders.TRADE);
    //validation
    const [Vname, setVName] = useState(true);
    const [Vtrade, setVTrade] = useState(true);
    useEffect(() => {
        setName(user.traders.NAME)
        setTrade(user.traders.TRADE)
    }, [])
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Dashboard")}
                style={{
                    position: 'absolute',
                    top: 30,
                    left: 20,
                    backgroundColor: '#1F242B',
                    padding: 6,
                    borderRadius: 20,
                    zIndex: 9999
                }}
            >
                <AntDesign name="arrowleft" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'piedra-font', color: '#fff', fontSize: 40, letterSpacing: 1, marginTop: 90, zIndex: 9999 }}>EDIT PROFILE</Text>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: user.traders.TRADE_IMG }}
                    style={{
                        position: 'absolute',
                        bottom: -50,
                        left: 200 - 50,
                        width: 220,
                        height: 220,
                        borderRadius: 220 / 2,
                        borderColor: '#fff',
                        borderWidth: 5,
                    }}
                />
                <TouchableOpacity style={{
                    backgroundColor: 'rgba(255,255,255,.6)', padding: 2, borderRadius: 50, width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center',
                    position: 'absolute',
                    bottom: -50,
                    left: 300
                }}
                >
                    <FontAwesome5 name="pen" size={20} color={'#31363C'} />
                </TouchableOpacity>
            </View>
            <View style={{ width: "100%", display: 'flex', alignItems: 'center', paddingTop: 150, position: 'absolute', bottom: 100 }}>
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
                <View style={styles.input_group}>
                    <FontAwesome name="rupee" size={28} color="#fff" style={{ paddingHorizontal: 15 }} />
                    <TextInput
                        style={styles.input}
                        placeholder="00000"
                        value={Object.values(user.traders.Farmer).reduce((acc, farmer) => acc + Number(farmer.Balance), 0).toString()}
                        keyboardType='number-pad'
                        placeholderTextColor="#BDBFC2"
                    />
                </View>
                <View
                    style={{
                        width: '80%',
                        flexDirection: 'row',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        paddingTop: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Dashboard")}
                        style={[
                            styles.button,
                            { backgroundColor: 'rgba(255,255,255,.1)', borderColor: '#8ABA5D' },
                        ]}
                    >
                        <Text style={[styles.buttonText, { color: "rgba(255,255,255,.7)" }]}>રદ કરો </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: '#8ABA5D', borderColor: '#8ABA5D' },
                        ]}
                    >
                        <Text style={styles.buttonText}>સુધારો </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#31363C',
        flex: 1,
        alignItems: 'center',
    },
    profileContainer: {
        backgroundColor: '#1F242B',
        position: 'absolute',
        top: -250,
        height: width + 250,
        width: width + 150,
        borderRadius: width
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

export default EditProfile;

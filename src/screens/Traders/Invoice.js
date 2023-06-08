import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Entypo, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import NewEntry from './NewEntry';
import { useSelector } from 'react-redux';
import { selectBillHeading } from '../../redux/slices/setting';
import { selectedFarmerName, selectedFarmerVillage } from '../../redux/slices/farmerSlice';
import BillEntry from './BillEntry';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../../../config/firebase';
import { getAuth } from 'firebase/auth';
const auth = getAuth(app);
const db = getFirestore();
export const Invoice = (props) => {
    let str = props.route.params.path;
    const farmerIndex = str.indexOf('Farmer') + 'Farmer'.length;
    const yearlyIndex = str.indexOf('Yearly');
    const cropsIndex = str.indexOf('Crops');
    const [isVisible, setVisible] = useState(false)
    const Header = useSelector(selectBillHeading);
    const farmerName = useSelector(selectedFarmerName);
    const farmerVillage = useSelector(selectedFarmerVillage);
    const farmerId = str.substring(farmerIndex + 1, yearlyIndex - 1);
    const yearId = str.substring(yearlyIndex + 'Yearly'.length + 1, cropsIndex - 1);
    const today = new Date().toLocaleDateString('en-GB');
    const [Debit, setDebit] = useState([]);
    const [Credit, setCredit] = useState([]);
    const [loading, setLoading] = useState(true);
    const udhar = collection(db, `${str}/ઉધાર/`);
    const jama = collection(db, `${str}/જમા`);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshotUdhar = await getDocs(udhar);
                if (!querySnapshotUdhar.empty) {
                    querySnapshotUdhar.docs.forEach((i) => console.log(i.id))
                    const UdharEntry = querySnapshotUdhar.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }));
                    setDebit(UdharEntry);
                }
                const querySnapshotJama = await getDocs(jama);
                if (!querySnapshotJama.empty) {
                    const JamaEntry = querySnapshotJama.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }));
                    setCredit(JamaEntry);
                }
            } catch (error) {
                console.log(error)
                Alert.alert('Error retrieving user data:');
            } finally {
                setLoading(false); // Set loading to false when data is fetched
            }
        };
        fetchData();
    }, []);
    return (
        <View style={styles.container}>
            {
                loading ? <ActivityIndicator color={'#fff'} /> :
                    <View style={{ flex: 1 }}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')}>
                                <Text style={styles.headerText}>ખેડૂતમિત્રો</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('Yearly', { 'farmerId': farmerId })}>
                                <Text style={styles.headerText}>/વર્ષો</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Crops', { 'farmerId': farmerId, year: props.route.params.year, 'yearId': yearId })}>
                                <Text style={styles.headerText}>/{props.route.params.year}</Text>
                            </TouchableOpacity>
                            <Text style={styles.headerText}>/{props.route.params.crop}</Text>
                        </View>

                        {/** Invoice */}
                        <View style={{ backgroundColor: 'rgba(255,255,255,.1)', height: '90%', borderRadius: 10, padding: 10 }}>
                            <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {Header && <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>રામદેવ ટ્રેડીંગ </Text>}
                                <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 10 }}>ખેડૂતનું નામ:</Text>
                                        <Text style={{ color: '#fff', fontSize: 10 }}>{farmerName.length > 20 ? farmerName.substring(0, 20) + '...' : farmerName} </Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 10 }}> ગામ :</Text>
                                        <Text style={{ color: '#fff', fontSize: 10, marginRight: 5 }}> {farmerVillage} </Text>
                                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 10 }}>તારીખ:</Text>
                                        <Text style={{ color: '#fff', fontSize: 9 }}> {today}  </Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ color: '#fff', fontSize: 10 }}>જમા </Text>
                                    <Text style={{ color: '#fff', fontSize: 10 }}>ઉધાર </Text>
                                </View>
                                <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    {
                                        Credit.length == 0 ? <Text> </Text> :
                                            <BillEntry Entrydata={Credit} />
                                    }
                                    {
                                        Debit.length == 0 ? <Text></Text> :
                                            <BillEntry Entrydata={Debit} />
                                    }
                                </View>
                                <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{
                                        width: '50%',
                                        flexDirection: 'column', // backgroundColor: '#000',
                                        padding: 10,
                                    }}>
                                        <View style={{
                                            width: '100%',
                                            display: 'flex',
                                            marginBottom: 5,
                                        }}>
                                            <View style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                width: "100%",
                                                justifyContent: 'space-between',
                                            }} >
                                                <Text style={{
                                                    color: '#fff',
                                                    fontSize: 7,
                                                    width: '20%',
                                                    padding: 2,
                                                    borderBottomColor: 'gray',
                                                    borderBottomWidth: 1,
                                                    borderTopColor: 'gray',
                                                    borderTopWidth: 1,
                                                    fontWeight: 'bold'
                                                }}>{Credit.reduce((total, entry) => eval(total + '+' + entry.data.Balace), 0)}</Text>
                                                <Text style={{
                                                    color: '#fff',
                                                    fontSize: 6,
                                                    width: '25%',
                                                    textAlign: 'center'
                                                }}></Text>
                                                <Text style={{
                                                    color: '#fff',
                                                    fontSize: 7,
                                                    width: '45%',
                                                    textAlign: 'left',
                                                    overflow: 'hidden',
                                                    paddingLeft: 10,
                                                }}></Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{
                                        width: '50%',
                                        flexDirection: 'column', // backgroundColor: '#000',
                                        padding: 10,
                                    }}>
                                        <View style={{
                                            width: '100%',
                                            display: 'flex',
                                            marginBottom: 5,
                                        }}>
                                            <View style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                width: "100%",
                                                justifyContent: 'space-between',
                                            }} >
                                                <Text style={{
                                                    color: '#fff',
                                                    fontSize: 7,
                                                    width: '20%',
                                                    padding: 2,
                                                    borderBottomColor: 'gray',
                                                    borderBottomWidth: 1,
                                                    borderTopColor: 'gray',
                                                    borderTopWidth: 1,
                                                    fontWeight: 'bold'
                                                }}>{Debit.reduce((total, entry) => eval(total + '+' + entry.data.Balace), 0)}</Text>
                                                <Text style={{
                                                    color: '#fff',
                                                    fontSize: 6,
                                                    width: '25%',
                                                    textAlign: 'center'
                                                }}></Text>
                                                <Text style={{
                                                    color: '#fff',
                                                    fontSize: 7,
                                                    width: '45%',
                                                    textAlign: 'left',
                                                    overflow: 'hidden',
                                                    paddingLeft: 10,
                                                }}></Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
            }
            <View style={styles.bottom}>
                <View style={{ width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: 10, alignItems: 'center' }}>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', width: '33%', justifyContent: 'space-around' }}>

                    <TouchableOpacity style={[styles.fab, { backgroundColor: '#793B97' }]}
                    >
                        <MaterialIcons name='print' size={24}
                            color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fab}
                        onPress={setVisible}
                    >
                        <FontAwesome5 name='plus' size={24}
                            color='white' />
                    </TouchableOpacity>
                </View>
            </View>
            <NewEntry isVisible={isVisible} setVisible={setVisible} path={str} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#31363C',
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 30,
        paddingBottom: 70,
    },
    header: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 600,
        letterSpacing: 1.5
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 15,
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '107%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#1F242B',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    fab: {
        height: 45,
        width: 45,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3787E5',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

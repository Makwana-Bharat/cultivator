import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import NewEntry from './NewEntry';
import { useSelector } from 'react-redux';
import { selectBillHeading } from '../../redux/slices/setting';
import { selectedFarmerName, selectedFarmerVillage } from '../../redux/slices/farmerSlice';
import BillEntry from './BillEntry';
import { getFirestore, collection, getDocs, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { BillStyles } from '../../StyleSheet/BillCSS';
import { getAuth } from 'firebase/auth';
import { pdfGenerator } from './pdfGenerator';
import { firebase } from '../../../config/firebase';
const auth = getAuth(firebase);
const db = getFirestore();
export const Invoice = (props) => {
    const farmerIndex = props.route.params.path.indexOf('Farmer') + 'Farmer'.length;
    const cropsIndex = props.route.params.path.indexOf('Folder');
    const farmerId = props.route.params.path.substring(farmerIndex + 1, cropsIndex - 1);
    const lastIndex = props.route.params.path.lastIndexOf('/');
    const CropDocumentPath = props.route.params.path.substring(0, lastIndex);
    const CropId = props.route.params.path.substring(lastIndex + 1);
    const cropRef = collection(db, CropDocumentPath);
    const CropDoc = doc(db, CropDocumentPath, CropId);
    const [isVisible, setVisible] = useState(false)
    const Header = useSelector(selectBillHeading);
    const farmerName = useSelector(selectedFarmerName);
    const farmerVillage = useSelector(selectedFarmerVillage);
    const today = new Date().toLocaleDateString('en-GB');
    const BillContainerEntry = () => {
        const [Udhar, setUdhar] = useState([]);
        const [Jama, setJama] = useState([]);
        const [UdharSum, setUdharSum] = useState("0000");
        const [JamaSum, setJamaSum] = useState("0000");
        useEffect(() => {
            const udhar = collection(db, `${props.route.params.path}/ઉધાર/`);
            const jama = collection(db, `${props.route.params.path}/જમા/`);

            const fetchData = async () => {
                try {
                    let money = 0;
                    const udharQuerySnapshot = await getDocs(udhar);
                    if (!udharQuerySnapshot.empty) {
                        const udharEntries = udharQuerySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }));
                        setUdhar(udharEntries);

                        const udharSum = udharEntries.reduce(
                            (sum, folder) => sum + parseInt(folder.data.Balance),
                            0
                        );
                        if (!isNaN(udharSum) && isFinite(udharSum)) {
                            setUdharSum(udharSum);
                            money -= udharSum;
                        }
                    } else {
                        setUdhar([]);
                        setUdharSum("0000");
                    }

                    const jamaQuerySnapshot = await getDocs(jama);
                    if (!jamaQuerySnapshot.empty) {
                        const jamaEntries = jamaQuerySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }));
                        setJama(jamaEntries);
                        const jamaSum = jamaEntries.reduce(
                            (sum, folder) => sum + parseInt(folder.data.Balance),
                            0
                        );
                        if (!isNaN(jamaSum) && isFinite(jamaSum)) {
                            setJamaSum(jamaSum);
                            money += jamaSum;
                        }
                    } else {
                        setJama([]);
                        setJamaSum("0000");
                    }

                    const cropQuerySnapshot = await getDocs(cropRef);
                    if (!cropQuerySnapshot.empty) {
                        const cropDocs = cropQuerySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }));
                        const selectedData = cropDocs.find((item) => item.id === CropId)?.data;
                        if (selectedData) {
                            const updatedData = {
                                ...selectedData,
                                Balance: money,
                            };
                            try {
                                await updateDoc(CropDoc, updatedData);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                } catch (error) {
                    alert("કૃપયા કરી નેટવર્ક ચેક ફરી પ્રયત્ન કરો..,");
                }
            };
            const unsubscribeUdhar = onSnapshot(udhar, () => {
                fetchData();
            }, (error) => {
                console.error("Error retrieving udhar data:", error);
                setLoading(false);
            });
            const unsubscribeJama = onSnapshot(jama, () => {
                fetchData();
            }, (error) => {
                console.error("Error retrieving jama data:", error);
                setLoading(false);
            });
            fetchData();
            return () => {
                unsubscribeUdhar();
                unsubscribeJama();
            };
        }, []);
        return (
            <View style={{ display: 'flex', width: '100%' }}>
                <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <BillEntry Entrydata={Jama} />
                    <BillEntry Entrydata={Udhar} />
                </View>
                <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[BillStyles.container]}>
                        <View style={BillStyles.row}>
                            <View style={BillStyles.dataContainer}>
                                <Text style={[BillStyles.data1, { fontWeight: 'bold', borderBottomColor: '#fff', borderBottomWidth: .5, borderTopColor: '#fff', borderTopWidth: 1, padding: 2, width: '20%' }]}>{JamaSum}</Text>
                                <Text style={BillStyles.data2}></Text>
                                <Text style={BillStyles.data3}></Text>
                            </View>
                        </View>
                    </View>
                    <View style={BillStyles.container}>
                        <View style={BillStyles.row}>
                            <View style={BillStyles.dataContainer}>
                                <Text style={[BillStyles.data1, { fontWeight: 'bold', borderBottomColor: '#fff', borderBottomWidth: .5, borderTopColor: '#fff', borderTopWidth: 1, padding: 2, width: '20%' }]}>{UdharSum}</Text>
                                <Text style={BillStyles.data2}></Text>
                                <Text style={BillStyles.data3}></Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')}>
                        <Text style={styles.headerText}>અનુક્રમણિકા</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Crops', { 'farmerId': farmerId })}>
                        <Text style={styles.headerText}>/ખેડૂત</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>/ખાતાવહી</Text>
                </View>

                {/** Invoice*/}
                <View style={{ backgroundColor: 'rgba(255,255,255,.1)', height: '90%', borderRadius: 10, padding: 10 }}>
                    <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {Header && <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>રામદેવ ટ્રેડીંગ </Text>}
                        <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 9 }}>ખેડૂતનું નામ:</Text>
                                <Text style={{ color: '#fff', fontSize: 9 }}> {farmerName.length > 20 ? farmerName.substring(0, 20) + '...' : farmerName} </Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 9 }}> ગામ :</Text>
                                <Text style={{ color: '#fff', fontSize: 9, marginRight: 5 }}> {farmerVillage} </Text>
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 9 }}>તારીખ:</Text>
                                <Text style={{ color: '#fff', fontSize: 8 }}> {today}  </Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', fontSize: 10 }}>જમા </Text>
                            <Text style={{ color: '#fff', fontSize: 10 }}>ઉધાર </Text>
                        </View>
                        <BillContainerEntry />
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={{ width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: 10, alignItems: 'center' }}>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', width: '33%', justifyContent: 'space-around' }}>

                    <TouchableOpacity style={[styles.fab, { backgroundColor: '#793B97' }]}
                        onPress={() => pdfGenerator({ Header, farmerName, farmerVillage, today, props })}
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
            <NewEntry isVisible={isVisible} setVisible={setVisible} path={props.route.params.path} />
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

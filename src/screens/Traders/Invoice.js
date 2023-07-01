import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import NewEntry from './NewEntry';
import { useDispatch, useSelector } from 'react-redux';
import { selectBillHeading } from '../../redux/slices/setting';
import BillEntry from './BillEntry';
import { BillStyles } from '../../StyleSheet/BillCSS';
import { pdfGenerator } from './pdfGenerator';
import { selectTraders, selection, ModifySelection } from '../../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
export const Invoice = () => {
    const [isVisible, setVisible] = useState(false)
    const Header = useSelector(selectBillHeading);
    const trader = useSelector(selectTraders);
    const selectedIndex = useSelector(selection);
    const [UdharSum, setUdharSum] = useState(0);
    const [JamaSum, setJamaSum] = useState(0);
    const [Udhar, setUdhar] = useState({});
    const [Jama, setJama] = useState({});
    const dispatch = useDispatch();
    var Invoice = null;
    if (!(selectedIndex.FarmerIndex === null || selectedIndex.FarmerIndex === undefined || selectedIndex.FolderIndex === null || selectedIndex.FolderIndex === undefined || trader.Farmer[selectedIndex.FarmerIndex] === undefined || trader.Farmer[selectedIndex.FarmerIndex].Folder === undefined || trader.Farmer[selectedIndex.FarmerIndex].Folder[selectedIndex.FolderIndex] === undefined))
        Invoice = trader.Farmer[selectedIndex.FarmerIndex].Folder[selectedIndex.FolderIndex].Invoice;
    useEffect(() => {
        let udharTotal = 0;
        let jamaTotal = 0;
        if (Invoice == null)
            return;
        Object.keys(Invoice).forEach((key) => {
            const invoice = Invoice[key];
            if (invoice.TYPE === "ઉધાર") {
                setUdhar((prevUdhar) => ({ ...prevUdhar, [key]: invoice }));
                udharTotal += parseInt(invoice.RUPEE, 10); // Assuming RUPEE is the field for the amount
            } else {
                setJama((prevJama) => ({ ...prevJama, [key]: invoice }));
                jamaTotal += parseInt(invoice.RUPEE, 10); // Assuming RUPEE is the field for the amount
            }
        });
        setUdharSum(udharTotal);
        setJamaSum(jamaTotal);
    }, [Invoice]);
    const today = new Date().toLocaleDateString('en-GB');
    const BillContainerEntry = () => {
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
    const navigation = useNavigation();
    if ((selectedIndex.FarmerIndex === null || selectedIndex.FarmerIndex === undefined || selectedIndex.FolderIndex === null || selectedIndex.FolderIndex === undefined || trader.Farmer[selectedIndex.FarmerIndex] === undefined || trader.Farmer[selectedIndex.FarmerIndex].Folder === undefined || trader.Farmer[selectedIndex.FarmerIndex].Folder[selectedIndex.FolderIndex] === undefined))
        return <></>
    else
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Dashboard')
                        }}>
                            <Text style={styles.headerText}>અનુક્રમણિકા</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Folders');
                            }}>
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
                                    <Text style={{ color: '#fff', fontSize: 9 }}>
                                        {trader.Farmer[selectedIndex.FarmerIndex].Name.length > 20 ? trader.Farmer[selectedIndex.FarmerIndex].Name.substring(0, 20) + '...' : trader.Farmer[selectedIndex.FarmerIndex].Name}
                                    </Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 9 }}> ગામ :</Text>
                                    <Text style={{ color: '#fff', fontSize: 9, marginRight: 5 }}>
                                        {trader.Farmer[selectedIndex.FarmerIndex].Village}
                                    </Text>
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
                            onPress={() =>
                                pdfGenerator({
                                    Header,
                                    farmerName: trader.Farmer[selectedIndex.FarmerIndex].Name,
                                    farmerVillage: trader.Farmer[selectedIndex.FarmerIndex].Village,
                                    today,
                                    udharEntries: Object.values(Udhar),
                                    jamaEntries: Object.values(Jama),
                                    udharSum: UdharSum,
                                    jamaSum: JamaSum
                                })
                            }
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
                <NewEntry isVisible={isVisible} setVisible={setVisible} MFID={selectedIndex.FolderIndex} />
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

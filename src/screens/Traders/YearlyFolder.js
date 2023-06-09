import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, TextInput, Alert } from 'react-native';
import { MaterialCommunityIcons, FontAwesome, FontAwesome5, MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { Modal } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, deleteDoc, getDocs, setDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
// import { selectFarmer, selectFolder } from '../../redux/slices/farmerSlice';
import app from '../../../config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import DateSpinner from './YearSpinner';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles, DeleteStyles, ReadFarmerStyles, UpdateFarmerStyles } from '../../StyleSheet/YearlyFolder';
// import ViewFarmerInfo from './Year/ViewFarmerInfo';
// import DeleteFarmer from './Year/DeleteFarmer';
const auth = getAuth(app);
const db = getFirestore();

export const YearlyFolder = (props) => {
    const farmerId = props.route.params.farmerId;
    const [showCalendar, setShowCalendar] = useState(false);
    const id = useSelector(state => state.userAuth.id);
    const YearDocumentPath = `Traders/${id}/Farmer/${farmerId}/Yearly/`;
    const FolderRef = collection(db, YearDocumentPath);
    const [ViewInfo, setViewInfo] = useState(false);
    const [UpdateInfo, setUpdateInfo] = useState(false);
    const [DeleteInfo, setDeleteInfo] = useState(false);
    const [DeleteFolderInfo, setDeleteFolderInfo] = useState(false);
    const [folderId, setFolderId] = useState();
    const [sum, setSum] = useState(0);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const openCalendar = () => {
        setShowCalendar(true);
    };

    const closeCalendar = () => {
        setShowCalendar(false);
    };

    const Modify = (folderId) => {
        alert(folderId)
    }
    const handleYearSelection = (year) => {
        closeCalendar();
        const YearlyFolderDetails = {
            year: year.getFullYear(),
            Balance: 0
        };
        const collectionRef = collection(db, YearDocumentPath);
        const documentId = year.getFullYear().toString(); // Convert year to string for document ID
        const data = YearlyFolderDetails;
        setDoc(doc(collectionRef, documentId), data)
            .then(() => {
                Alert.alert('Success', 'Folder Created');
            })
            .catch((error) => {
                Alert.alert('Server is Busy...');
            })
    };

    /* Reade Farmer */
    const ViewFarmerInfo = ({ isVisible, setVisible, path, farmerId }) => {
        const usersRef = collection(db, path);
        const [selectedFarmer, setSelectedFarmer] = useState({ data: {} });
        const [isLoading, setLoading] = useState(true);
        useEffect(() => {
            const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const FarmerDocs = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }));
                    const selectedData = FarmerDocs.find(item => item.id === farmerId);
                    setSelectedFarmer(selectedData)
                    setLoading(false)
                }
                else
                    setLoading(false)
            }, (error) => {
                console.error('Error retrieving user data:', error);
                // setLoading(false)
            })
            return () => unsubscribe();
        }, []);
        return (
            <Modal animationType="slide" visible={isVisible} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    isLoading ?
                        <View style={ReadFarmerStyles.container}><ActivityIndicator color={"#fff"} /></View> :
                        selectedFarmer != undefined ? <View style={ReadFarmerStyles.container}>
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

                            <Image source={{ uri: selectedFarmer.data.Image }} style={{
                                marginTop: 50, marginBottom: 20, width: 120, height: 120, borderRadius: 120, borderWidth: 5, borderColor: '#fff'
                            }} />
                            <View style={ReadFarmerStyles.inputContainer}>
                                <View style={[ReadFarmerStyles.input_group]}>
                                    <FontAwesome5 name="user-tie" size={28} color="#fff" style={{
                                        paddingHorizontal: 8
                                    }} />
                                    <TextInput
                                        style={ReadFarmerStyles.input}
                                        placeholder="ખેડૂતનામ "
                                        value={selectedFarmer.data.Name}
                                        placeholderTextColor="#BDBFC2"

                                    />
                                </View>
                                <View style={[ReadFarmerStyles.input_group]}>
                                    <FontAwesome5 name="map-marked-alt" size={24} color="#fff" style={{
                                        paddingHorizontal: 8
                                    }} />
                                    <TextInput
                                        style={ReadFarmerStyles.input}
                                        placeholder="ગામ  "
                                        value={selectedFarmer.data.Village}
                                        placeholderTextColor="#BDBFC2"
                                    />
                                </View>
                                <View style={[ReadFarmerStyles.input_group]}>
                                    <Entypo name="old-phone" size={28} color="#fff" style={{
                                        paddingHorizontal: 8
                                    }} />
                                    <TextInput
                                        style={ReadFarmerStyles.input}
                                        placeholder="0000000000"
                                        value={selectedFarmer.data.MobileNo}
                                        placeholderTextColor="#BDBFC2"
                                    />
                                </View>
                                <View style={[ReadFarmerStyles.input_group]}>
                                    <FontAwesome name="rupee" size={28} color="#fff" style={{
                                        paddingHorizontal: 15
                                    }} />
                                    <TextInput
                                        style={ReadFarmerStyles.input}
                                        placeholder="0000000000"
                                        value={selectedFarmer.data.Balance && selectedFarmer.data.Balance.toString()}
                                        placeholderTextColor="#BDBFC2"
                                    />
                                </View>
                            </View>
                        </View> :
                            <View style={ReadFarmerStyles.container}>
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
                                <ActivityIndicator color={"#FFF"} size={'large'} />
                            </View>}
            </Modal>
        );

    };

    /* Update Farmer*/
    const UpdateFarmerInfo = ({ isVisible, setVisible, path, farmerId }) => {
        const usersRef = collection(db, path);
        const [selectedFarmer, setSelectedFarmer] = useState();
        const [isLoading, setLoading] = useState(false); // Added isLoading state
        const [name, setName] = useState()
        const [village, setVillage] = useState()
        const [mobileNumber, setMobileNumber] = useState()
        const [balance, setBalance] = useState()
        const [Vname, setVName] = useState(true);
        const [VmobileNumber, setVMobileNumber] = useState(true);
        const [Vvillage, setVVillage] = useState(true);
        useEffect(() => {
            const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const FarmerDocs = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }));
                    const selectedData = FarmerDocs.find(item => item.id === farmerId);
                    setName(selectedData.data.Name)
                    setVillage(selectedData.data.Village)
                    setBalance(selectedData.data.Balance)
                    setMobileNumber(selectedData.data.MobileNo)
                    setSelectedFarmer(selectedData)

                }
            }, (error) => {
                setVisible(false)
                console.error('Error retrieving user data:', error);
            })

        }, []);
        const validateInputs = () => {
            let valid = true;
            if (name == '') {
                setVName(false);
                valid = false;
            }
            if (village == "") {
                setVVillage(false);
                valid = false;
            }
            if (mobileNumber.length != 10) {
                setVMobileNumber(false);
                valid = false;
            }
            return valid;
        };
        const handleFarmer = () => {
            if (!validateInputs()) {
                return;
            }
            setLoading(true); // Set loading state to true
            const newInfo = {
                Image: 'https://w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png',
                MobileNo: mobileNumber,
                Name: name,
                Village: village,
                Balance: balance
            }
            const FarmerDocumentPath = `Traders/${id}/Farmer`;
            const farmerRef = doc(db, FarmerDocumentPath, farmerId);
            updateDoc(farmerRef, newInfo)
                .then(() => {
                    alert('ખેડૂતની માહિતી સુધારાઈ..');
                })
                .catch((error) => {
                    // console.log(error);
                    alert('Server is Busy...');
                })
                .finally(() => {
                    setVisible(false)
                    setLoading(false); // Set loading state to false
                    navigation.navigate('Dashboard')
                });
        };
        return (
            <Modal animationType="slide" visible={isVisible} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    isLoading ?
                        <View style={ReadFarmerStyles.container}><ActivityIndicator color={"#fff"} /></View> :
                        selectedFarmer != undefined ? <View style={ReadFarmerStyles.container}>
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

                            <Image source={{ uri: selectedFarmer.data.Image }} style={{
                                marginTop: 20, marginBottom: 20, width: 120, height: 120, borderRadius: 120, borderWidth: 5, borderColor: '#fff'
                            }} />
                            <View style={UpdateFarmerStyles.inputContainer}>
                                <View style={[UpdateFarmerStyles.input_group, !Vname && { borderColor: '#C3533A' }]}>
                                    <FontAwesome5 name="user-tie" size={28} color="#fff" style={{
                                        paddingHorizontal: 8
                                    }} />
                                    <TextInput
                                        style={UpdateFarmerStyles.input}
                                        placeholder="ખેડૂતનામ "
                                        value={name}
                                        placeholderTextColor="#BDBFC2"
                                        onChange={(e) => {
                                            e.persist();
                                            setName(e.nativeEvent.text);
                                        }}
                                    />
                                    {!Vname && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                                </View>
                                <View style={[UpdateFarmerStyles.input_group, !Vvillage && { borderColor: '#C3533A' }]}>
                                    <FontAwesome5 name="map-marked-alt" size={24} color="#fff" style={{
                                        paddingHorizontal: 8
                                    }} />
                                    <TextInput
                                        style={UpdateFarmerStyles.input}
                                        placeholder="ગામ  "
                                        value={village}
                                        placeholderTextColor="#BDBFC2"
                                        onChange={(e) => {
                                            e.persist();
                                            setVillage(e.nativeEvent.text);
                                        }}
                                    />
                                    {!Vvillage && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                                </View>
                                <View style={[UpdateFarmerStyles.input_group, !VmobileNumber && { borderColor: '#C3533A' }]}>
                                    <Entypo name="old-phone" size={28} color="#fff" style={{
                                        paddingHorizontal: 8
                                    }} />
                                    <TextInput
                                        style={UpdateFarmerStyles.input}
                                        placeholder="0000000000"
                                        value={mobileNumber}
                                        keyboardType='number-pad'
                                        placeholderTextColor="#BDBFC2"
                                        onChange={(e) => {
                                            e.persist();
                                            setMobileNumber(e.nativeEvent.text);
                                        }}
                                    />
                                    {!VmobileNumber && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                                </View>
                                <View style={[UpdateFarmerStyles.input_group]}>
                                    <FontAwesome name="rupee" size={28} color="#fff" style={{
                                        paddingHorizontal: 15
                                    }} />
                                    <TextInput
                                        style={UpdateFarmerStyles.input}
                                        placeholder="0000000000"
                                        value={balance}
                                        placeholderTextColor="#BDBFC2"
                                    />
                                </View>
                            </View>
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={handleFarmer} style={UpdateFarmerStyles.button} disabled={isLoading}>
                                    {isLoading ? (
                                        <ActivityIndicator color="#FFFFFF" />
                                    ) : (
                                        <Text style={UpdateFarmerStyles.buttonText}>માહિતી સુધારો</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View> :
                            <View style={ReadFarmerStyles.container}>
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
                                <ActivityIndicator color={"#FFF"} size={'large'} />
                            </View>}
            </Modal>
        );
    };

    /*  Delete Farmer*/
    const DeleteFarmer = ({ isVisible, setVisible, farmerId }) => {
        const id = useSelector((state) => state.userAuth.id);
        const [isLoading, setLoading] = useState(false); // Added isLoading state
        const naviation = useNavigation()
        const deleteIt = async () => {
            setLoading(true);
            try {
                const FarmerDocumentPath = `Traders/${id}/Farmer`;
                const farmerRef = doc(db, FarmerDocumentPath, farmerId);
                await deleteDoc(farmerRef);
                setVisible(false);
                Alert.alert('ખેડૂત હટવાયો.. ')
                setLoading(false);
            } catch (error) {
                // console.log(error);
                alert('Server is Busy...');
                setLoading(false);
            }
            finally {
                naviation.navigate('Dashboard')
            }
        };

        return (
            <Modal animationType="slide" visible={isVisible} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <View style={DeleteStyles.container}>
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
                    <FontAwesome name='warning' size={80} color={'#E57158'} />
                    <Text style={{ marginTop: 10, fontSize: 26, color: '#fff', fontWeight: 'bold' }}>Are you Sure..?</Text>
                    <Text style={{ marginVertical: 10, fontSize: 15, color: '#fff', fontWeight: '400', opacity: .8, width: '70%', textAlign: 'center' }}>Do you really want to delete this farmer? This Process cannot be undone</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 }}>
                        <TouchableOpacity style={DeleteStyles.button} onPress={() => setVisible(false)}><Text style={DeleteStyles.buttonText}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity style={[DeleteStyles.button, { backgroundColor: '#E57158', borderColor: '#E57158' }]} onPress={deleteIt}><Text style={DeleteStyles.buttonText}>{isLoading ? <ActivityIndicator color={'#fff'} /> : 'Delete It!'}</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };
    /*  Delete Farmer*/
    const DeleteFolder = ({ isVisible, setVisible, path, folderId }) => {
        const [isLoading, setLoading] = useState(false); // Added isLoading state
        const deleteIt = async () => {
            setLoading(true);
            try {
                const farmerRef = doc(db, path, folderId);
                await deleteDoc(farmerRef);
                setVisible(false);
                Alert.alert('ફોલ્ડર હટાવાયું.. ')
                setLoading(false);
            } catch (error) {
                // console.log(error);
                alert('Server is Busy...');
                setLoading(false);
            }
            finally {
            }
        };

        return (
            <Modal animationType="slide" visible={isVisible} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <View style={DeleteStyles.container}>
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
                    <FontAwesome name='warning' size={80} color={'#E57158'} />
                    <Text style={{ marginTop: 10, fontSize: 26, color: '#fff', fontWeight: 'bold' }}>Are you Sure..?</Text>
                    <Text style={{ marginVertical: 10, fontSize: 15, color: '#fff', fontWeight: '400', opacity: .8, width: '70%', textAlign: 'center' }}>Do you really want to delete this farmer? This Process cannot be undone</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 }}>
                        <TouchableOpacity style={DeleteStyles.button} onPress={() => setVisible(false)}><Text style={DeleteStyles.buttonText}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity style={[DeleteStyles.button, { backgroundColor: '#E57158', borderColor: '#E57158' }]} onPress={deleteIt}><Text style={DeleteStyles.buttonText}>{isLoading ? <ActivityIndicator color={'#fff'} /> : 'Delete It!'}</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };
    const Folder = ({ path }) => {
        const [folders, setFolder] = useState([]);
        const [loading, setLoading] = useState(true);
        const usersRef = collection(db, path);
        // setSum(balanceSum)
        const FarmerDocumentPath = `Traders/${id}/Farmer`;
        const farmerDoc = doc(db, FarmerDocumentPath, farmerId);
        const farmerRef = collection(db, `Traders/${id}/Farmer/`);
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const folderQuerySnapshot = await getDocs(usersRef);
                    if (!folderQuerySnapshot.empty) {
                        const folderDocs = folderQuerySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }));
                        setFolder(folderDocs);
                        const balanceSum = folderDocs.reduce((sum, folder) => sum + parseInt(folder.data.Balance), 0); // Convert balanceSum to a number

                        const farmerQuerySnapshot = await getDocs(farmerRef);
                        if (!farmerQuerySnapshot.empty) {
                            const FarmerDocs = farmerQuerySnapshot.docs.map((doc) => ({
                                id: doc.id,
                                data: doc.data(),
                            }));
                            const selectedData = FarmerDocs.find((item) => item.id === farmerId)?.data;
                            if (selectedData) {

                                const updatedData = { ...selectedData, Balance: balanceSum.toString() };
                                try {
                                    await updateDoc(farmerDoc, updatedData);
                                } catch (error) {
                                    console.error('Error updating farmer data:', error);
                                }
                            }
                        }
                    } else {
                        const farmerQuerySnapshot = await getDocs(farmerRef);
                        if (!farmerQuerySnapshot.empty) {
                            const FarmerDocs = farmerQuerySnapshot.docs.map((doc) => ({
                                id: doc.id,
                                data: doc.data(),
                            }));
                            const selectedData = FarmerDocs.find((item) => item.id === farmerId)?.data;
                            if (selectedData) {

                                const updatedData = { ...selectedData, Balance: "0" };
                                try {
                                    await updateDoc(farmerDoc, updatedData);
                                } catch (error) {
                                    console.error('Error updating farmer data:', error);
                                }
                            }
                        }
                        setFolder([]);
                    }

                    setLoading(false);
                } catch (error) {
                    console.error('Error retrieving data:', error);
                    setLoading(false);
                }
            };

            const unsubscribe = onSnapshot(usersRef, () => {
                fetchData();
            }, (error) => {
                console.error('Error retrieving user data:', error);
                setLoading(false);
            });

            fetchData(); // Fetch initial data

            return () => {
                unsubscribe();
            };
        }, []);

        if (loading) {
            return <ActivityIndicator color="#FFFFFF" />;
        }
        return (
            <ScrollView
                endFillColor="#31363C"
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                contentContainerStyle={styles.scrollViewContent}
            >
                {!folders.length ?
                    <View style={{ flex: 1, height: 400, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='emoticon-dead-outline' size={50} color={'#E57158'} />
                        <Text style={{ color: '#E57158', fontWeight: 'bold', letterSpacing: 1, fontSize: 24, marginBottom: 10 }}>Oops.!! </Text>
                        <Text style={{ color: '#E57158', fontWeight: 'bold', letterSpacing: 1 }}>કોય ફોલ્ડર ઉપલપદ્ધ નથી.. </Text>
                    </View> :
                    folders.map((folder, index) => (
                        <TouchableOpacity
                            onLongPress={() => {
                                setFolderId(folder.id);
                                setDeleteFolderInfo(true)
                            }}
                            key={index}
                            onPress={() => {
                                props.navigation.navigate('Crops', { 'yearId': folder.id, 'year': folder.data.year, 'farmerId': farmerId }
                                )
                            }
                            } style={{ paddingRight: 8, display: 'flex', justifyContent: 'center', width: 80, alignItems: 'center' }}>
                            <MaterialCommunityIcons name="folder" color={folder.data.Balance == 0 ? '#7DAFEA' : folder.data.Balance < 0 ? '#E57158' : '#79B046'} style={styles.icon} />
                            <Text style={{ color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>{folder.data.year}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Text style={styles.headerText}>ખેડૂતમિત્રો</Text>
                </TouchableOpacity>
            </View>
            <Folder path={YearDocumentPath} />
            <View style={styles.bottom}>
                <View style={styles.priceContainer}>
                    <TouchableOpacity style={{ backgroundColor: '#AF40E3', width: 45, height: 45, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => setViewInfo(true)}>
                        <FontAwesome5 name='eye' size={24} color={"#fff"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#79B046', width: 45, height: 45, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => setUpdateInfo(true)} >
                        <FontAwesome name="pencil" size={24} color={"#fff"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#E57158', width: 45, height: 45, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => setDeleteInfo(true)}>
                        <MaterialCommunityIcons name="delete" size={26} color={"#fff"} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.fab} onPress={openCalendar}>
                    <MaterialIcons name="create-new-folder" size={26} color="white" />
                </TouchableOpacity>
            </View>
            {
                showCalendar && <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => handleYearSelection(date)}
                    dateFormat="yyyy"
                />
            }
            <ViewFarmerInfo isVisible={ViewInfo} setVisible={setViewInfo} path={`Traders/${id}/Farmer/`} farmerId={farmerId} />
            <UpdateFarmerInfo isVisible={UpdateInfo} setVisible={setUpdateInfo} path={`Traders/${id}/Farmer/`} farmerId={farmerId} />
            <DeleteFarmer isVisible={DeleteInfo} setVisible={setDeleteInfo} farmerId={farmerId} />
            <DeleteFolder isVisible={DeleteFolderInfo} setVisible={setDeleteFolderInfo} path={`Traders/${id}/Farmer/${farmerId}/Yearly/`} folderId={folderId} />
        </View>
    );
};
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, TextInput, Alert } from 'react-native';
import { Modal } from 'react-native-paper';
import { MaterialCommunityIcons, FontAwesome, FontAwesome5, AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { firebase } from '../../../config/firebase';
import { useSelector } from 'react-redux';
import { DeleteStyles, ReadFarmerStyles, UpdateFarmerStyles } from '../../StyleSheet/YearlyFolder';
import { useNavigation } from '@react-navigation/native';
const auth = getAuth(firebase);
const db = getFirestore();

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
        })
        return () => unsubscribe();
    }, [farmerId, usersRef]);
    return (
        <Modal animationType="slide" visible={isVisible} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
                isLoading ?
                    <View style={ReadFarmerStyles.container}><ActivityIndicator color={"#fff"} /></View> :
                    selectedFarmer != undefined && selectedFarmer.data != undefined ? <View style={ReadFarmerStyles.container}>
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
                setName(selectedData?.data?.Name)
                setVillage(selectedData?.data?.Village)
                setBalance(selectedData?.data?.Balance)
                setMobileNumber(selectedData?.data?.MobileNo)
                setSelectedFarmer(selectedData)
            }
        }, (error) => {
            if (selectedFarmer == undefined)
                setVisible(false)
            console.error('Error retrieving user data:', error);
        })

    }, [farmerId, selectedFarmer, setVisible, usersRef]);
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
        if (!validateInputs())
            return;
        setLoading(true);
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
                alert('Server is Busy...');
            })
            .finally(() => {
                setVisible(false)
                setLoading(false);
                navigation.navigate('Dashboard')
            });
    };
    return (
        <Modal animationType="slide" visible={isVisible} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
                isLoading ?
                    <View style={ReadFarmerStyles.container}><ActivityIndicator color={"#fff"} /></View> :
                    selectedFarmer != undefined && selectedFarmer.data != undefined ? <View style={ReadFarmerStyles.container}>
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
                                    value={balance.toString()}
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
    const [isLoading, setLoading] = useState(false);
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
const CropMenu = ({ showCropMenu, onConfirm, onCancel }) => {
    const [Folder, setFolder] = useState('૨૦૨૩')
    const [VFolder, setVFolder] = useState(true)
    const [isLoading, setLoading] = useState(false);
    const handleFolder = () => {
        let crop = {
            icon: 'sprout.png',
            name: Folder,
            Balance: 0
        }
        onConfirm(crop)
    }
    return (<Modal animationType="slide" visible={showCropMenu} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: -20 }}>
        <View style={{
            backgroundColor: '#31363C',
            paddingHorizontal: 15,
            paddingTop: 70,
            paddingBottom: 20,
            borderRadius: 20
        }}>
            <TouchableOpacity onPress={onCancel} style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: '#1F242B',
                padding: 6,
                borderRadius: 20
            }} >
                <AntDesign name='close' size={18} color='#fff' />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <View style={[styles.input_group, !VFolder && { borderColor: '#C3533A' }]}>
                    <FontAwesome5 name="cotton-bureau" size={28} color="#fff" style={{
                        paddingHorizontal: 8
                    }} />
                    <TextInput
                        onFocus={() => setVFolder(true)}
                        style={styles.input}
                        placeholder="કપાસ"
                        value={Folder}
                        inputMode='text'
                        onChangeText={setFolder}
                        placeholderTextColor="#BDBFC2"
                    />
                    {!VFolder && <MaterialIcons name='error' size={24} color={'#C3533A'} style={{ position: 'absolute', left: '90%' }} />}
                </View>
            </View>
            <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 5 }}>
                <TouchableOpacity onPress={handleFolder} style={{
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
                }} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={{
                            color: '#FFFFFF',
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>ફોલ્ડર ઉમેરો</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    )
};
const CropsFolder = (props) => {
    const id = useSelector(state => state.userAuth.id);
    const CropsDocumentPath = `Traders/${id}/Farmer/${props.route.params.farmerId}/Folder/`;
    const folderDetails = collection(db, CropsDocumentPath);
    const [showCropMenu, setShowCropMenu] = useState(false);
    const [ViewInfo, setViewInfo] = useState(false);
    const [UpdateInfo, setUpdateInfo] = useState(false);
    const [DeleteInfo, setDeleteInfo] = useState(false);
    const [DeleteFolderInfo, setDeleteFolderInfo] = useState(false);
    const [folderId, setFolderId] = useState();
    const DeleteFolder = ({ isVisible, setVisible, path, folderId }) => {
        const [isLoading, setLoading] = useState(false);
        const deleteIt = async () => {
            setLoading(true);
            try {
                const farmerRef = doc(db, path, folderId);
                await deleteDoc(farmerRef);
                setVisible(false);
                Alert.alert('ફોલ્ડર હટાવાયું.. ')
                setLoading(false);
            } catch (error) {
                alert('Server is Busy...');
                setLoading(false);
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

    const onConfirm = (item) => {
        setShowCropMenu(false);
        addDoc(folderDetails, item)
            .then(() => {
                alert(`Successfully created ${item.name} folder.`);
            })
            .catch((error) => {
                alert('Server is busy...');

            });
    };

    const onCancel = () => {
        setShowCropMenu(false)
    }
    const Folder = () => {
        const [folders, setFolder] = useState([]);
        const [loading, setLoading] = useState(true);
        const usersRef = collection(db, CropsDocumentPath);
        const farmerRef = collection(db, `Traders/${id}/Farmer`);
        const YearlyDocumentPath = `Traders/${id}/Farmer`;
        const YearlyDoc = doc(db, YearlyDocumentPath, props.route.params.farmerId);
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
                        const YearlyfolderQuerySnapshot = await getDocs(farmerRef);
                        if (!YearlyfolderQuerySnapshot.empty) {
                            const YearDocs = YearlyfolderQuerySnapshot.docs.map((doc) => ({
                                id: doc.id,
                                data: doc.data(),
                            }));
                            const selectedData = YearDocs.find((item) => item.id === props.route.params.farmerId).data;
                            if (selectedData != undefined) {
                                const updatedData = { ...selectedData, Balance: balanceSum };
                                try {
                                    await updateDoc(YearlyDoc, updatedData);
                                } catch (error) {
                                    console.error('Error updating farmer data:');
                                }
                            }
                        }
                    } else {
                        const YearlyfolderQuerySnapshot = await getDocs(farmerRef);
                        if (!YearlyfolderQuerySnapshot.empty) {
                            const YearDocs = YearlyfolderQuerySnapshot.docs.map((doc) => ({
                                id: doc.id,
                                data: doc.data(),
                            }));
                            const selectedData = YearDocs.find((item) => item.id === props.route.params.farmerId).data;
                            if (selectedData != undefined) {
                                const updatedData = { ...selectedData, Balance: 0 };
                                try {
                                    await updateDoc(YearlyDoc, updatedData);
                                } catch (error) {
                                    console.error('Error updating farmer data:');
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

            fetchData();

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
                            onPress={() => props.navigation.navigate('Invoice', { path: `${CropsDocumentPath}${folder.id}` })}
                            style={{ paddingRight: 8, display: 'flex', justifyContent: 'center', width: 80, alignItems: 'center' }}>
                            <MaterialCommunityIcons name="folder" color={folder.data.Balance == 0 ? '#7DAFEA' : folder.data.Balance < 0 ? '#E57158' : '#79B046'} style={styles.icon} />

                            <Text style={{ color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>{folder.data.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')}>
                    <Text style={styles.headerText}>અનુક્રમણિકા</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>/ખેડૂત</Text>
            </View>
            <Folder />
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
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => setShowCropMenu(true)}
                >
                    <MaterialIcons name="create-new-folder" size={26} color="white" />
                </TouchableOpacity>
            </View>
            <CropMenu
                showCropMenu={showCropMenu}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
            <ViewFarmerInfo isVisible={ViewInfo} setVisible={setViewInfo} path={`Traders/${id}/Farmer/`} farmerId={props.route.params.farmerId} />
            <UpdateFarmerInfo isVisible={UpdateInfo} setVisible={setUpdateInfo} path={`Traders/${id}/Farmer/`} farmerId={props.route.params.farmerId} />
            <DeleteFarmer isVisible={DeleteInfo} setVisible={setDeleteInfo} farmerId={props.route.params.farmerId} />
            <DeleteFolder isVisible={DeleteFolderInfo} setVisible={setDeleteFolderInfo} path={CropsDocumentPath} folderId={folderId} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#31363C',
        paddingTop: 30,
    },
    header: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 1.5,
    },
    cropContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 5
    },
    cropItem: {
        width: 70,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.1)',
        borderRadius: 8,
        margin: 5,
        padding: 5,
    },
    selectedCropItem: {
        backgroundColor: 'rgba(125,175,234,.2)',
    },
    checkIcon: {
        position: 'absolute',
        top: 2,
        right: 2,
    },
    cropImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    icon: {
        fontSize: 65
    },
    scrollViewContent: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#1F242B',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    priceContainer: {
        width: 170,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft: 10,
        alignItems: 'center',
    },
    priceText: {
        color: '#fff',
        fontSize: 20,
    },
    fab: {
        height: 50,
        width: 50,
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

export default CropsFolder;

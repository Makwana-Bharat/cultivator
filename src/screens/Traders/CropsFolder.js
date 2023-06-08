import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { Modal } from 'react-native-paper';
import { MaterialCommunityIcons, FontAwesome, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import app from '../../../config/firebase';
import { useSelector } from 'react-redux';
import { selectCroplyFolder } from '../../redux/slices/setting';
const auth = getAuth(app);
const db = getFirestore();

const CropMenu = ({ showCropMenu, onConfirm, onCancel }) => {
    const [selectedCropIndex, setSelectedCropIndex] = useState(0);
    const [Folder, setFolder] = useState('કપાસ')
    const [VFolder, setVFolder] = useState(true)
    const [isLoading, setLoading] = useState(false); // Added isLoading state
    const CroplyFolder = useSelector(selectCroplyFolder);
    if (CroplyFolder) {
        const cropsDetail = [
            {
                icon: 'onion.png',
                name: 'ડુંગળી',
                Balance: 0
            },
            {
                icon: 'cotton.png',
                name: 'કપાસ',
                Balance: 0
            },
            {
                icon: 'peanut.png',
                name: 'માંડવી',
                Balance: 0
            },
            {
                icon: 'potato.png',
                name: 'બટાકા',
                Balance: 0
            },
            {
                icon: 'wheat.png',
                name: 'ઘઉં',
                Balance: 0
            },
            {
                icon: 'corn.png',
                name: 'મકાઇ',
                Balance: 0
            },
            {
                icon: 'garlic.png',
                name: 'લસણ',
                Balance: 0
            },
            {
                icon: 'tomato.png',
                name: 'ટામેટાં',
                Balance: 0,
            },
            {
                icon: 'coriander.png',
                name: 'કોથમીર',
                Balance: 0
            },
            // Add more crop items here
        ];

        const handleCropSelection = (index) => {
            setSelectedCropIndex(index);
        };
        return (
            <Modal animationType="slide" visible={showCropMenu} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: -20 }}>
                <View style={{ width: 330, backgroundColor: '#31363C', height: '98%', display: 'flex', borderRadius: 15 }}>
                    <View style={{ padding: 15, backgroundColor: 'rgba(0,0,0,.2)', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>પાક </Text>
                    </View>
                    <ScrollView
                        endFillColor="#31363C"
                        showsVerticalScrollIndicator={false}
                        overScrollMode="never"
                        style={{ paddingTop: 10, borderRadius: 15 }}
                    >
                        <View style={[styles.cropContainer]}>
                            {cropsDetail.map((crop, index) => {
                                const isSelected = index === selectedCropIndex;
                                return (
                                    <TouchableOpacity
                                        key={crop.name}
                                        style={[
                                            styles.cropItem,
                                            isSelected && styles.selectedCropItem,
                                        ]}
                                        onPress={() => handleCropSelection(index)}
                                    >
                                        {isSelected && <MaterialCommunityIcons name='check-circle-outline' size={20} color={'#7DAFEA'} style={styles.checkIcon} />}
                                        <Image source={{ uri: `https://raw.githubusercontent.com/AJAX-Codder/cultivator/master/assets/crops/${crop.icon}` }} style={styles.cropImage} />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </ScrollView>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', backgroundColor: 'rgba(0,0,0,.2)', overflow: 'hidden', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                        <TouchableOpacity onPress={onCancel} style={{ height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRightColor: 'rgba(255,255,255,.1)', borderRightWidth: 1, width: '50%' }}><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            // setSelectedItem(cropsDetail[selectedCropIndex])
                            onConfirm(cropsDetail[selectedCropIndex])
                        }} style={{ height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', borderLeftColor: 'rgba(0,0,0,.1)', borderLeftWidth: 1, width: '50%' }}><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Ok</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
    else {
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
                            }}>{Folder} ફોલ્ડર ઉમેરો</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        )
    }
};

const CropsFolder = (props) => {
    const id = useSelector(state => state.userAuth.id);
    const CropsDocumentPath = `Traders/${id}/Farmer/${props.route.params.farmerId}/Yearly/${props.route.params.yearId}/Crops/`;
    const folderDetails = collection(db, CropsDocumentPath);
    const [showCropMenu, setShowCropMenu] = useState(false);
    const onConfirm = (item) => {
        setShowCropMenu(false)
        addDoc(collection(db, CropsDocumentPath), item)
            .then(() => {
                alert(` successfully ${item.name} Folder Created.. `);
            })
            .catch((error) => {
                alert("Server is Busy...");
                // Handle the error appropriately (e.g., display an error message).
            })
            .finally(() => {
                //   setLoading(false); // Set loading state to false
            });
    }
    const onCancel = () => {
        setShowCropMenu(false)
    }
    const Folder = () => {
        const [loading, setLoading] = useState(true);
        const [folders, setFolder] = useState([]);
        useEffect(() => {
            getDocs(folderDetails)
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const folderDocs = querySnapshot.docs.map((doc) => ({
                            id: doc.id, // Store the document ID as the 'id' property
                            data: doc.data(), // Store the document data as the 'data' property
                        })); // Sort the farmers based on their names in ascending order
                        setFolder(folderDocs);
                    }
                })
                .catch((error) => {
                    console.error('Error retrieving user data:', error);
                }).finally(() => {
                    setLoading(false); // Set loading to false when data is fetched
                });
        }, []);
        if (loading) {
            return <ActivityIndicator color="#FFFFFF" />;
        }
        return (
            <ScrollView
                endFillColor="#31363C"
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                contentContainerStyle={styles.scrollViewContent} // Added container style for flex wrapping
            >
                {!folders.length ?
                    <View style={{ flex: 1, height: 400, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='emoticon-dead-outline' size={50} color={'#E57158'} />
                        <Text style={{ color: '#E57158', fontWeight: 'bold', letterSpacing: 1, fontSize: 24, marginBottom: 10 }}>Oops.!! </Text>
                        <Text style={{ color: '#E57158', fontWeight: 'bold', letterSpacing: 1 }}>કોય ફોલ્ડર ઉપલપદ્ધ નથી.. </Text>
                    </View> :
                    folders.map((folder, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => props.navigation.navigate('Invoice', { path: `${CropsDocumentPath}${folder.id}`, crop: folder.data.name, year: props.route.params.year })}
                            style={{ paddingRight: 8, display: 'flex', justifyContent: 'center', width: 80, alignItems: 'center' }}>
                            <MaterialCommunityIcons name="folder" color={folder.data.Balance == 0 ? '#7DAFEA' : folder.data.Balance < 0 ? '#E57158' : '#79B046'} style={styles.icon} />
                            <Image
                                source={{
                                    uri:
                                        `https://raw.githubusercontent.com/AJAX-Codder/cultivator/master/assets/crops/${folder.data.icon}`,
                                }}
                                style={{ position: 'absolute', right: 20, width: 20, height: 20 }}
                            />

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
                    <Text style={styles.headerText}>ખેડૂતમિત્રો</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('Yearly', { 'farmerId': props.route.params.farmerId })}>
                    <Text style={styles.headerText}>/વર્ષો</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>/{props.route.params.year}</Text>
            </View>
            <Folder />
            <View style={styles.bottom}>
                <View style={styles.priceContainer}>
                </View>
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => setShowCropMenu(true)}
                >
                    <Text style={{ fontSize: 24, color: 'white' }}>🌾</Text>
                </TouchableOpacity>
            </View>
            <CropMenu
                showCropMenu={showCropMenu}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#31363C',
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 70,
    },
    header: {
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
        // justifyContent: 'center',
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
        width: '110%',
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
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
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

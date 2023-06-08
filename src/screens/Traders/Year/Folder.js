import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../../StyleSheet/YearlyFolder';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import app from '../../../../config/firebase';
const auth = getAuth(app);
const db = getFirestore();
export const Folder = ({ path }) => {
    const [folders, setFolder] = useState([]);
    const [loading, setLoading] = useState(false);
    const usersRef = collection(db, path);
    useEffect(() => {
        const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
            if (!querySnapshot.empty) {
                const folderDocs = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                setFolder(folderDocs);
                setLoading(false)
            }
        }, (error) => {
            console.error('Error retrieving user data:', error);
            setLoading(false)
        })
        return () => unsubscribe();
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
                        onLongPress={() => Modify(folder.id)}
                        key={index}
                        onPress={() => props.navigation.navigate('Crops', { 'yearId': folder.id, 'year': folder.data.year, 'farmerId': farmerId })} style={{ paddingRight: 8, display: 'flex', justifyContent: 'center', width: 80, alignItems: 'center' }}>
                        <MaterialCommunityIcons name="folder" color={folder.data.Balance == 0 ? '#7DAFEA' : folder.data.Balance < 0 ? '#E57158' : '#79B046'} style={styles.icon} />
                        <Text style={{ color: '#fff', fontWeight: 'bold', letterSpacing: 1 }}>{folder.data.year}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
};
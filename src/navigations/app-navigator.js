import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, Image, Switch } from 'react-native';
import AddFarmer from '../screens/Traders/Dashboard/AddFarmer';
import { DashboardScreen } from '../screens/Traders/DashboardScreen';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { AntDesign, Entypo } from '@expo/vector-icons'; // Import AntDesign from vector icon library
import { YearlyFolder } from '../screens/Traders/YearlyFolder';
import CropsFolder from '../screens/Traders/CropsFolder';
import { Invoice } from '../screens/Traders/Invoice';
import { getAuth, signOut } from "firebase/auth";
import app from '../../config/firebase';
import { setSignOut } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HandleNotification, HandleBillHeading, HandleCroplyFolder, selectNotification, selectBillHeading, selectCroplyFolder } from '../redux/slices/setting';
import NewEntry from '../screens/Traders/NewEntry';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth(app);
const Drawer = createDrawerNavigator();
const AccountScreen = () => {
    return (
        <View>
            <Text>Account</Text>
        </View>
    );
};

const CustomHeader = (props, { navigation }) => {
    const user = useSelector(state => state.userAuth.detail);
    const trade = user.trade;
    const tradeImg = user.tradeImg;
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => props.navigation.toggleDrawer()}
            >
                <AntDesign name="menu-unfold" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.heading}>{trade}</Text>
            <TouchableOpacity style={styles.profileImage}>
                <Image source={{ uri: tradeImg }} style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 50
                }} />
            </TouchableOpacity>
        </View>
    );
};
const CustomDrawerContent = (props) => {
    const dispatch = useDispatch();
    const Notification = useSelector(selectNotification);
    const BillHeading = useSelector(selectBillHeading);
    const CroplyFolder = useSelector(selectCroplyFolder);
    const user = useSelector(state => state.userAuth.detail);
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user'); // Await the AsyncStorage.removeItem call
            await signOut(auth);
            alert('LogOut successfully');
            dispatch(setSignOut());
        } catch (error) {
            // Handle any errors that occur during the logout process
            console.log('Logout error:', error);
            // Optionally display an error message to the user
            alert('An error occurred during logout. Please try again.');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Top Section */}
            <View
                style={{
                    backgroundColor: '#31363C',
                    marginBottom: 20,
                    marginTop: 20,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: user.tradeImg }}
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 75,
                            borderColor: '#fff',
                            borderWidth: 5,
                        }}
                    />
                    <Text style={{ color: '#fff', marginTop: 10, fontSize: 24, fontWeight: 'bold' }}>
                        {user.trade}
                    </Text>
                    <Text style={{ color: '#fff', marginTop: 2, fontSize: 12 }}>
                        {user.name}
                    </Text>
                </View>
            </View>

            {/* Menu Items */}
            <View
                style={{
                    margin: 10,
                    backgroundColor: 'rgba(125,175,234,.2)',
                    padding: 15,
                    borderRadius: 7,
                }}
            >
                <Text style={{ color: 'rgba(125,175,234,1)', fontWeight: 'bold' }}>
                    Dashboard
                </Text>
            </View>

            {/* Notification Toggle */}
            <View>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                    <Switch
                        value={Notification}
                        onValueChange={() => dispatch(HandleNotification(!Notification))}
                    />
                    <Text style={{ color: '#fff', marginLeft: 10, fontSize: 16, fontWeight: '400' }}>Notifications</Text>
                </View> */}

                {/* Other Toggles */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                    <Switch
                        value={BillHeading}
                        onValueChange={() => dispatch(HandleBillHeading(!BillHeading))}
                    />
                    <Text style={{ color: '#fff', marginLeft: 10, fontSize: 16, fontWeight: '400' }}>Bill Heading</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                    <Switch
                        value={CroplyFolder}
                        onValueChange={() => dispatch(HandleCroplyFolder(!CroplyFolder))}
                    />
                    <Text style={{ color: '#fff', marginLeft: 10, fontSize: 16, fontWeight: '400' }}>Automatic Folder</Text>
                </View>
            </View>
            {/* Logout */}
            <TouchableOpacity
                onPress={handleLogout}
                style={{
                    width: '80%',
                    paddingHorizontal: 16,
                    backgroundColor: 'rgba(255,255,255,.1)',
                    margin: 10,
                    padding: 15,
                    borderRadius: 8,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0,
                    left: 10,
                }}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, letterSpacing: 1.5 }}>Log-Out</Text>
                <Entypo name='log-out' size={20} color={"white"} />
            </TouchableOpacity>
        </View>
    );
};

const AppNavigator = () => {
    const user = useSelector(state => state.userAuth.detail);
    const dispatch = useDispatch();

    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                header: ({ navigation }) => <CustomHeader navigation={navigation} />,
                headerStyle: {
                    backgroundColor: '#1F242B',
                },
                drawerStyle: {
                    backgroundColor: '#31363C',
                    width: 250,
                    paddingTop: 30,
                },
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#fff',
            }}
            drawerContent={(props) => (
                <CustomDrawerContent {...props} />
            )}
        >
            {/* Main Screens */}
            <Drawer.Screen name="Dashboard" component={DashboardScreen} />
            <Drawer.Screen name='AddFarmer' component={AddFarmer} options={{ headerShown: false }} />
            <Drawer.Screen name='Yearly' component={YearlyFolder} />
            <Drawer.Screen name='Crops' component={CropsFolder} />
            <Drawer.Screen name='Invoice' component={Invoice} />
            <Drawer.Screen name="Account" component={AccountScreen} />
            <Drawer.Screen name='NewEntry' component={NewEntry} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

export default AppNavigator;

const styles = {
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1F242B',
        paddingHorizontal: 16,
        paddingTop: 30,
        paddingBottom: 20,
    },
    menuIcon: {
        marginRight: 8,
    },
    heading: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        backgroundColor: 'white',
        borderColor: '#fff',
        borderWidth: 2
    },
};

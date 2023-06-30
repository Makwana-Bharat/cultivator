import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigators';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, ModifySelection, setSignIn } from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../config/URL';
import Loading from './Loading';
const AppRoute = () => {
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    const fetchData = async (SID) => {
        await fetch(`${URL}/APIS/Authentication/Read.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `SID=${SID}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.message == "User not found") {
                    AsyncStorage.removeItem('Auth');
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000);
                }
                else {
                    const modifiedSelection = {
                        TraderId: data.Trader.SID,
                        FarmerIndex: null,
                        FolderIndex: null,
                        EntryIndex: null
                    };
                    dispatch(ModifySelection(modifiedSelection));
                    dispatch(setSignIn({
                        id: data.Trader.SID,
                        isLoggedIn: true,
                        traders: data.Trader,
                        selection: modifiedSelection
                    }));
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }).finally(() => {

            });
    }
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authValue = await AsyncStorage.getItem('Auth');
                if (authValue !== null) {
                    await fetchData(authValue);
                } else {
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                }
            } catch (error) {
                console.error('Error retrieving auth value from AsyncStorage:', error);
            }
        };
        checkAuth();
    }, []);
    return (
        <NavigationContainer>
            {loading ? (
                <Loading />
            ) : isLoggedIn ? (
                <AppNavigator />
            ) : (
                <AuthNavigator />
            )}
        </NavigationContainer>
    );
}
export default AppRoute

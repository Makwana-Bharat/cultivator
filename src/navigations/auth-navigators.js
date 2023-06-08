import * as React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LoginScreen from '../screens/Authentication/LoginScreen';
import RegisterScreen from '../screens/Authentication/RegisterScreen';
import ForgetScreen from '../screens/Authentication/ForgetScreen';
const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Forget" component={ForgetScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;

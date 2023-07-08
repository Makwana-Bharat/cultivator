import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { HandleOnboarding } from '../redux/slices/setting';
const slides = [
    {
        key: 'login',
        title: 'Let`s Start Journey With CULTIVATOR',
        text: 'Protect Your Information by email verification and using Backup Services',
        animation: require('../../assets/animations/step1.json'),
        backgroundColor: '#31363C',
    },
    {
        key: 'addFarmer',
        title: 'Handle Your Farmers Freely...',
        text: 'Easily to add or delete farmers to your system',
        animation: require('../../assets/animations/step2.json'),
        backgroundColor: '#febe29',
    },
    {
        key: 'invoice',
        title: 'Organize your invoices using folder structure',
        text: 'easily add or delete Folder\nDifferent Color of Folder Show it Status\nFor Delete Folder Long Press On It...',
        animation: require('../../assets/animations/step3.json'),
        backgroundColor: '#febe29',
    },
    {
        key: 'printBill',
        title: 'Handle your Invoice viya Bill Generation',
        text: 'Print bills and invoices directly from the app or Share Bill directly to the Farmers..',
        animation: require('../../assets/animations/step4.json'),
        backgroundColor: '#febe29',
    },
];
const OnboardingScreen = () => {
    const dispatch = useDispatch();
    const handleAnimationFinish = async () => {
        try {
            await AsyncStorage.setItem('Onboarding', 'set');
            dispatch(HandleOnboarding(false));
        } catch (error) {
        }
    };

    const renderSlide = ({ item }) => (

        <View style={[styles.slide, { backgroundColor: '#31363C' }]} >
            <Text style={styles.title}>{item.title}</Text>
            <LottieView
                source={item.animation}
                autoPlay
                loop={true}
                style={styles.animation}
            />
            <Text style={styles.text}>{item.text}</Text>
        </View>
    );
    const renderNextButton = () => (
        <FAB style={styles.fab} color="#fff" icon="chevron-right" />
    );
    const renderDoneButton = () => (
        <FAB style={styles.fab} icon="check" color="#fff" />
    );
    return (
        <AppIntroSlider
            data={slides}
            renderItem={renderSlide}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
            renderDoneButton={renderDoneButton}
            renderNextButton={renderNextButton}
            showSkipButton
            onSkip={handleAnimationFinish}
            onDone={handleAnimationFinish}
        />
    );
};

const styles = StyleSheet.create({
    fab: {
        marginBottom: 10,
        color: "white",
        backgroundColor: "#1F242B",
        borderRadius: 50
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        width: "70%",
        textAlign: 'center',
        color: "rgba(255,255,255,.7)",
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: "italic",
        marginBottom: 20,
    },
    text: {
        width: "65%",
        color: "rgba(255,255,255,.6)",
        marginTop: 50,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 50,
    },
    animation: {
        width: 300,
        height: 300,
    },
    dotStyle: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
    },
    activeDotStyle: {
        backgroundColor: '#000',
    },
});

export default OnboardingScreen;

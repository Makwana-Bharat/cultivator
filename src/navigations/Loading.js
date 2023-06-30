import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
const Loading = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        startAnimation();
    }, []);

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };
    const containerStyle = {
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                }),
            },
        ],
        opacity: animatedValue,
    };
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.container, containerStyle]}>
                <Image
                    source={{ uri: 'https://raw.githubusercontent.com/AJAX-Codder/cultivator_web/master/public/favicon.ico' }}
                    style={styles.image}
                />
                <Text style={styles.brandName}>CULTIVATORS</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#31363C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandName: {
        // fontFamily: 'Piedra',
        color: '#fff',
        fontSize: 24,
    },
    image: {
        height: 200,
        width: 200,
    },
});
export default Loading;

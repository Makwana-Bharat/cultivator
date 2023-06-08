import React from 'react'
import { StyleSheet } from 'react-native';
export const farmerStyle = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: 'rgba(255,255,255,.1)',
        borderRadius: 10,
        marginBottom: 5
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#fff',
        borderWidth: 2
    },
    subcontainer: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: '#fff'
    },
    moneyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    currencyIcon: {
        marginRight: 5,
    },
    money: {
        fontSize: 12,
        color: '#5AC419',
        fontWeight: 'bold'
    },
    rightIcon: {
        marginLeft: 'auto',
    },
});
export const DashboardStyles = StyleSheet.create({
    container: {
        backgroundColor: '#31363C',
        flex: 1,

        paddingTop: 30,
        paddingBottom: 70,
    },
    header: {
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
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

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
const YearSpinner = ({ isVisible, onCancel, onConfirm }) => {
    return (
        <Modal visible={isVisible} transparent={true} onRequestClose={onCancel}>
            <DateTimePicker
                value={new Date()}
                mode="date"
                display="spinner"
                onChange={(event, date) => onConfirm(date)}
                dateFormat="yyyy"
            />

        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    cancelButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    cancelText: {
        fontSize: 16,
        color: 'white',
    },
    datePickerContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
    },
});

export default YearSpinner;

import React, { useState } from 'react';
import { View, StyleSheet, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DateHandler = (date, setDate) => {
    return date.toLocaleDateString()
}
const DateSpinner = ({ isVisible, setVisible, date, setDate }) => {
    const showSpinner = Platform.OS === 'ios';
    return (
        <Modal visible={isVisible} transparent onRequestClose={() => setVisible(false)}>
            <View style={styles.modalContainer}>
                {showSpinner ? (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="spinner"
                        onChange={(_, date) => onConfirm(date)}
                    />
                ) : (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={(_, date) => { DateHandler(date, setDate), setVisible(false) }}
                    />
                )}
            </View>
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
export default DateSpinner;

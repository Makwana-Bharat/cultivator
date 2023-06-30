import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Modal } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addEntry } from '../../redux/slices/authSlice';
import URL from '../../../config/URL';
const NewEntry = ({ isVisible, setVisible, MFID }) => {
    const [amount, setAmount] = useState('');
    const [detail, setDetail] = useState('');
    const [isLoading1, setLoading1] = useState(false);
    const [isLoading2, setLoading2] = useState(false);
    const [date, setDate] = useState(new Date().toLocaleDateString('en-GB'));
    const [today, setToday] = useState(new Date());
    const [dateVisible, setDateVisible] = useState(false);
    const dispatch = useDispatch();
    const handleEntry = async (type) => {
        if (amount === '' || detail === '') {
            Alert.alert('Error', 'Please Fill Details..');
            return;
        }
        if (type == "જમા ")
            setLoading1(true);
        else
            setLoading2(true);
        const Type = type;
        let newEntry = {
            DATE: date,
            DETAILS: detail,
            RUPEE: parseInt(amount),
            TYPE: Type
        }

        await fetch(`${URL}APIS/Invoice_CRUD/Add.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `MFID=${MFID}&RUPEE=${amount}&DATE=${date}&DETAILS=${detail}&TYPE=${type}`
        }).then(response => response.json()).then(data => {
            if (data.message === "Entry inserted successfully")
                alert("inserted..");
            setVisible(false);
            dispatch(addEntry({ ...newEntry, IID: data.IID }));
            setLoading1(false);
            setLoading2(false);
        }).catch(() => {
            setLoading1(false);
            setLoading2(false);
        }).finally(() => {
            setVisible(false);
            setAmount('');
            setDate(new Date().toLocaleDateString('en-GB'));
            setToday(new Date());
            setDetail('')
        });
    };
    const handleDate = (selectedDate) => {
        setToday(selectedDate);
        if (selectedDate) {
            const formattedDate = selectedDate.toLocaleDateString('en-GB');
            setDate(formattedDate);
        }
        setDateVisible(false);
    };
    return (
        <Modal
            animationType="slide"
            visible={isVisible}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => setVisible(false)}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: '#1F242B',
                        padding: 6,
                        borderRadius: 20,
                    }}
                >
                    <AntDesign name="close" size={18} color="#fff" />
                </TouchableOpacity>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.logo}
                />
                <Text style={{ fontFamily: 'piedra-font', color: '#fff', fontSize: 40, letterSpacing: 1, marginBottom: 15 }}>New Entry</Text>
                <View style={styles.input_group}>
                    <FontAwesome name="rupee" size={28} color="#fff" style={{ paddingHorizontal: 15 }} />
                    <TextInput
                        style={styles.input}
                        placeholder="00000"
                        value={amount}
                        keyboardType='number-pad'
                        onChangeText={setAmount}
                        placeholderTextColor="#BDBFC2"
                    />
                </View>
                <TouchableOpacity
                    onPress={() => setDateVisible(true)}
                    style={styles.input_group}
                >
                    <FontAwesome5
                        name="calendar-alt"
                        size={24}
                        color="#fff"
                        style={{ paddingHorizontal: 12 }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Select Date"
                        value={date}
                        placeholderTextColor="#BDBFC2"
                        editable={false}
                    />
                </TouchableOpacity>
                <View style={styles.input_group}>
                    <FontAwesome
                        name="pencil"
                        size={28}
                        color="#fff"
                        style={{ paddingHorizontal: 10 }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="નોંધ.. "
                        value={detail}
                        onChangeText={setDetail}
                        placeholderTextColor="#BDBFC2"
                    />
                </View>
                <View
                    style={{
                        width: '90%',
                        flexDirection: 'row',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        paddingTop: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleEntry('જમા ')}
                        style={[
                            styles.button,
                            { backgroundColor: '#8ABA5D', borderColor: '#8ABA5D' },
                        ]}
                        disabled={isLoading1 || isLoading2}
                    >
                        {isLoading1 ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>જમા </Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleEntry('ઉધાર')}
                        style={[
                            styles.button,
                            { backgroundColor: '#E57158', borderColor: '#E57158' },
                        ]}
                        disabled={isLoading1 || isLoading2}
                    >
                        {isLoading2 ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>ઉધાર </Text>
                        )}
                    </TouchableOpacity>
                </View>
                {dateVisible && (
                    <DateTimePicker
                        value={today}
                        mode="date"
                        display="normal"
                        onChange={(event, date) => handleDate(date)}
                    />
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        top: -20,
        padding: 12,
        height: 500,
        borderRadius: 10,
        backgroundColor: '#31363C',
        width: 320,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
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
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#53595F',
        width: 220,
        height: 45,
        color: '#fff',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 10,
    },
    button: {
        width: '45%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F242B',
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderColor: '#1F242B',
        borderWidth: 4,
        borderRadius: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NewEntry;

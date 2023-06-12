import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import AppRoute from './src/navigations/navigator';
import { store } from './src/redux/store';
import * as Font from 'expo-font';
import { ActivityIndicator, View, StyleSheet, Button } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebase } from './config/firebase';
import { getAuth } from 'firebase/auth';
const auth = getAuth(firebase);
const db = getFirestore();
let data = [
  {
    "Name": "દેવજીભાઇ ધરમશીભાઇ",
    "Village": "કુંભણ",
    "MobileNo": "9723710155",
    "Image": "https: //w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png",
    "Balance": "0"
  },
  {
    "Name": "વેલજીભાઈ માવજીભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "7874400312",
    "Image": "https: //w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png",
    "Balance": "0"
  },
  {
    "Name": "મહેશભાઈ વલ્લભભાઇ",
    "Village": "કુંભણ",
    "MobileNo": "9824790797",
    "Image": "https: //w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png",
    "Balance": "0"
  },
  {
    "Name": "કનુભાઈ બાલાભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "7600563221",
    "Image": "https: //w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png",
    "Balance": "0"
  },
  {
    "Name": "કિશોરભાઈ બાલાભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "7046911374",
    "Image": "https: //w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png",
    "Balance": "0"
  },
  {
    "Name": "વીનુભાઈ નરશીભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "9825627201",
    "Image": "https: //w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png",
    "Balance": "0"
  },
  {
    "Name": "મહેશભાઈ નાનજીભાઈ",
    "Village": "બેલંપર",
    "MobileNo": "9924304781",
    "Image": "https: //w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png",
    "Balance": "0"
  },
  {
    "Name": "રમેશભાઈ બેસરભાઈ",
    "Village": "ચોકવા",
    "MobileNo": "9913777524",
    "Image": "https: //w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png",
    "Balance": "0"
  },
  {
    "Name": "વાલજીભાઈ નરશીભાઈ",
    "Village": "છાપરી",
    "MobileNo": "9726204913",
    "Image": "https: //w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png",
    "Balance": "0"
  },
  {
    "Name": "વલ્લભભાઈ ધરમશીભાઇ",
    "Village": "કુંભણ",
    "MobileNo": "7698047735",
    "Image": "https: //w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png",
    "Balance": "0"
  },
  {
    "Name": "મેઘજીભાઈ ધરમશીભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "9925343992",
    "Image": "https: //w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png",
    "Balance": "0"
  },
  {
    "Name": "ભરતભાઈ મેઘાભાઈ",
    "Village": "ચુણા",
    "MobileNo": "9909681847",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ખોડાભાઈ ચીદીભાઈ",
    "Village": "ગળથર",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ગોવિંદભાઈ ભુરાભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "9727216323",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ધીરૂભાઈ ઘેલાભાઈ",
    "Village": "ગળથર",
    "MobileNo": "9726886523",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "રાઘવભાઈ ગભાભાઈ",
    "Village": "ગળથર",
    "MobileNo": "9712371753",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "નાગજીભાઈ ધરમશીભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "7990854114",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "વાઘજીભાઈ ધરમશીભાઇ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "પોપટભાઈ ઘુઘાભાઈ",
    "Village": "ગોરસ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "બાલાભાઈ રામભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "જેન્તીભાઈ ભુપતભાઈ",
    "Village": "નાના_ખુટવડા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "જીવાભાઈ જસાભાઈ",
    "Village": "નાની જાગધાર",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "બાબુભાઈ સોમાતભાઈ",
    "Village": "નાની જાગધાર",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "રમેશભાઈ રઘાભાઈ",
    "Village": "બોરડા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "દાનાભાઈ કાળાભાઈ",
    "Village": "ચુણા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "દાનુભાઈ રાણાભાઈ",
    "Village": "લખુપરા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "બચુભાઈ ગોવિંદભાઈ",
    "Village": "બેલંપર",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "બીજલભાઈ ટપુભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ભગવાનભાઈ કાળુભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "મધુભાઈ હરજીભાઈ",
    "Village": "પીપળવા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "જેન્તીભાઈ ડાયાભાઈ",
    "Village": "કંટાસર",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "સોડાભાઈ વિઠ્ઠલભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ઠાકરશીભાઈ જીવાભાઈ",
    "Village": "ડેડકડી",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "હિંમતભાઈ વીરાભાઈ",
    "Village": "ખડસલીયા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "વીનુભાઈ રવજીભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "મુળુભાઈ મસરીભાઈ",
    "Village": "બોરડા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ધીરુભાઈ લાખાભાઈ",
    "Village": "ફરેડા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ધીરૂભાઈ ગોવિંદભાઈ",
    "Village": "કાળેલા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "છગનભાઇ ધેલાભાઈ",
    "Village": "ગળથર",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "દુલાભાઈ સવજીભાઈ",
    "Village": "જાંબુડા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ગભરૂભાઈ ઓઘડભાઈ",
    "Village": "સાગણીયા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "જગદીશભાઈ દેવશીભાઈ",
    "Village": "પીપળવા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "વીપુલભાઈ શામજીભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "જીવનભાઈ વેલજીભાઈ",
    "Village": "ખડસલીયા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "જગાભાઈ બોઘાભાઈ",
    "Village": "ગળથર",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ગંભીરભાઈ વેલજીભાઈ",
    "Village": "ગળથર",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "બાબુભાઈ વલ્લભભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "સુરેશભાઈ માવજીભાઈ",
    "Village": "માળવાવ",
    "MobileNo": "9574027809",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "શીવાભાઈ નાથાભાઈ",
    "Village": "છાપરી",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ભુપતભાઈ ગોરધનભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "રમેશભાઇ ખોડાભાઈ",
    "Village": "કંટાસર",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "નરવણભાઈ વિઠ્ઠલભાઈ",
    "Village": "દયાળ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "જાદવભાઈ ભુપતભાઈ",
    "Village": "ખુટવડા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "મનસુખભાઈ ભોળાભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "નાગજીભાઈ પાસાભાઈ",
    "Village": "ખારી",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ગોવિંદભાઈ ઝીણાભાઈ",
    "Village": "મોણપર",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "કાળુભાઈ બચુભાઈ",
    "Village": "કુંભણ ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "દુલાભાઈ ગગુભાઈ",
    "Village": "કોંજળી ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "રમેશભાઈ વલ્લભભાઈ",
    "Village": "કુંભણ ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "છગનભાઈ ભોળાભાઈ  ",
    "Village": "બેલંપર ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ભોળાભાઈ લખમણભાઇ",
    "Village": "ચોકવા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "શૈલેષભાઈ વેલજીભાઈ",
    "Village": "કુંભણ ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "કરશનભાઈ જેરામભાઈ",
    "Village": "ખારી",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "જીણાભાઈ બેચરભાઈ",
    "Village": "ચોકવા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "લખમણભાઇ રામભાઈ",
    "Village": "કુંભણ ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "મધુભાઈ કાળાભાઈ",
    "Village": "ચુણા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "વીપુલભાઈ દુલાભાઈ",
    "Village": "છાપરી",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "જયસુખભાઇ ભોળાભાઈ",
    "Village": "ચોકવા ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "વીક્રમભાઈ નાથાભાઈ",
    "Village": "જાંબુડા ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "વશરામભાઇ સવજીભાઈ",
    "Village": "કુંભણ ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ખીમાભાઇ રવજીભાઈ",
    "Village": "છાપરી ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ભાવેશભાઈ નરશીભાઈ",
    "Village": "નાના ખુટવડા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "મનજીભાઈ માધુભાઈ",
    "Village": "બેલંપર ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "દેવાતભાઈ વાલાભાઈ",
    "Village": "કરજાળા ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ભાવેશભાઈ મનુભાઈ",
    "Village": "ધરાઈ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "જેરામભાઈ ગોવિદભાઈ",
    "Village": "અગતરીયા ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "રમેશભાઈ પ્રેમજીભાઈ",
    "Village": "કરમદિયા ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "હિમતભાઈ વેલાભાઈ",
    "Village": "ગળથર ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ભરતભાઈ ખીમાભાઈ",
    "Village": "એડવાંસ ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "કરશનભાઈ ખીમાભાઈ",
    "Village": "બોરડા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "દામજીભાઈ ભુપતભાઈ",
    "Village": "ખુટવડા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "શીબાભાઈ ઉકાભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "Name": "ઓઘડભાઈ ટપુભાઈ",
    "Village": "જાંબુડા",
    "MobileNo": "0000000000",
    "Image": "",
    "Balance": "0"
  },
  {
    "ID": "169",
    "Name": "રતીભાઈ બોઘાભાઈ",
    "Village": "રાતોલ",
    "MobileNo": "0000000000"
  },
  {
    "ID": "170",
    "Name": "જીતુભાઈ ભોળાભાઈ",
    "Village": "ચોકવા",
    "MobileNo": "0000000000"
  },
  {
    "ID": "171",
    "Name": "ઘનશ્યામભાઈ મેઘાભાઈ",
    "Village": "ચોકવા",
    "MobileNo": "0000000000"
  },
  {
    "ID": "172",
    "Name": "ભરતભાઈ વેલાભાઈ",
    "Village": "બેડા",
    "MobileNo": "0000000000"
  },
  {
    "ID": "174",
    "Name": "ભીમજીભાઈ ભુપતભસાઈ",
    "Village": "પીપળવા",
    "MobileNo": "0000000000"
  },
  {
    "ID": "176",
    "Name": "પુનાભાઈ હરજીભાઈ",
    "Village": "ચોકવા",
    "MobileNo": "0000000000"
  },
  {
    "ID": "177",
    "Name": "રાહુલભાઈ વાઘજીભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "9574027809"
  },
  {
    "ID": "178",
    "Name": "રમેશભાઈ ચીથરભાઈ",
    "Village": "પીપળવા",
    "MobileNo": "0000000000"
  },
  {
    "ID": "179",
    "Name": "કર્ણાભાઈ ઘુઘાભાઈ",
    "Village": "ગોરસ",
    "MobileNo": "0000000000"
  },
  {
    "ID": "180",
    "Name": "અરજણભાઈ બાવભાઈ",
    "Village": "પીપળવા",
    "MobileNo": "0000000000"
  },
  {
    "ID": "181",
    "Name": "અશોકભાઈ સોડાભાઈ",
    "Village": "કંટાસર",
    "MobileNo": "0000000000"
  },
  {
    "ID": "182",
    "Name": "જયસુખભાઈ હિંમતભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000"
  },
  {
    "ID": "183",
    "Name": "લાખાભાઈ જેરામભાઈ",
    "Village": "ગોરસ",
    "MobileNo": "0000000000"
  },
  {
    "ID": "184",
    "Name": "લાખાભાઈ જેરામભાઈ",
    "Village": "ગોરસ",
    "MobileNo": "0000000000"
  },
  {
    "ID": "185",
    "Name": "દેવજીભાઈ ભગવનભાઈ",
    "Village": "કુંભણ",
    "MobileNo": "0000000000"
  }
];

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  async function loadFonts() {
    try {
      await Font.loadAsync({
        'piedra-font': require('./assets/fonts/Piedra-Regular.ttf'),
      });
      setFontLoaded(true);
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  }
  useEffect(() => {
    loadFonts();
  }, []);
  const addRecord = async () => {
    const FarmerDocumentPath = `Traders/CkklA2Wy202JqH9fjz17/Farmer`;

    for (let i = 0; i < data.length; i++) {
      const farmerDetails = {
        ID: i,
        Image: 'https://w7.pngwing.com/pngs/534/724/png-transparent-farmer-agriculture-selling-food-food-vertebrate-agriculture-thumbnail.png',
        MobileNo: data[i].MobileNo,
        Name: data[i].Name,
        Village: data[i].Village,
        Balance: "0"
      };
      addDoc(collection(db, FarmerDocumentPath), farmerDetails)
        .then(() => {
          console.log(farmerDetails.Name + ' addedd')
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {

        });
    }
  };
  if (!fontLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      {/* <AppRoute /> */}
      <View style={styles.container}>

        <Button title='type' onPress={addRecord} />
      </View>
      <StatusBar style="auto" />
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31363C',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

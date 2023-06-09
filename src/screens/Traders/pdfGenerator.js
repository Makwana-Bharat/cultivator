import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { getFirestore, collection, getDocs, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import app from '../../../config/firebase';
import { getAuth } from 'firebase/auth';
const auth = getAuth(app);
const db = getFirestore();
export const pdfGenerator = async ({ Header, farmerName, farmerVillage, today, props }) => {
    const udhar = collection(db, `${props.route.params.path}/ઉધાર/`);
    const jama = collection(db, `${props.route.params.path}/જમા/`);
    const udharQuerySnapshot = await getDocs(udhar);
    var udharEntries = [];
    var jamaEntries = [];
    var udharSum = 0;
    var jamaSum = 0;
    if (!udharQuerySnapshot.empty) {
        udharEntries = udharQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }));
        udharSum = udharEntries.reduce(
            (sum, folder) => sum + parseInt(folder.data.Balance),
            0
        );
    }
    else {

    }
    const jamaQuerySnapshot = await getDocs(jama);
    if (!jamaQuerySnapshot.empty) {
        jamaEntries = jamaQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }));
        jamaSum = jamaEntries.reduce(
            (sum, folder) => sum + parseInt(folder.data.Balance),
            0
        );

    }
    else {

    }
    const udharEntriesHtml = udharEntries.map(entry => `
    <tr style="width:100%">
        <td style="">${entry.data.Balance}</td>
        <td>${entry.data.Date}</td>
        <td style="text-align:right;width: 50%;">${entry.data.Detail}</td>
    </tr>
`).join('');
    const jamaEntriesHtml = jamaEntries.map(entry => `
    <tr style="width:100%">
        <td>${entry.data.Balance}</td>
        <td>${entry.data.Date}</td>
        <td style=" text-align:right;padding-right:10px;width: 50%;">${entry.data.Detail}</td>
    </tr>
`).join('');
    const htmlContent = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    body {
                margin: 0;
                padding: 0;
            }
        .row {
            display: flex;
        }

        .flex-row {
            flex-direction: row;
        }

        .col-12 {
            flex-basis: 0;
            flex-grow: 1;
            max-width: 100%;
        }

        .grid-margin {
            margin: 1rem;
        }

        .card {
            position: relative;
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(0, 0, 0, 0.125);
            border-radius: 0.25rem;
            background-color: #fff;
            background-clip: border-box;
            box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
            overflow: hidden;
        }

        .card-body {
            flex: 1 1 auto;
            padding: 1.25rem;
        }

        .card-title {
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
        }

        .w-100 {
            width: 100%;
        }

        .text-center {
            text-align: center;
        }

        .d-flex {
            display: flex;
        }

        #InvoiceKhedut {
            justify-content: space-between;
        }

        .w-75 {
            width: 75%;
        }

        .w-25 {
            width: 25%;
        }

        .justify-content-end {
            justify-content: flex-end;
        }

        .card-description {
            margin-bottom: 0;
        }

        .table {
            width: 100%;
            margin-bottom: 1rem;
            color: #212529;
        }

        thead {
            display: table-header-group;
            vertical-align: middle;
            border-color: inherit;
        }

        th {
            text-align: left;
            font-weight: bold;
        }
        #SumRow th,
        #SumRow td {
            
        }

        #LeftSum,
        #RightSum,
        #GrandLeftSum,
        #GrandRightSum {
            width: 10%;
        }
    </style>
</head>
<body>          
<div>
                    ${Header ? '<h3 class="card-title w-100 text-center"><strong>રામદેવ ટ્રેડિંગ </strong></h3>' : ''}
                    <span class="d-flex" id="InvoiceKhedut">
                        <p class="w-75"><b>ખેડૂત નામ :</b><span id="InvoiceName">${farmerName}</span></p>
                        <p class="w-25 d-flex justify-content-end"><b>ગામ :</b><span id="InvoiceVillage">${farmerVillage}</span></p>
                        <p class="w-25 d-flex justify-content-end"><b>તારીખ :</b><span
                                id="InvoiceVillage">${today}</span></p>
                    </span>
                    <span class="d-flex">
                        <p class="card-description w-75">જમા</p>
                        <p class="card-description w-25 d-flex justify-content-end">ઉધાર</p>
                    </span>
                    <div class="d-flex">
                        <table class="table" style="height:fit-content">
                            <thead>
                                <tr>
                                    <th style="font-weight: bold;">રકમ (₹)</th>
                                    <th style="font-weight: bold;">તારીખ</th>
                                    <th
                                        style="font-weight: bold; width: 30%; border-right: 1px solid gray; text-align: right;padding-right:10px">
                                        વિગત
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="leftBody">
                            ${jamaEntriesHtml}
                            </tbody>
                        </table>
                        <table class="table" style="height:fit-content">
                            <thead>
                                <tr>
                                    <th style="font-weight: bold;">રકમ (₹)</th>
                                    <th style="font-weight: bold;">તારીખ</th>
                                    <th style="font-weight: bold; width: 30%; text-align: right;">વિગત</th>
                                </tr>
                            </thead>
                            <tbody id="rightBody">
                            ${udharEntriesHtml}
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex">
                        <table class="table" style="height:fit-content">
                            <thead id="SumRow">
                                <tr>
                                    <th id="GrandLeftSum" style="font-weight: bold;border-top: 1px groove gray;
            border-bottom: 1px groove gray;">${jamaSum}</th>
                                    <th style="font-weight: bold;"></th>
                                    <th id="GrandRightSum" style="font-weight: bold;border-top: 1px groove gray;
            border-bottom: 1px groove gray;">${udharSum}</th>
                                    <th style="font-weight: bold;"></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
</body>

    `;
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    const pdfFileName = 'test.pdf';
    const destinationPath = `${FileSystem.documentDirectory}${pdfFileName}`;

    await FileSystem.moveAsync({
        from: uri,
        to: destinationPath,
    });

    await Sharing.shareAsync(destinationPath).then(() => {

    }).catch((error) => {

    }).finally(() => {

    });

    console.log('PDF saved and shared:', destinationPath);
};

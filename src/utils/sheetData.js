//const url = 'https://sheets.googleapis.com/v4/spreadsheets/1Ekf381ezmw_w8hlIzhUVrg2mZ1aIk5TqSo-5-J9i2gI/values/Sheet1!B2?key=AIzaSyC0mbpbJG9tSiDCahjl34sex2Kr0r-xtcI';
const baseSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';
const SHEET_ID = '1Ekf381ezmw_w8hlIzhUVrg2mZ1aIk5TqSo-5-J9i2gI';

/** 
* @param { string } SHEET_ID
* @returns {Promise<Object>}
*/

async function fetchSheetData(sheetTab, range){
    sheetTab = sheetTab.replace(/ /g, '%20');
    range = `${sheetTab}!${range}`
    const fetch = (await import("node-fetch")).default;
    const url = `${baseSheetUrl}${SHEET_ID}/values/${range}?key=AIzaSyC0mbpbJG9tSiDCahjl34sex2Kr0r-xtcI`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    });

    if(!response.ok) {
        console.error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        throw new Error("Failed to fetch data from Google Sheets");
    }
    
    const data = await response.json();
    const values = data.values || [0];
    return values || [];
}
module.exports = fetchSheetData;
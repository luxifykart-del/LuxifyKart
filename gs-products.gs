/**
 * LUXIFYKART PRODUCTS EXPORT - GOOGLE APPS SCRIPT
 * 
 * This script exports products from Google Sheet to JSON
 * Deploy as Web App to get JSON URL
 */

// Your Google Sheet URL
const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1zgNvCLmEM74wHclzsB_QfNThUNHuaRxUM9b4lE1YSJI/edit";
const SHEET_NAME = "Products"; // Change to your sheet name

function doGet() {
  try {
    const products = getProductsAsJson();
    
    return ContentService
      .createTextOutput(JSON.stringify({ products }, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getProductsAsJson() {
  const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getActiveSheet();
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0].map(h => h.toString().toLowerCase().trim());
  
  const products = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const product = {};
    
    headers.forEach((header, index) => {
      if (row[index] !== "" && row[index] !== undefined) {
        if (row[index] === "true") product[header] = true;
        else if (row[index] === "false") product[header] = false;
        else if (header === "mrp" || header === "selling_price") {
          product[header] = parseFloat(row[index]) || 0;
        } else {
          product[header] = row[index];
        }
      }
    });
    
    if (product.id && product.name) {
      products.push(product);
    }
  }
  
  return products;
}

function test() {
  const products = getProductsAsJson();
  Logger.log(JSON.stringify(products, null, 2));
  return products;
}

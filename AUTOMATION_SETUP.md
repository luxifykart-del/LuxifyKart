# LuxifyKart - Google Sheets + n8n Automation Setup

## ✅ Step 1: Google Apps Script Deploy Karein

1. Google Apps Script open karein: **script.google.com**
2. Niche code paste karein (ye file: `gs-products.gs`):
   
```javascript
// gs-products.gs content - copy from file

const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1zgNvCLmEM74wHclzsB_QfNThUNHuaRxUM9b4lE1YSJI/edit";
const SHEET_NAME = "Products";

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
    if (product.id && product.name) products.push(product);
  }
  return products;
}
```

3. **Deploy > New deployment** click karein
4. Select: **Web app**
5. Description: "LuxifyKart Products API"
6. Execute as: **Me**
7. Who has access: **Anyone** (important!)
8. **Deploy** click karein
9. Copy the **Web App URL** (starts with `https://script.google.com/macros/s/...`)

---

## ✅ Step 2: Google Sheet Setup Karein

Apni Google Sheet mein ensure karein:

| id | name | category | mrp | selling_price | image_url | active |
|----|------|----------|-----|---------------|-----------|--------|

- **Sheet name:** "Products" (ya jo aapne SHEET_NAME mein diya hai)
- Rows mein products add karein

---

## ✅ Step 3: n8n Setup Karein

1. n8n open karein (localhost ya cloud)
2. Import karein `n8n-workflow.json` file
3. **Google Sheet Fetch** node mein:
   - URL replace karein: `https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec`
   - Apni Web App URL daalden
4. Workflow save karein aur activate karein

---

## 🔄 Abhi Ke Liye: Manual Sync

Jab tak n8n setup nahi hota, aap manually products.json update kar sakte hain:
- Google Sheet se data copy karein
- `public/data/products.json` mein paste karein
- Site redeploy karein

---

## 📋 Files Created:
- `gs-products

function doPost(e) {
    var email = JSON.parse(e.postData.contents).email;
  
    var sheet = SpreadsheetApp.openById('1fqd74_7qCCjetg5NKlU1GAfQH-dfvK32gP2zH0Z7XGE').getActiveSheet();
    if (email[1] === 'add') {
      add_email = email[0].toLowerCase();
      sheet.appendRow([email[0], new Date()]);
    }
    else if (email[1] === 'delete') {
      delete_email = email[0].toLowerCase();
      var rows = sheet.getDataRange();
      var numRows = rows.getNumRows();
      var values = rows.getValues();
      for (var i = numRows - 1; i >= 0; i--) {  //Loop backward
      if (values[i][0] == delete_email) {
        sheet.deleteRow(i + 1); //Adjust for 1-based indexing
         }
      }
    }

    return ContentService.createTextOutput(
        JSON.stringify({ status: 'success', message: 'Email saved' })
    )
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
}

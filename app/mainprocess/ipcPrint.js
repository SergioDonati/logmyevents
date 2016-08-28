'use strict';

const {ipcMain, BrowserWindow} = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = function(appManager){

	ipcMain.on('printInvoice', function(event, args){
		let outputPath = path.resolve(appManager.getTempFolder(), 'print_invoice.pdf');

		function reply(err){
			event.sender.send('printInvoice-reply', {
				success: !err,
				error: err,
				outputPath: outputPath
			});
		}

		let invoice = args.invoice;
		if(!invoice) return reply(new Error('Invoice not found'));

		let win = new BrowserWindow({ show:false });
		win.invoice = invoice;
		win.loadURL(path.resolve('renderprocess/windows/invoiceA4/index.html'));
		win.printInvoice = function(){
			win.webContents.printToPDF({
				marginsType: 1,
			  	printBackground: true,
			  	printSelectionOnly: false,
			  	landscape: false,
				pageSize: 'A4'
			}, (error, data) => {
    			if (error) return reply(error);
    			fs.writeFile(outputPath, data, (error) => {
      				if (error) return reply(error);
      				//console.log('Write PDF successfully.');
					reply();
					win.close();
    			});
  			});
		}
	});
}

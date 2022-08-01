const {onIpc, getElectronModule,getBrowserWindow} = require('../../../../lib/helper/ElectronHelper')


onIpc('download-request',(event:any , mediaId) => {
	console.log('download-request',mediaId);
	getElectronModule('dialog')
	.showSaveDialog(getBrowserWindow,{

	})
	.then((resolve:any) => {

	})
	.catch((reject:any) => {

	})
});
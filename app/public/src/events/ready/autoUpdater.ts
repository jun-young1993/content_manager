const { autoUpdater} = require('electron-updater')
import * as isDev from 'electron-is-dev';
// const {getBrowserWindow, getElectronModule} = require('../../../lib/helper/ElectronHelper')
const log = require('../../../lib/Logger');
// const log = require('electron-log')

// function createDefaultUpdateWindow(){
	

	
	
	
	
	
// 	let updateWin = new getElectronModule('BrowserWindow')({
// 		width: 400,
// 		height: 150,
// 		backgroundColor : '#eeeeee',
// 		frame: false,
// 		parent : getBrowserWindow(),
// 		modal : true,
// 		webPreferences : {  
// 			nodeIntegration: true,
// 			contextIsolation: false,
// 			enableRemoteModule: true,
// 		}
// 	})
// 	const rootPath = require('app-root-path').path
// 	updateWin.loadFile(`${rootPath}/src/view/auto_update.html`)
// 	updateWin.on('closed', ()=> {
// 		updateWin = null;
// 	})
// 	return updateWin;
// }
	
// let updateWin = null;

// getBrowserWindow().webContents.setEnabled(false);
autoUpdater.on('update-downloaded', (info) => {
// log.info('update-downloaded')
	log.channel("main").info("[AutoUpdater][update-downloaded] quit and install",info)
	autoUpdater.quitAndInstall()
})
autoUpdater.on('checking-for-update',()=>{
	log.channel("main").info("[AutoUpdater][checking-for-update] checking for update")
// log.info('checking-for-update...');
// createDefaultUpdateWindow()
// updateWin.webContents.send('message','업데이트 확인 중...','auto-update')
})
autoUpdater.on('update-not-available', (info) => {
	log.channel("main").info("[AutoUpdater][update-not-available] update not available / currently the latest version",info)
// log.info('not available.');

// updateWin.webContents.send('message','현재 최신버전입니다.','auto-update')
});
autoUpdater.on('update-available', (info) => {
	log.channel("main").info("[AutoUpdater][update-available]",info)
// log.info('available.');
	// createDefaultUpdateWindow()
// updateWin.webContents.send('message','업데이트가 가능합니다.','auto-update')

});

autoUpdater.on('error', (err) => {
	log.channel("main").error("[AutoUpdater][Exception]",err)
// log.info('에러가 발생하였습니다. 에러내용 : ' + err);
// updateWin.webContents.send('message','에러가 발생하였습니다. 에러내용 : ' + err,'update_error')
});
autoUpdater.on('download-progress', (progressObj) => {
	log.channel("main").info("[AutoUpdater][download-progress]",progressObj.bytesPerSecond)

// let log_message = "다운로드 속도: " + progressObj.bytesPerSecond;
// log_message = log_message + ' - 현재 ' + progressObj.percent + '%';
// log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
// log.info(log_message);
// updateWin.webContents.send('message',progressObj.bytesPerSecond,'update_download_speed')
// updateWin.webContents.send('message',parseInt(progressObj.percent),'update_progress_percent')

})
autoUpdater.on('update-downloaded', (info) => {
// log.info('업데이트가 완료되었습니다.');
log.channel("main").info("[AutoUpdater][update-downloaded] update completed",info)
// updateWin.webContents.send('message','','update_complete')
// app.quit()

});

autoUpdater.checkForUpdates();




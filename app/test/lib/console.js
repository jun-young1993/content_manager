
global.console.log = (string)=> {
	console.info('===================');
	console.info(__filename);
	console.info(string)	
	console.info('===================');

}


console.log('test');
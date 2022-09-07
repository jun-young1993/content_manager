

const files = ['1.mxf','2.mxf','3.mxf'];

const recuriveIngest = (files, number = 0) => {
	console.log(files[number]);
	if(number < (files.length-1)){
		recuriveIngest(files,number+1);
	}
}

recuriveIngest(files)
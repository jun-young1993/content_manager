let requireProcessed = 0;
[1,2,3].forEach((filePath) => {
	requireProcessed++;
	console.log(filePath);

	if(requireProcessed === [1,2,3].length){
		console.log('done');
	}
})
module.exports = {
	apiReject : (msg) => {
		return {
			success : false,
			data : null,
			msg : msg
		}
	},
	apiResolve : (data) => {
		return {
			success : true,
			data : data,
			msg : null
		}
	},
	apiCountResolve : (data,count) => {
		return {
			success : true,
			data : data,
			count : count,
			msg : null
		}
	},
	convertArrayToKeyValue : (datas,options) => {
		let convert = [];
		datas.map((data) => {
			convert[data[options.key]] = data[options.value];
		})
		return convert;
	}

}
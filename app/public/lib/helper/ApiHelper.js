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
	}

}
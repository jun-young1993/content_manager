const { TaskManager } = require("../../../public/lib/Task/TaskManager");




new TaskManager()
		.initialize()
		.then((taskParse) => {
			console.log('taskParse');
			console.log(taskParse);
			// taskParse.module.copy();
			
		})
		.catch((error)=>{
			console.log('error');
			console.log(error);
			
		})
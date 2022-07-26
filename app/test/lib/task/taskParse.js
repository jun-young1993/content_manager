const { TaskManager } = require("../../../public/lib/Task/TaskManager");
const {Task} = require("../../../public/models/Task");
const db = new Task();
// const {Task} = require("../../../public/models/WorkflowRule");
// {"content_id":"nNZg6hAPevBUbh8m","workflow_id":"CEFm95JwruHbRIyN","module_id":"wclq3LLKdqIVV1ew","rule_id":"zukRUE5cHPBcmjJN","source":"D:\\Folder11.ico","target":null,"status":"queue","priority":0,"is_deleted":"N","deleted_at":null,"_id":"lVs1TxGjHgmCLJjW","createdAt":{"$$date":1658722167200},"updatedAt":{"$$date":1658722167200}}
// db.db().find({},(err,data) => {
// 	console.log(data);
// })

db.db().insert({
	content_id:"jbnahFAfl4L5hgY5",
	workflow_id:"upX3kXHDA54DDJkA",
	module_id:"wclq3LLKdqIVV1ew",
	rule_id:"9lIVIBQ4Ixcm5UeW",
	source:"C:\\Users\\jun\\Desktop\\뱀파이어소녀2.mxf",
	target:null,
	status:"queue",
	priority:0,
	is_deleted:"N",
},(err,data) => {
	new TaskManager()
		.initialize()
		.then((taskParse) => {
			
			
			// taskParse.start();
			// taskParse.module.copy();
			
		})
		.catch((error)=>{
			console.log('error');
			console.log(error);
			
		})
})


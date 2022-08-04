// require('module-alias/register');
// require = require('esm')('module/*', 'options*/');
import 'module-alias/register';


// const Task = require('@models/Task');

const {TaskManager} = require("../../../public/lib/Task/TaskManager");
import fs from "fs";



new TaskManager().findWaiting().then((data)=>{
	console.log(data);
}).catch((error) => {
	console.log(error);
});


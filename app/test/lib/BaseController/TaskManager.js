
// require('module-alias/register');
// require = require('esm')('module/*', 'options*/');
require("module-alias/register");
// const Task = require('@models/Task');
var Task = require("@models/Task").Task;
const {TaskManager} = require("@task/TaskManager");


// ===========================================
// FileManager 영역


//==============================================



const TaskMngr = new TaskManager();
TaskMngr.ingest();
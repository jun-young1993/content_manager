import * as React from 'react';
import CircularProgressWithLabel from "@views/components/utill/CircularProgressWithLabel";
import {sender, invoker} from "@views/helper/helper";
import { isEmpty } from 'lodash';
import { clearInterval } from 'timers';
export default function TaskCircularProgress(props: {taskId : string, status : string, progress ?: number })
 {
  const [progress, setProgress] = React.useState(props.progress || 0);
//   data:
//   content_id: "R7wsayUcKPAV1tix"
//   createdAt: Wed Oct 05 2022 21:28:37 GMT+0900 (한국 표준시) {}
//   module_id: "mediainfo_video_online"
//   priority: 0
//   progress: 100
//   rule_id: "user_out_mediainfo_video_online"
//   source: "NVljSlngYYPGCr4v.MXF"
//   source_media_id: "YzkvAWpJaH2PNzF2"
//   status: "complete"
//   target: "ebfz0nNNay6Nulnd.MXF"
//   target_media_id: "L7gRE2r2UsOfZ8CU"
//   updatedAt: Wed Oct 05 2022 21:28:37 GMT+0900 (한국 표준시) {}
//   workflow_id: "user_out_ingest"
//   _id: "ebfz0nNNay6Nulnd"
//   [[Prototype]]: Object
//   success: true
	// const recurciveTask = () => {
	// 	invoker("@Task/$taskProgress",props.taskId)
	// 	.then((task) => {
	// 		if(!isEmpty(task)){
	// 			if(task.success === true){
	// 				if(!isEmpty(task.progress) && task.progress !== 100){
	// 					console.log("TaskCircularProgress",task.progress);
	// 					const timer = setTimeout(recurciveTask,300);
	// 					clearTimeout(timer);
						
	// 				}
	// 			}
	// 		}
	// 		console.log("TaskCircularProgress",task);
	// 	});
	// };
  React.useEffect(() => {
	// const timer = setInterval(() => {
	// 	invoker("@Task/$findOne",props.taskId)
	// 	.then((task) => {
	// 		if(task.data){
	// 			if(task.data.status !== 'complete'){
	// 				console.log(task);
	// 				setProgress(task.data.progress);
					
	// 			}
	// 		}

			
			
			
	// 	});
	// },3000);
	// return () => {
	// 	clearInterval(timer);
	// }
	// if(props.status !== 'complete'){
		
	// }

//     const timer = setInterval(() => {
// 	sender("@Task/_getStatus",props.taskId)
// 	.then((result:any) => {
// 		// setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
// 		console.log('result',result);
// 		setProgress(result);
// 	})
      
//     }, 800);
	// sender("@Task/_getStatus",props.taskId)
	// .then((result:any) => {
	// 	// setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
	// 	console.log('result',result);
	// 	setProgress(result);
	// })
//     return () => {
//       clearInterval(timer);
//     };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}

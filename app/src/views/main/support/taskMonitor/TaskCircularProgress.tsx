import * as React from 'react';
import CircularProgressWithLabel from "@views/components/utill/CircularProgressWithLabel";
import {sender} from "@views/helper/helper";
export default function TaskCircularProgress(props: {taskId : string, status : string, progress ?: number })
 {
  const [progress, setProgress] = React.useState(props.progress || 0);

  React.useEffect(() => {
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

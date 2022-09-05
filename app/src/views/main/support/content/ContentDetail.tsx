import * as React from 'react';
import VideoViewer from "@views/main/support/content/viewer/Video";
import ContentMetadata from "@views/main/support/ingest/ContentMetadata";
import Button from "@mui/material/Button";
export default function ContentDetail(props:{view : string, metadata : any}){
	const contentId = props.metadata._id;

	console.log('detail props ',props);


	const ContentViews = () => {
		if(props.view == 'player'){
			return (
				<VideoViewer 
					content_id={contentId}
				/>
			)
		}
		if(props.view == "metadata"){
			return (
				<ContentMetadata metadata={props.metadata}/>
			)
		}

		return (<></>);
	
	}
	return (
		<>
		<ContentViews />
		</>
	)
}
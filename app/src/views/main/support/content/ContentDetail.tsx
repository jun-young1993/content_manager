import * as React from 'react';
import VideoViewer from "@views/main/support/content/viewer/Video";
import ContentMetadata from "@views/main/support/ingest/ContentMetadata";
import MediaInfo from "@views/main/support/ingest/MediaInfo";
import Button from "@mui/material/Button";
import CardMedia from '@mui/material/CardMedia';
export default function ContentDetail(props:{view : string, metadata : any}){
	const contentId = props.metadata._id;

	console.log('detail props ',props);


	const ContentViews = () => {
		if(props.view == 'player'){
			if(props.metadata.content_type == 'image'){
				return <CardMedia
				component="img"
				sx={{
				    // 16:9
				    // pt: '0%',
				}}
				image={"http://localhost:11101/thumbnail/"+contentId+"?w=248&fit=crop&auto=format"}
				alt="썸네일 생성작업을 요청해주세요."
				onError={(event:any)=>{
				    event.target.style['display'] = 'none';
				    // event.target.style['background-image'] = 'red';
				    // console.log(event);
				    // event.target.src = "https://user-images.githubusercontent.com/102360897/184477107-6769a937-5cdb-4906-8aa2-ef29e6a4c4c9.png";
				    // console.log(event);
				    // // event.stopPropagation();
				    // event.target.onError = () => {
				    //     console.log('target on error');
				    // }
				    // return false;
				}}
			    />
			    
			}
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

		if(props.view == "media_list"){
			return (
				<MediaInfo metadata={props.metadata}></MediaInfo>
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
import * as React from 'react';
import VideoViewer from "@views/main/support/content/viewer/Video";
import ContentMetadata from "@views/main/support/ingest/ContentMetadata";
import MediaInfo from "@views/main/support/ingest/MediaInfo";
import CardMedia from '@mui/material/CardMedia';
import MusicPlayer from "@views/main/support/content/viewer/MusicPlayer";
import Container from "@mui/material/Container";
import {ContentDetailListenerInterface} from "@views/main/Config";

export type views = "player" | "metadata" | "media_list" | "config" ;

interface ContentDetailInterface {
	view : views
	metadata : any
	listener ?:ContentDetailListenerInterface
}
export default function ContentDetail(props:ContentDetailInterface){
	const contentId = props.metadata._id;




	const ContentViews = () => {
		if(props.view == 'player'){
			if(props.metadata.content_type == 'image'){
				return <CardMedia
				component="img"
				sx={{
				    // 16:9
				    // pt: '0%',
				}}
				style={{
					width: "calc(98%)",
					height: "calc(100% - 75px)",
					marginLeft : "calc(1%)",
					backgroundColor : "gray",
					maxWidth : "100%",
					borderRadius: "7px",
					border: "3px solid yellow",
					objectFit : "fill"
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
			if(props.metadata.content_type == 'music'){
				// "http://localhost:11101/play/original/XFAuz7G07wHjDfof"
				
				
				return (
					<Container sx={{height : "auto"}}>
					<MusicPlayer
						url={`http://localhost:11101/play/original/${contentId}`}
						// url={"C:\\Users\\jun\\Downloads\\storage\\online\\HoP7NnFY0bfWvz30.mp3"}
						metadata={props.metadata}
					/>
					</Container>
				);

			}
			if(props.metadata.content_type == 'video'){
				return (				
					<VideoViewer 
						content_id={contentId}
					/>
				)
			}

			return <>None</>
		
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

		if(props.view == "config"){
			// return props.element;
			// return (<ContentDetailPanelConfigLayout
			// />)
		}

		return (<></>);
	
	}
	return (
		<>
		<ContentViews />
		</>
	)
}
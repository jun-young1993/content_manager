import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import ContentDetails , {views} from "@views/main/support/content/ContentDetail";
import { invoker } from "@views/helper/helper";
import DropDownMenu from "@views/components/menu/DropDownMenu";
import BasicAppBar from "@views/components/BasicAppBar";
import Box from '@mui/material/Box';

export type ContentDetailWindowMode = "hash" | "base";

export interface ContentDetailWindowProps {
	mode ?: ContentDetailWindowMode
	contentId ?: string
	
}

const reducer = (prevState:any, newState:any) => ({
	...{},
	...prevState,
	...newState
    })
/**
 * 콘텐츠 상세보기 
 * @param ContentDetailWindowProps
 * @returns React.Node
 */
export default function ContentDetail(props:ContentDetailWindowProps){
	
	/**
	 * 모드에 따라 콘텐츠 아이디 가져오기
	 * 
	 * @returns null | contentId
	 */
	const getContentId = () => {
		if(isEmpty(props.mode) || props.mode === "hash"){
			const urlSearchParams = new URLSearchParams(window.location.hash.split('?')[1]);
			if(urlSearchParams.has('content_id')){
				return urlSearchParams.get('content_id');
			}
		}

		return null;
	}

	const [state , setState] = React.useReducer(reducer,{
		view : "player",
		element : <></>,
		metadata : {},
	});
	console.log('content detail renderer',state);
	const changeView = (view:views) => {
		if(state.view !== view){
			setState({view :view});
		}
	}
	const contentId : string | null = props.contentId || getContentId();
	React.useEffect(()=>{
		if(!isEmpty(contentId)){
			invoker("@Content/$show",contentId)
			.then((result) => {
				console.log('요청순');
				setState({metadata:result.data});
			})
		}
	},[])
	
	
	// invoker()
		// console.log("searchParams.get('content_id')",searchParams.get('content_id'));
		
	return (
		// <Box sx={{display : 'flex'}}>
		<>
			<BasicAppBar 
				toolbar={[
					<DropDownMenu 
						items={[{
							title : "미리보기",
							key : "player",
							onClick : () => {
								changeView("player");
							}
						},{
							title : "메타데이터",
							key : "metadata",
							onClick : () => {
								changeView("metadata");
							}
						},{
							title : "미디어 목록",
							key : "media_list",
							onClick : () => {
								changeView("media_list");
							}
						}]}
					/>
				]}
				title={"콘텐츠 상세보기"}
			/>
			<ContentDetails 
				view={state.view}
				metadata={state.metadata}
			/>
		</>
		// </Box>
		// <>content detail component</>
	)
	
}
// export default function ContentDetail(props:any) {
// 	console.log("start content detail");
	
// 	let {content_id} = useParams();
	
// 	console.log("params",props);
// 	return (
// 	<>
// 	hi
// 	</>
// 	)
// }
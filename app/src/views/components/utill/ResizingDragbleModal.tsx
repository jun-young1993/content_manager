import {useState, cloneElement} from 'react';
// import ReactModal from 'react-modal-resizable-draggable';
import FlexibleModal  from "@views/components/utill/ResizingDragbleModal/index";
import LanShare from '../../main/LanShare';
export interface BasicModalPropsContentEvent {
	close : () => void
}
export interface ResizebleDragbleModalState {
	backdrop ?: Boolean
	button ?: JSX.Element
    	content : JSX.Element | ((event :BasicModalPropsContentEvent) => JSX.Element)
	hideHeader ?: Boolean
	open ?: Boolean
	setOpen ?: any
	initWidth ?: number
	initHeight ?: number
}
export default function ResizebleDragbleModal(props : ResizebleDragbleModalState){
	const [open, setOpen] = useState<Boolean>(props.open || false);
	const handleOpen = () => {
		
		setOpen(true);
	}
	const handleClose = () => {
		
		setOpen(false);
		
	}
	const [content, setContent] = useState(typeof props.content === "function" ? props.content({close : handleClose}) : props.content);
	// const modal = useRef(null);
	return (
		
		<>
		{props.button ? 
		cloneElement(props.button,{
			onClick : () => {
				handleOpen();
			}
		})
		: <></>
		}
		<FlexibleModal
		//     ref={modal} 
		    hideHeader={Boolean(props.hideHeader)}
                    initWidth={props.initWidth || 800} 
                    initHeight={props.initHeight || 400} 
                    onFocus={() => {
			// console.log("modal ref",modal);
		    }}
                //     className={"my-modal-custom-class"}
                    onRequestClose={()=>{
                        if(props.backdrop){
				handleClose();		
			}
                        // this.closeModal
                    }} 
                    isOpen={Boolean(open)}
		    >
			{/* <LanShare /> */}
			{content}
                </FlexibleModal>
		</>
	)
}
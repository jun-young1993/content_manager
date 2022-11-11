import {useState, useEffect} from "react";
import LoadingDropDownMenuButton from "@views/components/menu/LoadingDropDownMenuButton";
import {invoker} from "@views/helper/helper";
export default function StorageMonitor(){
	const [storageType, setStorageType] = useState([]);
	const [storage, setStorage] = useState([]);
	useEffect(() => {
		invoker("@CodeItem/$indexByParentCode","storage_type")
		.then((storageTypes) => {
			// console.log('result code storeagte_type',result);
			// setItem(result.data.map((storageType:any) => {
			// 	storageType.title = storageType.code;
			// 	return storageType;
			// }));
			invoker("@Storage/$index")
			.then((storages) => {
				console.log('storageTypes',storageTypes);
				console.log('storages',storages);
			})
		})
	},[])
	
	return (
		<LoadingDropDownMenuButton
			title={"스토리지"} 
			item={storageType}
		/>
	);
}
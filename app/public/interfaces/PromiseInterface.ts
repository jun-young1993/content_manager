
import {Nullable} from "./Types/Nullable";
export default interface PromiseInterface<T> {
	success : boolean,
	data? : Nullable<T>,
	msg? : null | string
}
// export default interface RejectInterface {
// 	success : boolean,
// 	msg : null | string
// }


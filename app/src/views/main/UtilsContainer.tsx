import TaskSnackBar from "@views/main/support/utils/TaskSnackBar";
import {ipcRenderer, IpcRendererEvent} from "electron";
import {VariantType} from "notistack";

export default function UtilsContainer() {

    return (
        <TaskSnackBar />
    )
}
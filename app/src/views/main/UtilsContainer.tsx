import TaskSnackBar from "@views/main/support/utils/TaskSnackBar";

import ShowAlert from "@views/main/support/utils/ShowAlert";
import ShowConfirm from "@views/main/support/utils/ShowConfirm";

export default function UtilsContainer() {

    return (
        <>
            <TaskSnackBar />
            <ShowAlert />
            <ShowConfirm />
        </>
    )
}
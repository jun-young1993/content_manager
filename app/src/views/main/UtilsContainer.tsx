import TaskSnackBar from "@views/main/support/utils/TaskSnackBar";

import ShowAlert from "@views/main/support/utils/ShowAlert";
import ShowConfirm from "@views/main/support/utils/ShowConfirm";
import ShowDrawer from "@views/main/support/utils/ShowDrawer";

import UpdateSnackbar from "@views/main/support/snackbar/UpdateSnackbar";
export default function UtilsContainer() {

    return (
        <>
            <TaskSnackBar />
            <ShowAlert />
            <ShowConfirm />
            <UpdateSnackbar />
            <ShowDrawer />
        </>
    )
}
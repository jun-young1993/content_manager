import * as React from 'react';
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import MenuList from '@views/main/support/config/MenuList';

import Metadata from "@views/main/Metadata";
import Code from "@views/main/Code";
import Storage from "@views/main/Storage";
import Module from "@views/main/Module";
import Workflow from "@views/main/Workflow";
import ConfigStore from "@views/store/ConfigStore";
import {ipcRenderer, IpcRendererEvent} from "electron";
import TaskMonitor from "@views/main/TaskMonitor";
import BaseGrid from "@views/components/grid/BaseGrid";
export default function Config() {
	const [view, setView] = React.useState(<Metadata />)

	

	return (
		<>


		</>
	);
}

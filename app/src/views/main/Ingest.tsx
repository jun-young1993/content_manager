import React, {useState, Component, ReactNode} from 'react';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const metadatas = ipcRenderer.sendSync("@CodeItem/indexByParentCode","METADATA");
	
function Ingest(){
	console.log('metadatas',metadatas)	
	return (
		<>
		</>
	);
}

export default Ingest;
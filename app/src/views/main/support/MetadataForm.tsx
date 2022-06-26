import React, {useState, Component, ReactNode} from 'react';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const metadataFields = ipcRenderer.sendSync("@Metadata/index");

function MetadataForm(){
    console.log('metadatas',metadataFields)
    return (
        <>
        </>
    );
}

export default MetadataForm;
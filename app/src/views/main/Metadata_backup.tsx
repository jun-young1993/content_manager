import React, {useState, Component, ReactNode} from 'react';
import {
    getSelectedState,
    Grid,
    GridColumn as Column, GridHeaderSelectionChangeEvent,
    GridSelectionChangeEvent,
    GridToolbar
} from "@progress/kendo-react-grid";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import '@progress/kendo-theme-default/dist/all.css';
import BaseModal from '../modals/BaseModal';
import {getter} from "@progress/kendo-data-query";
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;



const DATA_ITEM_KEY: string = "_id";
const SELECTED_FIELD: string = "selected";
const idGetter = getter(DATA_ITEM_KEY);


interface MetadataState {
    data: [];
    modal : {
        show : boolean
    }
    selectedState: {
        [id: string]: boolean | number[];
    };
}


class Metadata extends Component {
    state : MetadataState = {
        data: ipcRenderer.sendSync("@Metadata/index").data.map((dataItem:object) => {
            return Object.assign({ selected: false }, dataItem);
        }),
        modal : {
            show : true
        },
        selectedState : { 1 : true}
    }
    onSelectionChange = (event: GridSelectionChangeEvent) => {
        const selectedState = getSelectedState({
            event,
            selectedState: this.state.selectedState,
            dataItemKey: DATA_ITEM_KEY,
        });
            
        this.setState({ selectedState });
    };
    onHeaderSelectionChange = (event: GridHeaderSelectionChangeEvent) => {
        const checkboxElement: any = event.syntheticEvent.target;
        const checked = checkboxElement.checked;
        const selectedState = {};

        this.state.data.forEach((item) => {
            // @ts-ignore
            selectedState[idGetter(item)] = checked;
        });

        this.setState({ selectedState });
    };
    onKeyUpHandler = (event:any) => {
        console.log(event.target.value);
    };
    customClick = () => {
        alert("Custom handler in custom toolbar");
    }
    constructor(props : any) {
        super(props);
    }
    load(){

        const metadataFields = ipcRenderer.sendSync("@Metadata/index");
        if(metadataFields.success){
            // @ts-ignore
            this.setState({
                data : metadataFields.data
            })
        }
    }
    render() {
        const _this = this;
        return (
            <>
            <Grid
                style={{
                    height: "400px",
                }}
                data={this.state.data.map((item:object) => ({
                    ...item,
                    [SELECTED_FIELD]: this.state.selectedState[idGetter(item)],
                }))}
                dataItemKey={DATA_ITEM_KEY}
                selectedField={SELECTED_FIELD}
                selectable={{
                    enabled: true,
                    drag: false,
                    cell: false,
                    mode: "multiple",
                }}
                onSelectionChange={this.onSelectionChange}
                onHeaderSelectionChange={this.onHeaderSelectionChange}
            >
                     <GridToolbar>
                         <BaseModal
                            button = {{
                                title : "등록",
                                click : (modal : BaseModal,)=> {
                                  modal.show();
                                }
                            }}
                            fields = {
                                [{
                                    text : '필드코드',
                                    name : 'code',
                                    id : 'code'
                                },{
                                    text : '필드명',
                                    name : 'name',
                                    id : 'name'
                                },{
                                    element : () => {
                                        return

                                            <DropdownButton id="dropdown-item-button" title="Dropdown button">
                                                <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                                                <Dropdown.Item as="button">Action</Dropdown.Item>
                                                <Dropdown.Item as="button">Another action</Dropdown.Item>
                                                <Dropdown.Item as="button">Something else</Dropdown.Item>
                                            </DropdownButton>

                                    }
                                },{
                                    text : '필수값',
                                    name : 'required',
                                    id : 'required'
                                },{
                                    text : "설명",
                                    name : "description",
                                    id : "description"
                                }]
                            }
                            buttons = {
                                [{
                                    text : 'close',
                                    click : (modal: BaseModal) => {
                                        modal.close()
                                    }
                                },{
                                    text : 'save',
                                    click : (modal: BaseModal) => {
                                        const userInsert = ipcRenderer.sendSync("@Storage/insert",modal.getInputValues());

                                        if(userInsert.success){
                                
                                            _this.load();
                                            modal.close();
                                
                                        }

                                    }
                                }]
                            }
                         />
                     </GridToolbar>
                <Column
                    field={SELECTED_FIELD}
                    width="50px"
                    headerSelectionValue={
                        this.state.data.findIndex(
                            (item) => !this.state.selectedState[idGetter(item)]
                        ) === -1
                    }
                />
                <Column field="field" title="필드" width="100px" />
                <Column field="field_nm" title="필드명" width="100px" />
                {/*<GridColumn field="ProductID" title="ID" width="40px" />*/}
                {/*<GridColumn field="ProductName" title="Name" width="250px" />*/}
                {/*<GridColumn field="Category.CategoryName" title="CategoryName" />*/}
                {/*<GridColumn field="UnitPrice" title="Price" />*/}
                {/*<GridColumn field="UnitsInStock" title="In stock" />*/}
            </Grid>

            </>
        );
    }
}

export default Metadata;
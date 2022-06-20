import React, {useState, Component, ReactNode} from 'react';
import {
    getSelectedState,
    Grid,
    GridColumn as Column, GridHeaderSelectionChangeEvent,
    GridSelectionChangeEvent,
    GridToolbar,
    GridDetailRowProps,
    GridExpandChangeEvent
} from "@progress/kendo-react-grid";
import '@progress/kendo-theme-default/dist/all.css';
import BaseModal from '../modals/BaseModal';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
import {Button, FormControl, InputGroup, Modal, FormGroup,FormLabel} from "react-bootstrap";






interface State {
    data: [];
    parent_data : any,
    modal : {
        show : boolean
    }
}
interface Props {
    parent_data? : any
}


class CodeItem extends Component<Props> {
    state : State = {
        data: [],
        parent_data : null,
        modal: {
            show: true
        }
    }

    parent_data = null

    constructor(props : any) {
        super(props);
        Object.assign(this.state,props);
        console.log('this.state',this.state);
    }
    load(){
        console.log('start load user');
        const users = ipcRenderer.sendSync("@CodeItem/index");
        if(users.success){
            // @ts-ignore
            this.setState({
                data : users.data
            })
        }
    }
    getParentData(key : string){
        return this.state.parent_data[key];
    }
    render() {
        const _this = this;

        return (
            <>
            <Grid

                data={this.state.data}
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
                                [
                                    {
                                        element : () => {
                                            return   <FormGroup>
                                                <FormControl
                                                    value={this.state.parent_data.code_name+' ('+this.state.parent_data.code+')'}
                                                    readOnly
                                                />
                                            </FormGroup>;
                                        }
                                    },{
                                    text : '코드',
                                    name : 'code',
                                    id : 'code'
                                },{
                                    text : '코드명',
                                    name : 'code_name',
                                    id : 'code_name'
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


                                        const insertCodeItem = {
                                          parent_code :this.state.parent_data.code
                                        };


                                        Object.assign(insertCodeItem,modal.getInputValues());

                                        const userInsert = ipcRenderer.sendSync("@CodeItem/insert",insertCodeItem);

                                        if(userInsert.success){
                                
                                            _this.load();
                                            modal.close();
                                
                                        }

                                    }
                                }]
                            }
                         />
                     </GridToolbar>
                {/*<Column*/}
                {/*    field={SELECTED_FIELD}*/}
                {/*    width="50px"*/}
                {/*    headerSelectionValue={*/}
                {/*        this.state.data.findIndex(*/}
                {/*            (item) => !this.state.selectedState[idGetter(item)]*/}
                {/*        ) === -1*/}
                {/*    }*/}
                {/*/>*/}
                <Column field="code" title="코드" width="200px" />
                <Column field="code_name" title="코드명" width="200px" />
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

export default CodeItem;
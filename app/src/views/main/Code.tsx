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
import {getter} from "@progress/kendo-data-query";
import CodeItem  from './CodeItem';


const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;



const DATA_ITEM_KEY: string = "_id";
const SELECTED_FIELD: string = "selected";
const idGetter = getter(DATA_ITEM_KEY);


interface UserState {
    data: [];
    modal : {
        show : boolean
    }
    selectedState: {
        [id: string]: boolean | number[];
    };
}
const DetailComponent = (props:GridDetailRowProps) => {
    console.log('detail component',props);
    const dataItem = props.dataItem;
    const tmp = [];
    tmp.push(dataItem);
    return (

            <Grid
                data={tmp}
                dataItemKey={DATA_ITEM_KEY}
            >
                <Column field="code" title="이름" width="100px" />
                <Column field="code_name" title="폰" width="100px" />
            </Grid>

    );
    return (
        <div
            style={{
                height: "50px",
                width: "100%",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                }}
            >
                <div className="k-loading-image" />
            </div>
        </div>
    );
};

class Code extends Component {
    state : UserState = {
        data: ipcRenderer.sendSync("@Code/index").data.map((dataItem:object) => {
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
            console.log(selectedState);
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
    onExpandChange = (event : GridExpandChangeEvent) => {
        let newData = this.state.data.map((item: any) => {

            if (item._id === event.dataItem._id) {
                item.expanded = !event.dataItem.expanded;
            }
            return item;
        });
        this.setState(newData);
    }
    detailComponent = (props:GridDetailRowProps) => {
        const dataItem = props.dataItem;

        console.log('detailComponent',dataItem);
        return (
            <CodeItem
                parent_data={dataItem}
            />
            // <CodeItem
            //
            // ></CodeItem>
            // <Grid
            //     data={tmp}
            //     dataItemKey={DATA_ITEM_KEY}
            // >
            //     <Column field="code" title="이름" width="100px" />
            //     <Column field="code_name" title="폰" width="100px" />
            // </Grid>

        );
    }
    onKeyUpHandler = (event:any) => {
        console.log(event.target.value);
    };
    customClick = () => {
        alert("Custom handler in custom toolbar");
    }
    constructor(props : any) {
        super(props);
    }
    loadUser(){
        console.log('start load user');
        const users = ipcRenderer.sendSync("@Code/index");
        if(users.success){
            // @ts-ignore
            this.setState({
                data : users.data
            })
        }
    }
    render() {
        const _this = this;
        console.log(this.state.data);
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
                detail={this.detailComponent}
                dataItemKey={DATA_ITEM_KEY}
                selectedField={SELECTED_FIELD}
                expandField="expanded"
                selectable={{
                    enabled: true,
                    drag: false,
                    cell: false,
                    mode: "single",
                }}
                onExpandChange={this.onExpandChange}
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
                                        const userInsert = ipcRenderer.sendSync("@Code/insert",modal.getInputValues());

                                        if(userInsert.success){
                                
                                            _this.loadUser();
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

export default Code;
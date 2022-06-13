import {useState, Component, ReactNode} from 'react';
import {Grid, GridColumn, GridToolbar} from "@progress/kendo-react-grid";
import '@progress/kendo-theme-default/dist/all.css';
import BaseModal from '../modals/BaseModal';
import * as path from 'path';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class User extends Component {
    state = {
        data: [],
        modal : {
            show : true
        }
    }

    customClick = () => {
        alert("Custom handler in custom toolbar");
    }
    constructor(props : any) {
        super(props);
        const users = ipcRenderer.sendSync("@User/index");


        if(users.success){

            // @ts-ignore
            this.state.data = users.data;
            // this.setState({
            //     data : [{
            //         user_name : 'test'
            //     }]
            // })
        }
    }
    loadUser(){
        console.log('start load user');
        const users = ipcRenderer.sendSync("@User/index");
        if(users.success){
            // @ts-ignore
            this.setState({
                data : users.data
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
                             [{
                                 text : '이름',
                                 name : 'user_name',
                                 id : 'user_name',
                             },{
                                 text : '폰',
                                 name : 'phone_number',
                                 id : 'phone_number'
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
                                        const userInsert = ipcRenderer.sendSync("@User/insert",modal.getInputValues());
                                        console.log('return userInsert',userInsert);
                                        if(userInsert.success){
                                            console.log('insert afetr reload');
                                            _this.loadUser();
                                            modal.close();
                                        }

                                    }
                                }]
                            }
                         />
                     </GridToolbar>
                <GridColumn field="user_name" title="이름" width="100px" />
                <GridColumn field="phone_number" title="폰" width="100px" />
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

export default User;
import {useState, Component, ReactNode} from 'react';
import {Grid, GridColumn, GridToolbar} from "@progress/kendo-react-grid";
import '@progress/kendo-theme-default/dist/all.css';
import BaseModal from '../modals/BaseModal';
import * as path from 'path';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class User extends Component {
    state = {
        data: [
            {'Column1':'A1', 'Column2':'A2'},
            {'Column1':'B1', 'Column2':'B2'},
            {'Column1':'C1', 'Column2':'C2'}
        ],
        modal : {
            show : true
        }
    }

    customClick = () => {
        alert("Custom handler in custom toolbar");
    }

    render() {
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


                                    }
                                }]
                            }
                         />
                     </GridToolbar>
                <GridColumn field="Column1" title="column1" width="40px" />
                <GridColumn field="Column2" title="column2" width="40px" />
                <GridColumn field="ProductID" title="ID" width="40px" />
                <GridColumn field="ProductName" title="Name" width="250px" />
                <GridColumn field="Category.CategoryName" title="CategoryName" />
                <GridColumn field="UnitPrice" title="Price" />
                <GridColumn field="UnitsInStock" title="In stock" />
            </Grid>

            </>
        );
    }
}

export default User;
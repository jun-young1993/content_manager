// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore

// import {Calendar as Calen} from 'react-bootstrap-calendar';
import Kalend, { CalendarView, OnPageChangeData, OnSelectViewData, OnNewEventClickData, OnEventClickData } from 'kalend' // import component



// import 'kalend/dist/styles/index.css'; // import styles


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import {useState, Component, ReactNode} from 'react';
import { threadId } from 'worker_threads';
import { render } from '@testing-library/react';
import {Table} from "react-bootstrap";
import {Grid, GridColumn, GridToolbar} from "@progress/kendo-react-grid";
// import "@progress/kendo-theme-default/dist/all.css";
// Set the variables here.
// import "@progress/kendo-theme-bootstrap/dist/all.css";
// import "bootstrap/scss/bootstrap.css";
import '@progress/kendo-theme-default/dist/all.css';


class User extends Component {
    state = {
        data: [
            {'Column1':'A1', 'Column2':'A2'},
            {'Column1':'B1', 'Column2':'B2'},
            {'Column1':'C1', 'Column2':'C2'}
        ]
    }

    customClick = () => {
        alert("Custom handler in custom toolbar");
    }

    render() {
        return (
            <Grid
                style={{
                    height: "400px",
                }}
                data={this.state.data}
            >
                     <GridToolbar>
                         <button
                             title="Click"
                             className="k-button k-primary"
                             onClick={this.customClick}
                         >
                             등록
                         </button>
                     </GridToolbar>
                <GridColumn field="Column1" title="column1" width="40px" />
                <GridColumn field="Column2" title="column2" width="40px" />
                <GridColumn field="ProductID" title="ID" width="40px" />
                <GridColumn field="ProductName" title="Name" width="250px" />
                <GridColumn field="Category.CategoryName" title="CategoryName" />
                <GridColumn field="UnitPrice" title="Price" />
                <GridColumn field="UnitsInStock" title="In stock" />
            </Grid>
            // <Grid data={this.state.data}>
            //     <GridToolbar>
            //         <button
            //             title="Click"
            //             className="k-button k-primary"
            //             onClick={this.customClick}
            //         >Click
            //         </button>
            //     </GridToolbar>
            // </Grid>
        );
    }
}

export default User;
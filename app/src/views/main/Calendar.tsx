

// import {Calendar as Calen} from 'react-bootstrap-calendar';
import Kalend, { CalendarView, OnPageChangeData, OnSelectViewData, OnNewEventClickData, OnEventClickData } from 'kalend' // import component



import 'kalend/dist/styles/index.css'; // import styles


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import { useState, Component } from 'react';
import { threadId } from 'worker_threads';
/**
 * 
 * https://reactjsexample.com/react-calendar-component-with-support-for-multiple-views-and-events/
 * https://docs.kalend.org/docs/intro
 * @returns 
 */
// function Calendar(){
    const events : any[] = [

    ]

    const modalData : any = {
        startAt : null,
        endAt : null
    }
class Calendar extends Component {
    state = {
        show : false,
        newData : null,
        events : events,
        modal : modalData
        // [
        //     {
        //     id: 1,
        //     startAt: '2022-05-15T15:00:00.000Z',
        //     endAt: '2022-05-15T16:00:00.000Z',
        //     timezoneStartAt: 'Europe/Berlin', // optional
        //     summary: 'test',
        //     color: 'blue',
        //     calendarID: 'work'
        // },
        // {
        //     id: 2,
        //     startAt: '2022-05-15T18:00:00.000Z',
        //     endAt: '2022-05-15T19:00:00.000Z',
        //     timezoneStartAt: 'Europe/Berlin', // optional
        //     summary: 'test',
        //     color: 'blue',
        // }
        // ]
    }
    onInsert = () => {
        const test  = (document.getElementById('test') as HTMLInputElement).value;
        console.log(test);
        
   
    }
    show = (show = true) => {
        this.setState({
            show : show
        })
    }
    close = () => {
        this.show(false)
    }
    onEventClick = (data : OnEventClickData) => {
        console.log('onEventClick',data);
    }

    setModalData = (data : OnNewEventClickData) => {
        this.setState({
            modal : {
                startAt : data.startAt,
                endAt : data.endAt
            }
        })
    }
    onNewEventClick = (data : OnNewEventClickData) => {
        console.log('onNewEventClick',data);

       this.show();

       const startAt : any = data.startAt;
       const endAt : any = data.endAt;
       const random : Math|any = Math.random();
       const randomInt:any = random * 100;
       this.setModalData(data);
       this.state.events.push({
           id : parseInt(randomInt),
           startAt: startAt,
           endAt: endAt,
           timezoneStartAt: 'Asia/Seoul', // optional
           summary: '',
           color: '',
        //    calendarID: 'work'
       })

       this.setState({
           events : this.state.events
       })
       
    }

    onSelectView = (data : OnSelectViewData) => {
        console.log('onSelectView',data);
    }


    onPageChange = (data: OnPageChangeData) => {
        console.log('onPageChange',data);
    }

    selectedView = CalendarView.THREE_DAYS;
    render(){
        return (
            <>
            
                <Kalend
                onEventClick={this.onEventClick}
                onNewEventClick={this.onNewEventClick}
                events={this.state.events}
                // events={events}
                initialDate={new Date().toISOString()}
                hourHeight={60}
                initialView={CalendarView.WEEK}
                disabledViews={[CalendarView.DAY]}
                onSelectView={this.onSelectView}
                selectedView={this.selectedView}
                onPageChange={this.onPageChange}
                timeFormat={'24'}
                timezone = {'Asia/Seoul'}
                weekDayStart={'Monday'}
                calendarIDsHidden={['work']}
                language={'en'}
                />
                <Modal show={this.state.show}>
                    <Modal.Header>
                        <Modal.Title>일정 등록</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {this.state.modal.startAt}-{this.state.modal.endAt}
                    <InputGroup className="mb-3">
                        <InputGroup.Text></InputGroup.Text>
                        <FormControl
                        // placeholder="Username"
                        // aria-label="Username"
                        // aria-describedby="basic-addon1"
                        id="test"
                        value='test'
                        readOnly
                        />
                    </InputGroup>
                    <Button variant="primary" onClick={this.onInsert}>
                            Submit
                    </Button>
                    <Button variant="primary" onClick={this.close}>
                        Close
                        </Button>
                    {/* <Form>
                        <Form.Group>
                        <Form.Control size="lg" type="text" placeholder="Large text" />
                        <br />
                        <Form.Control type="text" placeholder="Normal text" />
                        <br />
                        <Form.Control size="sm" type="text" placeholder="Small text" />
                        </Form.Group>
                        <br />
                        
                      
                    </Form> */}
                        {/* Woohoo, you're reading this text in a modal! */}
                        {/* {this.state.newData} */}
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
    
}





export default Calendar;
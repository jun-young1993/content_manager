

// import {Calendar as Calen} from 'react-bootstrap-calendar';
import Kalend, { CalendarView, OnPageChangeData, OnSelectViewData, OnNewEventClickData, OnEventClickData } from 'kalend' // import component



import 'kalend/dist/styles/index.css'; // import styles


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, Component } from 'react';
/**
 * 
 * https://reactjsexample.com/react-calendar-component-with-support-for-multiple-views-and-events/
 * https://docs.kalend.org/docs/intro
 * @returns 
 */
// function Calendar(){
class Calendar extends Component {
    state = {
        show : false,
        newData : null
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
    onNewEventClick = (data : OnNewEventClickData) => {
        console.log('onNewEventClick',data);

       this.show();
       this.setState({
           newData : JSON.stringify(data)
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
                events={[  {
                    id: 1,
                    startAt: '2022-05-15T15:00:00.000Z',
                    endAt: '2022-05-15T16:00:00.000Z',
                    timezoneStartAt: 'Europe/Berlin', // optional
                    summary: 'test',
                    color: 'blue',
                    calendarID: 'work'
                },
                {
                    id: 2,
                    startAt: '2022-05-15T18:00:00.000Z',
                    endAt: '2022-05-15T19:00:00.000Z',
                    timezoneStartAt: 'Europe/Berlin', // optional
                    summary: 'test',
                    color: 'blue',
                }]}
                initialDate={new Date().toISOString()}
                hourHeight={60}
                initialView={CalendarView.WEEK}
                disabledViews={[CalendarView.DAY]}
                onSelectView={this.onSelectView}
                selectedView={this.selectedView}
                onPageChange={this.onPageChange}
                timeFormat={'24'}
                weekDayStart={'Monday'}
                calendarIDsHidden={['work']}
                language={'en'}
                />
                <Modal show={this.state.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Woohoo, you're reading this text in a modal! */}
                        {this.state.newData}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" 
                             onClick={this.close}
                    >
                        Close
                    </Button>
                    <Button variant="primary" 
                    onClick={this.close}
                    >
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
    
}





export default Calendar;
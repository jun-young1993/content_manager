import React from "react";
import {Component} from "react";
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import User from "../main/User";
interface ModalProps {
    show? : boolean
    button : object,
    fields : Array<Fields>

}
interface Fields{
    text : string,
    id : string,
    name : string
}
class BaseModal extends Component<ModalProps> {
    state = {
        show : false,
        button : {
            title : 'no title',
            click : (self)=> {
                alert('no function')
            }
        },
        fields : [{
            text : 'no text',
            id : 'no id',
            name : 'no name'
        }],
    }
    private inputValues: {};
    constructor(props){
        super(props);


        Object.assign(this.state,props);
        this.inputValues = {};

    }
    show(show = true){
        this.setState({
            show : show
        })
    }
    click = () => {

        this.state.button.click(this);
    }
    close = () => {
        this.show(false);
    }
    save = () => {
        // this.state.fields.map((object,index)=>{
        //
        // });

        console.log(this.inputValues);
        // alert('save');
    }
    getFields = () => {
        return this.state.fields;
    }
    settingFields = () => {

        return this.getFields().map((object,index)=>{



            return (
                <InputGroup>
                    <InputGroup.Text >{object.text}</InputGroup.Text>
                    <FormControl id={object.id} name={object.name} onChange={this.updateInputValues}></FormControl>
                </InputGroup>
            );
        })

    }
    updateInputValues = (evt) => {

        this.inputValues[evt.target.name] = evt.target.value;
    }
    render() {
        return (
            <>
                <Button onClick={this.click}>
                    {this.state.button.title}
                </Button>
                <Modal show={this.state.show} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.settingFields()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.close}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.save}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}

export default BaseModal;
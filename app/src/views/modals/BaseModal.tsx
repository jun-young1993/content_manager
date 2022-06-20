import React, {Component, Fragment, ReactElement} from "react";

import {Button, FormControl, InputGroup, Modal, FormGroup, FormLabel} from "react-bootstrap";
import User from "../main/User";
interface ModalProps {
    show? : boolean;
    button : object;
    buttons? :Array<Buttons>;
    fields? : any;

}
interface Buttons{
    text : string;
    click? : any;
}
interface Fields{
    text : string,
    id : string,
    name : string,
    onKeyPress? : any,
    value? : any,
    readOnly? : boolean
}
class BaseModal extends Component<ModalProps> {
    state = {
        show : false,
        button : {
            title : 'no title',
            click : (self : BaseModal)=> {
                alert('no function')
            }
        },
        fields : [{
            text : 'no text',
            id : 'no id',
            name : 'no name',
            onKeyPress : null
        }],
        buttons : [{
            text : 'close',
            click : (self : BaseModal) => {
                this.show(false);
            }
        }]
    }
    private inputValues: {};
    constructor(props : ModalProps){
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
    getInputValues = () => {
        return this.inputValues;
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
    getButtons = () => {
        return this.state.buttons;
    }
    settingFields = () => {

        return this.getFields().map((object:any,index)=>{
            if(object.element){
                return (object.element());
            }
            const value = object.value;
            let FormField: any;
            FormField = <FormControl
                id={object.id}
                name={object.name}
                onChange={this.updateInputValues}
                onKeyPress={event => {
                    if(object.onKeyPress){
                        object.onKeyPress(event);
                    }
                }}
                value={value}
            />

            return (
                <FormGroup>
                    <FormLabel >{object.text}</FormLabel>
                    {FormField}
                </FormGroup>
            );
        })

    }
    settingButtons = ()=> {
        const _this = this;
        return this.getButtons().map((object) => {
            return (
                <Button onClick={() => object.click(_this)}>
                    {object.text}
                </Button>
            )
        })
    }
    updateInputValues = (evt : any) => {
        const _this : any = this;

        _this.inputValues[evt.target.name] = evt.target.value;
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
                        {this.settingButtons()}
                        {/*<Button variant="secondary" onClick={this.close}>*/}
                        {/*    Close*/}
                        {/*</Button>*/}
                        {/*<Button variant="primary" onClick={this.save}>*/}
                        {/*    Save Changes*/}
                        {/*</Button>*/}
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}

export default BaseModal;
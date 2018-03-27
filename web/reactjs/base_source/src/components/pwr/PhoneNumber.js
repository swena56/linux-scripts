import React from 'react';
import { 
  FormGroup, Label, InputGroup, 
  InputGroupAddon, InputGroupText, Input, 
  Button } from 'reactstrap';

import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tooltip } from 'reactstrap';

import FontAwesome  from 'react-fontawesome';


export default class PhoneNumber extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = {
      phone: this.props.value,
      isValid: false
    };

     this.updateForm = this.updateForm.bind(this);
  }

  componentDidMount() {
      console.log( this);
      this.validate(this.state.phone);
  }

  updateForm(event)
  {
    
    //event.preventDefault();

    var updateWhat = event.target.placeholder;
    console.log("Update:", updateWhat, event.target.value);

    //this.state.data.phone = event.target.value;
    this.setState( {phone: event.target.value });

    this.validate(event.target.value);
  }

  validate(phone){
    
    var myRe = /^\d{10}$/;  //ten digits
    myRe = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/;
    
    console.log( myRe.exec(phone) );
     if( myRe.exec(phone) != null ){
        this.setState( {isValid: true });
      } else{
          this.setState( {isValid: false });  
      }
  }

  call()
  {
    console.log("Call Phone");

    if( this.state.isValid ){
      var win = window.open("tel:" + this.state.phone, '_blank');
      win.focus();
    }
  }

  render() {

    var phone_form = null;

    if( this.state.isValid == true ){
      phone_form = (<Input valid onChange={ (e) => this.updateForm(e) } placeholder="Phone" pattern="^\d{4}-\d{3}-\d{4}$" type="tel" value={this.state.phone}/>);      
    } else {
      phone_form = (<Input invalid onChange={(e) => this.updateForm(e) } placeholder="Phone" pattern="^\d{4}-\d{3}-\d{4}$" type="tel" value={this.state.phone}/>);
    }

    return (
      <div>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Phone</InputGroupAddon>

            {phone_form}
            <InputGroupAddon addonType="append"  >
              <Button color="info" id="callButton" onClick={() => this.call() }>
                Call
              </Button>
            </InputGroupAddon>
          </InputGroup>
      </div>
    );
  }
}
import React from 'react';
import { 
  FormGroup, Label, InputGroup, 
  InputGroupAddon, InputGroupText, Input, 
  Button } from 'reactstrap';

import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tooltip } from 'reactstrap';

//import fa from 'fontawesome';
import FontAwesome  from 'react-fontawesome';
//var FontAwesome = require('react-fontawesome');

import './OrderDetails.css';
import ReactLoading from 'react-loading';

export default class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        state:{
          loading: false
        },
        data: {
          store_id: this.props.store_id,
          order_id: this.props.order_id,
          price: null,
          description: null,
          address: null,
          notes: null,
          phone: null,
          tip: 0
      }
    };

     this.getData = this.getData.bind(this);
     this.updateForm = this.updateForm.bind(this);
     this.saveData = this.saveData.bind(this);
  }

  updateForm(event){
    
    event.preventDefault();

    var updateWhat = event.target.placeholder;

    if( updateWhat == "Tip" ){ this.state.data.tip = event.target.value };
    if( updateWhat == "Price" ){ this.state.data.price = event.target.value };
    if( updateWhat == "Address" ){ this.state.data.address = event.target.value };
    if( updateWhat == "Phone" ){ this.state.data.phone = event.target.value };
    
    console.log(event.target.value);

  }

  loadJSON(){
    var data = JSON.parse(JSON.stringify(this.state.data));
    console.log(data);
  }

  componentDidMount() {
      this.getData();
  }

  openTab(url) {
    // Create link in memory
    var a = window.document.createElement("a");
    a.target = '_blank';
    a.href = url;
 
    // Dispatch fake click
    var e = window.document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }
 

  navigate(){
    //https://tomchentw.github.io/react-google-maps/
    console.log("Navigate");

    var address = "City+Hall%2C+New+York%2C+NY";
    var url = "https://www.google.com/maps/dir/?api=1&destination=" + address;
    url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination="+address;
    url = "http://maps.google.com/?q=1200 Pennsylvania Ave SE, Washington, District of Columbia, 20003";
    url = "google.navigation:q="+ address;
    var win = window.open(url, '_blank');
    win.focus();

  }

  callPhoneNumber(){
    console.log("Phone");

    var number = this.state.date.phone;
    var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var digits = phoneRe.replace(/\D/g, "");

    if( phoneRe.test(digits) && number != null ){

      var win = window.open("tel:" + number, '_blank');
      win.focus();
    } else {
      console.log("invalid phone");
    }
  }

  getData(){

      console.log("getting data");

      //get-order-details?store_id=1953&order_id=346851
      // fetch("get-order-details")
      //   .then(response => {
      //       return response.json();
      //   })
      //   .then(details => {
      //       //Fetched product is stored in the state
      //       this.setState({ details });
      //   });


  }

  //post request to save data, include token
  saveData(){
      console.log("Save Data");
      console.log(this.state);
  }

  render() {

    //var fa = require("fontawesome");
    //var save = fa('fa-map');
    return (
      <div>
        <div>
            <br />
            <br /><br />

            
          <InputGroup>
            <InputGroupAddon addonType="prepend">Order Id</InputGroupAddon>
            <Input placeholder="XXXXXX" value={this.state.store_id}/>
          </InputGroup>
          
          <br />
          
          <InputGroup>
            <InputGroupAddon id="TooltipExample" addonType="prepend">
              $
            </InputGroupAddon>
            <Input id="TooltipExample" onChange={this.updateForm} placeholder="Tip" type="number" step="1" />
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input placeholder="Price" type="number" step="1" />
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
          </InputGroup>

          <br />

          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Input addon type="checkbox" aria-label="Checkbox for following text input" />
              </InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Timestamp" disabled/>
          </InputGroup>
          
          <br />

           <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Input addon type="checkbox" aria-label="Checkbox for following text input" />
              </InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Status" disabled />
          </InputGroup>

          <br />

           <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Input addon type="checkbox" aria-label="Checkbox for following text input" />
              </InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Address" />
          </InputGroup>

           <br />

           <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Input addon type="checkbox" aria-label="Checkbox for following text input" />
              </InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Phone" />
          </InputGroup>

          <br />

           <FormGroup>
              <Label for="exampleSelect">Select</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>

           <FormGroup>
              <Label for="exampleSelectMulti">Select Multiple</Label>
              <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>
          
          <FormGroup>
              <Label for="exampleText">Notes</Label>
              <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>

            <div className="float-left">
              <Button color="info" onClick={this.navigate}>
                <FontAwesome  name="fa-map" />
                Navigate
              </Button>&nbsp;
              <Button onClick={this.callPhoneNumber} color="info">Phone</Button>
            </div>

            <div className="float-right">
              <Button color="danger">Cancel</Button>&nbsp;
              <Button color="success" id="saveButton" onClick={this.saveData}>
                Submit
              </Button>
            </div>

          <Modal isOpen={this.state.state.loading} className="center-element">
            <ModalBody>
              <ReactLoading type="spin" color="red"/> Loading....
            </ModalBody>
          </Modal>

        </div>
      </div>
    );
  }
}
//<span class='fa fa-map'></span>
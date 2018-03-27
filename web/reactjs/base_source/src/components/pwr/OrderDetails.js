import React from 'react';
import { 
  FormGroup, Label, InputGroup, 
  InputGroupAddon, InputGroupText, Input, 
  Button } from 'reactstrap';

import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tooltip } from 'reactstrap';

//import fa from 'fontawesome';
//import FontAwesome  from 'react-fontawesome';
import {Icon} from 'react-fa';
//const FA = require('react-fontawesome');

//import fontawesome from '@fortawesome/fontawesome';
//import FontAwesomeIcon from '@fortawesome/react-fontawesome';
//rimport fontawesome from '@fortawesome/fontawesome';
//import FontAwesomeIcon from '@fortawesome/react-fontawesome';

//var FontAwesome = require('react-fontawesome');

import './OrderDetails.css';
import ReactLoading from 'react-loading';

import PhoneNumber from './PhoneNumber';

import Reflux from 'reflux';

var OrderDetailsActions = Reflux.createActions([
  
  'getData',
  'setData'
  ]);

class OrderDetailsStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.listenables = OrderDetailsActions;
        this.state = { 
            loading: false,
            data: {
                order_id: null,//( typeof this.props['store_id'] !== undefined ) ? this.props.store_id :  null
                CSR:null,
                address:null,
                created_at:null,
                description:null,
                driver:null,
                phone:null,
                price:null,
                service:null,
                source:null,
                status:null,
                store_id:null,
                timestamp:null,
                tip:null,
                updated_at:null
            }
        };
    }

    init(){

    }

    onSetData(data)
    {

      console.log( "Setting Data: " , data);
       //data['store_id'] 
      this.state.store_id = (typeof data['store_id']  !== 'undefined' && data['store_id'] ) || data['store_id'];

      this.trigger(this.state);
    }

    onGetData()
    {
        console.log( "get-order-details");
        var data = {
               store_id: 3333,
               order_id: 111111
            };

        //this.onSetData( data );
        console.log( "get data", this );
    }
}

export default class OrderDetails extends Reflux.Component {
  constructor(props) 
  {
    super(props);
    this.state = {
      raw_data: this.props.data,
      data: {
        order_id: this.props.order_id,//( typeof this.props['store_id'] !== undefined ) ? this.props.store_id :  null
      }
    };

     console.log( this.state.data );
     //this.state.data.order_id = ( typeof this.props.store_id !== undefined ) ? this.props.store_id :  null
     //this.store = OrderDetailsStore;
     this.updateForm = this.updateForm.bind(this);
  }

  componentDidMount()
  {
      //console.log( this.props );
      console.log( "Order Details Mounted:, ", this.state );

      if( this.state.data.order_id != null  )
      {
        console.log(this.state.raw_data);
        this.getData();
      }
      //OrderDetailsActions.getData();
  }


  getData()
  {

      console.log("getting data");
      var that = this;
      fetch('get-order-details').then(function(response) {
        if(response.ok) {
          //return response.blob();
                 //https://pwr-deliveries.ddns.net/get-order-details?store_id=1953&order_id=2018-02-28%23344677

          var json_results = '{"store_id": "1953", "order_id": "2018-02-28#344677", "timestamp": "2\/28\/2018 10:30:00 AM", "phone": "5072330767", "address": "514 N WASHINGTON ST", "price": "$252.08", "status": "Complete", "source": "Delivery", "service": "WalkIn", "CSR": "Brandon (3256)", "driver": "Tosha (5660)", "description": "40 12SCREEN1 P10IGFZA", "tip": null, "created_at": null, "updated_at": null }';
          //'{[{"store_id":"1953","order_id":"2018-02-28#344677","timestamp":"2\/28\/2018 10:30:00 AM","phone":"5072330767","address":"514 N WASHINGTON ST","price":"$252.08","status":"Complete","source":"Delivery","service":"WalkIn","CSR":"Brandon (3256)","driver":"Tosha (5660)","description":"40 12SCREEN\n1 P10IGFZA\n","tip":null,"created_at":null,"updated_at":null}]}';
          var results = JSON.parse(json_results);

          console.log("Data",results);

          that.state = {
              data:{
              CSR:"Brandon (3256)",
              address:"514 N WASHINGTON ST",
              created_at:null,
              description:"40 12SCREEN1 P10IGFZA",
              driver:"Tosha (5660)",
              order_id:"2018-02-28#344677",
              phone:"5072330767",
              price:"$252.08",
              service:"WalkIn",
              source:"Delivery",
              status:"Complete",
              store_id:"1953",
              timestamp:"2/28/2018 10:30:00 AM",
              tip:null,
              updated_at:null
            }
          };


        }

          //console.log('Response', response);
      });
      //post request to save data, include token
      //saveData(){
      
  }

  updateForm(event)
  {
    
    event.preventDefault();

    var updateWhat = event.target.placeholder;

    if( updateWhat == "Tip" ){ this.state.data.tip = event.target.value };
    if( updateWhat == "Price" ){ this.state.data.price = event.target.value };
    if( updateWhat == "Address" ){ this.state.data.address = event.target.value };
    if( updateWhat == "Phone" ){ this.state.data.phone = event.target.value };

    
    console.log(event.target.value);
  }

  loadJSON()
  {
    var data = JSON.parse(JSON.stringify(this.state.data));
    console.log(data);
  }


  openTab(url)
  {
    // Create link in memory
    var a = window.document.createElement("a");
    a.target = '_blank';
    a.href = url;
 
    // Dispatch fake click
    var e = window.document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }
 

  navigate()
  {
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

  callPhoneNumber()
  {
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

  

  render() {

    //var fa = require("fontawesome");
    //var save = fa('fa-map');
    return (
      <div>
        <div>
            <br />
            
          <InputGroup>
            <InputGroupAddon addonType="prepend">Order Id</InputGroupAddon>
            <Input placeholder="XXXXXX" value={this.state.raw_data.order_id}/>
          </InputGroup>
          
          <br />
          
          <PhoneNumber value={this.state.raw_data.phone} />

          <InputGroup>

            <InputGroupAddon id="TooltipExample" addonType="prepend"> Tip $</InputGroupAddon> 
            <Input id="TooltipExample" onChange={this.updateForm} value={this.state.raw_data.tip || 0} placeholder="Tip" type="number" />
            
            <InputGroupAddon addonType="prepend">Price $</InputGroupAddon>
            <Input onChange={this.updateForm} placeholder="Price" value={this.state.raw_data.price || 0} type="number" disabled />

            <InputGroupAddon addonType="prepend">Total $</InputGroupAddon>
            <Input onChange={this.updateForm} placeholder="Price" value={this.state.raw_data.price || 0} type="number" />
            
          </InputGroup>

          <br />

          <InputGroup>
            <InputGroupAddon addonType="prepend">Timestamp</InputGroupAddon>
            <Input placeholder="Timestamp" value={this.state.raw_data.timestamp} disabled/>
          </InputGroup>
          
          <br />

           <InputGroup>
            <InputGroupAddon addonType="prepend">Status</InputGroupAddon>
            <Input placeholder="Status" value={this.state.raw_data.status} disabled />
          </InputGroup>

          <br />

           <InputGroup>
            <InputGroupAddon addonType="prepend">Address</InputGroupAddon>
            <Input placeholder="Address" value={this.state.raw_data.address || ''} />
          </InputGroup>

           <br />
          
          <FormGroup>
              <Label for="exampleText">Notes</Label>
              <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>

            <div className="float-left">
              <Button color="info" onClick={this.navigate}>
                <Icon name="map" /> &nbsp;
                Navigate
              </Button>&nbsp;
              <Button onClick={this.callPhoneNumber} color="info">
                <Icon name="phone" /> &nbsp;
              Phone</Button>
            </div>

            <div className="float-right">
              <Button color="danger">
              <Icon name="close" /> &nbsp;
              Cancel</Button>&nbsp;
              <Button color="success" id="saveButton" onClick={this.saveData}>
                <Icon name="floppy-o" /> &nbsp; Submit
              </Button>
            </div>

          <Modal isOpen={this.state.loading} className="center-element">
            <ModalBody>
              <ReactLoading type="spin" color="red"/> Loading....
            </ModalBody>
          </Modal>

        </div>
      </div>
    );
  }
}

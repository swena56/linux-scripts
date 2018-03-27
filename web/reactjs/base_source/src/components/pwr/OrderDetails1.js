import React, {Component} from 'react';

import { 
  FormGroup, Label, InputGroup, 
  InputGroupAddon, InputGroupText, Input, 
  Button } from 'reactstrap';

import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tooltip } from 'reactstrap';

import {
     AppRegistry, StyleSheet,  ToastAndroid
} from 'react-native';

export default class OrderDetails extends Component{
     constructor(props){
          super(props);

          this.state= {
               uri: this.props.uri,
               loading:true,

               //data
               text: '',
               store_id: this.props.store_id || '',
          }

          console.log( props);
     }

     renderLoadingView(){
          return(
               <div style={{justifyContent:'center',alignItems:'center',flex:1}}>
                   
                    Loading...
               </div>
          );
     }

     renderLoadedView(){
          return(
               <div>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">Order Id</InputGroupAddon>
                      <Input placeholder="XXXXXX" value={this.state.store_id}/>
                    </InputGroup>
                    
                    <br />
                    
                    <InputGroup>
                      <InputGroupAddon id="TooltipExample" addonType="prepend">
                        $
                      </InputGroupAddon>
                      <Input id="TooltipExample"  placeholder="Tip" type="number" step="1" />
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
                          Navigate
                        </Button>&nbsp;
                        <Button  color="info">Phone</Button>
                      </div>

                      <div className="float-right">
                        <Button color="danger">Cancel</Button>&nbsp;
                        <Button color="success" id="saveButton" >
                          Submit
                        </Button>
                      </div>
               </div>
          );
     }

     fetchData(){
          if( this.state.url != null ){

               fetch(this.state.uri)
                    .then((response) => response.json())
                    .then((result)=>{

                    })
               .done();

               this.setState({
                         loading:false
               });
               this.renderLoadedView();

               } else {
                    console.log("Need url for component");
                   
               }
     }

     componentDidMount(){
          this.fetchData();
     }

     render(){
          if(!this.state.loading){
               return(
                    this.renderLoadingView()
               );
          }

          else{

               return(
                    this.renderLoadedView()
               );
          }
     }
}

var style = StyleSheet.create({

});
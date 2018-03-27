import React, {Component} from 'react';

import {
     Alerts, Badge, Breadcrumbs, Buttons, Button, Dropdown, Button, Group, Card, Collapse, Carousel, Dropdowns, 
     ade, Form, Input, InputGroup, Group, Jumbotron, Layout, List, Group, Media, Modals, Navbar, Navs, 
     Pagination, Popovers, Progress, Tables, Tabs, Tooltips
} from 'reactstrap';

import {
     AppRegistry, StyleSheet,  ToastAndroid
} from 'react-native';



export default class Template2 extends Component{
     constructor(props){
          super(props);

          this.state= {
               uri: this.props.uri,
               loading:true,

               //data
               text: ''
          }
     }

     renderLoadingView(){
          return(
               <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                    <Text>
                       
                        <Alert color="primary">
                              Loading Data...
                         </Alert>
                    </Text>
               </View>
          );
     }

     renderLoadedView(){
          return(
               <View>
                    <Text>
                         
                         
                    </Text>
               </View>
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
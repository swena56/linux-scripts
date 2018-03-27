import React, {Component} from 'react';
import {
     AppRegistry, StyleSheet,  ToastAndroid
} from 'react-native';

import { 
     ActivityIndicator, Button, DatePickerIOS, DrawerLayoutAndroid, FlatList, Image, KeyboardAvoidingView, 
     ListView, MaskedViewIOS, Modal, NavigatorIOS, Picker, PickerIOS, ProgressBarAndroid, ProgressViewIOS, 
     RefreshControl, ScrollView, SectionList, SegmentedControlIOS, Slider, SnapshotViewIOS, StatusBar, Switch, 
     TabBarIOS, Text, TextInput, ToolbarAndroid, TouchableHighlight, TouchableNativeFeedback, 
     TouchableOpacity, TouchableWithoutFeedback, View, ViewPagerAndroid, VirtualizedList, WebView 
} from 'react-native';

//https://facebook.github.io/react-native/docs/native-components-ios.html

export default class Template extends Component{
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
                        Loading Data...
                    </Text>
               </View>
          );
     }

     renderLoadedView(){
          return(
               <View>
                    <Text>
                         <TextInput
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                          />
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
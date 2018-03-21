import React, { Component } from 'react';

import { Alert, 
	View, Text, TextInput, 
	Button, CheckBox } from 'react-native-web';


//https://facebook.github.io/react-native/docs
import './style.css';

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
		this.handleClick = this.handleClick.bind(this);	
	}

	handleClick(){
		console.log('Login Clicked');
	}

    render() {
        return (
             <View style={{
		        flex: 1,
		        flexDirection: 'column',
		        justifyContent: 'space-between',
		      }}>
		        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
		        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
		        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
		      </View>
        );
    }
}

// <button onClick={this.handleClick}>Login</button>
import React, { Component } from 'react';

import { Alert, View, Text, TextInput, Button, CheckBox } from 'react-native-web';


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
             <form className="form-signin">
		      
		      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
		      <label for="inputEmail" className="sr-only">Email address</label>
		      <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
		      <label for="inputPassword" className="sr-only">Password</label>
		      <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
		      <div className="checkbox mb-3">
		        <label className="text-muted">
		        	Remember me &nbsp;
		           <CheckBox className="checkbox" />
		        </label>
		      </div>

		      <Button type="submit" title="Sign in"/>
    		</form>
        );
    }
}

// <button onClick={this.handleClick}>Login</button>
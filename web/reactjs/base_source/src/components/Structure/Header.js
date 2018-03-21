
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';

class Search extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
        	inputValue: ''
        };
    }


    _change(event){
    	var value = event.target.value;
    	//console.log( event.target );
    	if( value != null ){
    		this.state.inputValue = value;	
    	}
    	
    }

    _search(){
    	console.log('searching');
    }

    render() {
        return (
             <form  className="form-inline my-2 my-lg-0">
		          <input onChange={this._change} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
		          <button onClick={this._search} className="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
		     </form>
        );
    }
}

export default class Header extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

			<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
		      <a className="navbar-brand" href={this.props.main.url}>{this.props.main.title}</a>
		      <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
		        <span className="navbar-toggler-icon"></span>
		      </button>
			   <div className="navbar-collapse collapse" id="navbarsExampleDefault">
		        <ul className="navbar-nav mr-auto">
		          <li className="nav-item active">
		            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
		          </li>
		          <li className="nav-item">
		            <a className="nav-link" href="#">Link</a>
		          </li>
		          <li className="nav-item">
		            <a className="nav-link disabled" href="#">Disabled</a>
		          </li>

		        </ul>
		       <Search />
		      </div>
    		</nav>

            </div>
        );
    }
}
	

Header.defaultProps = {
  main: {title: 'Navbar-title', url: 'www.google.com'}
};
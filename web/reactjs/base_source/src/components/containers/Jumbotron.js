import React, { Component } from 'react';

class Jumbotron extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="jumbotron">
			  <h1 className="display-3">{this.props.title || "No title "}</h1>

			  <div className="lead">{this.props.children}</div>
			  <hr className="my-4"/>
			  
			</div>
        );
    }
}

export default Jumbotron;

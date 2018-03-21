import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Fade} from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import {Well} from 'react-bootstrap';

class CollapsablePanel extends Component {

    constructor(props) {
       super(props);

        this.state = {
        	open: true
        };
    }

    render() {
    	console.log(this.state.open);
    return (
      <div>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
          click
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </Well>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default CollapsablePanel;

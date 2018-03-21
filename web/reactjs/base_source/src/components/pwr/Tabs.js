import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import Table from '../Structure/Table';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

export default class Tabs extends React.Component {
	constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div style={{width: '900px'}}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Orders
              

            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Details
            </NavLink>
          </NavItem>

           <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Settings
            </NavLink>
          </NavItem>

        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
               <Col>
              	  <Card body>
                  <CardTitle>Orders</CardTitle>
                  <CardText>Order Count:</CardText>
                  <Row>
                    <Col>
                      <InfiniteCalendar
                        width={300}
                        height={300}
                        //onSelect={callback}
                        selected={today}
                        disabledDays={[0,6]}
                        minDate={lastWeek}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Table width="100%" />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
              	  <Card body>
                  <CardTitle>Details</CardTitle>
                  <CardText> OrderId</CardText>
                  <Button>Save</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="3">
            <Row>
              <Col>
              	  <Card body>
                  <CardTitle>Settings</CardTitle>
                </Card>
              </Col>
            </Row>
          </TabPane>

        </TabContent>
      </div>
    );
  }
}

import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import Table from './Table';
import './Table.css';

import OrderDetails from './OrderDetails';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import SplitPane from 'react-split-pane';

import { makeOrderData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import Reflux from 'reflux';

var PwrActions = Reflux.createActions([
  //Calender Actions
  'setCurrentDate',
  'getCurrentDateStr',
  'getAvailableDates',

  'toggleTab',

  //table Actions
  'getTableData',
  'setSelectedTableIndex',


  //form actions
  'setSelectedOrder',
  ]);

class PwrStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.listenables = PwrActions;

        // whatever state you want to store should
        // now be on a state property in the store
        this.state = { 
          ticks: 0,
          current_date: new Date(),
          selected_date: new Date(),
          selected_order: null,
          calender:{
            data: null
          },
          activeTab: '1',
          table: {
              data: null,
              selected_index: null
          }
        };
    }

    onGetTableData(){
       fetch('calender-dates').then(function(response) {
          if(response.ok) {

            console.log( response );
            var json_results = '{"results":[{"date":"2018-02-28","count(*)":80},{"date":"2018-03-07","count(*)":231},{"date":"2018-03-08","count(*)":106},{"date":"2018-03-09","count(*)":149},{"date":"2018-03-10","count(*)":138},{"date":"2018-03-11","count(*)":121},{"date":"2018-03-12","count(*)":102},{"date":"2018-03-13","count(*)":84},{"date":"2018-03-14","count(*)":128},{"date":"2018-03-15","count(*)":123},{"date":"2018-03-16","count(*)":185},{"date":"2018-03-17","count(*)":183},{"date":"2018-03-18","count(*)":130},{"date":"2018-03-19","count(*)":90},{"date":"2018-03-20","count(*)":90},{"date":"2018-03-21","count(*)":94},{"date":"2018-03-22","count(*)":93},{"date":"2018-03-23","count(*)":172},{"date":"2018-03-24","count(*)":164},{"date":"2018-03-25","count(*)":129},{"date":"2018-03-26","count(*)":95}]}';
            var data = JSON.parse(json_results);

            
            if( data && data['results']){
              console.log("Table data");
            }
          }
        });


      this.state.table.data = makeOrderData();
      this.trigger(this.state.table); 
    }

    onToggleTab(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
     this.trigger(this.state);  
    }

    onSetSelectedTableIndex(index){

        this.state.selected_order = null;
        this.trigger(this.state); 

        var data = this.state.table.data[index];
        console.log( "setting selected index: ", index, data);

        //console.log("data",rowInfo.index, this.store.state.table.data[rowInfo.index]);
        this.state.table.selected_index = index;

        //set the order details data form
        this.state.selected_order = data;

        //switch tabs
        this.state.activeTab = '2';

        this.trigger(this.state); 
    }
    onSetSelectedOrder(){
        console.log( "setting selected order");
    }

    onSetCurrentDate(date){


      var date_str = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
      var current_date_str = ( this.state.selected_date != null ) ? this.state.selected_date.getFullYear() + "-" + this.state.selected_date.getMonth() + "-" + this.state.selected_date.getDate() : "YYYY-MM-DD";
      //console.log( "setting date", date, this.state.selected_date );
      console.log(date_str, current_date_str);

      if( date_str != current_date_str ){
        //TODO check if valid date
        this.state.table.data = makeOrderData();

        this.setState({ selected_date: date });
        this.trigger(this.state.selected_date);
      }
    }

    onGetCurrentDateStr()
    {   
        var date = this.state.selected_date;

        if( date == null ){
          console.log( "CurrentDateStr:", null );
          return null;
        }
        var date_str = date.getFullYear() + "-" + String("00" + date.getMonth()).slice(-2) + "-" + String("00" + date.getDate()).slice(-2);
        console.log( "CurrentDateStr:", date_str );
        return date_str;
    }

    onGetAvailableDates()
    {   
          var that = this;
        //{"results":[{"date":"2018-02-28","count(*)":80},{"date":"2018-03-07","count(*)":231},{"date":"2018-03-08","count(*)":106},{"date":"2018-03-09","count(*)":149},{"date":"2018-03-10","count(*)":138},{"date":"2018-03-11","count(*)":121},{"date":"2018-03-12","count(*)":102},{"date":"2018-03-13","count(*)":84},{"date":"2018-03-14","count(*)":128},{"date":"2018-03-15","count(*)":123},{"date":"2018-03-16","count(*)":185},{"date":"2018-03-17","count(*)":183},{"date":"2018-03-18","count(*)":130},{"date":"2018-03-19","count(*)":90},{"date":"2018-03-20","count(*)":90},{"date":"2018-03-21","count(*)":94},{"date":"2018-03-22","count(*)":93},{"date":"2018-03-23","count(*)":172},{"date":"2018-03-24","count(*)":164},{"date":"2018-03-25","count(*)":129},{"date":"2018-03-26","count(*)":95}]}
          fetch('calender-dates').then(function(response) {
          if(response.ok) {

            var json_results = '{"results":[{"date":"2018-02-28","count(*)":80},{"date":"2018-03-07","count(*)":231},{"date":"2018-03-08","count(*)":106},{"date":"2018-03-09","count(*)":149},{"date":"2018-03-10","count(*)":138},{"date":"2018-03-11","count(*)":121},{"date":"2018-03-12","count(*)":102},{"date":"2018-03-13","count(*)":84},{"date":"2018-03-14","count(*)":128},{"date":"2018-03-15","count(*)":123},{"date":"2018-03-16","count(*)":185},{"date":"2018-03-17","count(*)":183},{"date":"2018-03-18","count(*)":130},{"date":"2018-03-19","count(*)":90},{"date":"2018-03-20","count(*)":90},{"date":"2018-03-21","count(*)":94},{"date":"2018-03-22","count(*)":93},{"date":"2018-03-23","count(*)":172},{"date":"2018-03-24","count(*)":164},{"date":"2018-03-25","count(*)":129},{"date":"2018-03-26","count(*)":95}]}';
            var data = JSON.parse(json_results);

            
            if( data && data['results']){
              that.state.calender.data = data.results;
              console.log("Calender Data",data.results);
            }
          }
          //console.log('Response', response);
      });
    }
}

var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

export default class Pwr extends Reflux.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      dateSelected: null,
      tabTitles: {
          one: 'Select Orders',
          two: 'Details',
          three: 'Settings'
      },
      table: {
        data: null,
      }
      
    };
    this.store = PwrStore;
    this.selectCalenderDate = this.selectCalenderDate.bind(this);
    this.loadDetails = this.loadDetails.bind(this);
  }

  //calender callback
  selectCalenderDate(date){
      PwrActions.setCurrentDate(date);
  }

  loadDetails(){
      console.log( "Load Details" );
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  getOrderDetails(){
    
  }

  componentDidMount() {
      PwrActions.getTableData();
      PwrActions.getAvailableDates();
      var date = PwrActions.getCurrentDateStr();
      this.selectCalenderDate(this.store.state.current_date);
      this.state.table.data = makeOrderData();
  }

  render() {

    var table = (<div>Loading</div>);

    if( this.store.state.table.data != null ){  
      const { data } = this.store.state.table;
    table = (<ReactTable
                            data={data}
                            getTrProps={(state, rowInfo) => {
                                      return {
                                          onClick: (e) => {
                                              
                                              PwrActions.setSelectedTableIndex(rowInfo.index);
                                              this.setState({
                                                  selected: rowInfo.index
                                              })
                                          },
                                          style: {
                                              background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                              color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                          }
                                      }
                                  }}
                            columns={[
                              {
                                Header: "Order Id",
                                columns: [
                                  {Header: "Order Id", accessor: "order_id"},
                                  {Header: "Address", accessor: "address"} 
                                ]
                              },
                              {
                                Header: "Info",
                                columns: [
                                  {Header: "Status", accessor: "status"} ,
                                  {Header: "Price", accessor: "price"}
                                  ]
                              }
                            ]}
                            defaultPageSize={10}
                            className="-striped -highlight"
                          />);
      }

      var order_details = null;
      if (this.store.state.selected_order != null && this.store.state.selected_order.order_id) {
          order_details = (<OrderDetails data={this.store.state.selected_order} order_id={this.store.state.selected_order.order_id}/>);
      }

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { PwrActions.toggleTab('1'); }}>
              {this.state.tabTitles.one}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { PwrActions.toggleTab('2'); }}>
              {this.state.tabTitles.two}
            </NavLink>
          </NavItem>

           <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { PwrActions.toggleTab('3'); }}>
              {this.state.tabTitles.three}
            </NavLink>
          </NavItem>

        </Nav>
        <TabContent activeTab={this.store.state.activeTab}>
          <TabPane tabId="1">
            <Row >
               <Col >
                  <Card body id="pwr_table">

                      <SplitPane split="vertical" 
                        defaultSize={ parseInt(localStorage.getItem('splitPos'), 10) }
                        onChange={ size => localStorage.setItem('splitPos', size) } 
                        allowResize={true} minSize={300}
                      >

                          <InfiniteCalendar
                            width={300}
                            height={300}
                            onSelect={this.selectCalenderDate}
                            selected={this.store.state.current_date}                    
                            minDate={lastWeek}
                          />
                        <SplitPane split="horizontal">
                          
                          <div>
                            <p> Driver selection,  
                             Date: { ( this.store.state.selected_date != null ) ? this.store.state.selected_date.toString() : "none" } </p>

                          </div>

                          {table}
                        </SplitPane>
                      </SplitPane>
                 
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
                  <Card body>
                    {order_details}
                  
                  </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="3">
            <Row>
              <Col>
                  <Card body>
                  <CardTitle>Settings</CardTitle>
                  <button onClick={() => PwrActions.setCurrentDate()}>Click{this.store.state.current_date.toString()}</button>
                </Card>
              </Col>
            </Row>
          </TabPane>

        </TabContent>
      </div>
    );
  }
}

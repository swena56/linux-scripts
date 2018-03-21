import React from "react";
import { makeOrderData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeOrderData()
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
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
        />
      </div>
    );
  }
}

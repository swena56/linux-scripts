import React from "react";
import "./Table.css";

import Fakerator from 'fakerator';

//npm install namor --no-optional
const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newOrder = () => {
  const statusChance = Math.random();
  var fakerator = new Fakerator();
  return {
    order_id: Math.floor(Math.random() * 100) + 333000,
    address: fakerator.address.street(),
    price: Math.floor(Math.random() * 100) + Math.round(Math.random() * 100) / 100,
    phone: fakerator.phone.number(),
    status:
      statusChance > 0.66
        ? "Complete"
        : statusChance > 0.33 ? "Routing-Station" : "Oven"
  };
};

export function makeOrderData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newOrder(),
      children: range(10).map(newOrder)
    };
  });
}

export const Logo = () =>
  <div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
    For more examples, visit {''}
  <br />
    <a href="https://github.com/react-tools/react-table" target="_blank">
      <img
        src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
        style={{ width: `150px`, margin: ".5em auto .3em" }}
      />
    </a>
  </div>;

export const Tips = () =>
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>;

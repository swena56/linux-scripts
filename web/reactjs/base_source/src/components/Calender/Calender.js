import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once

//npm install react-infinite-calendar react-addons-css-transition-group

export default class Calender extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var today = new Date();
		var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

		return (

			<div>
				<InfiniteCalendar
					displayOptions={{
					    showOverlay: false,
					    shouldHeaderAnimate: true
					  }}
				    width={400}
				    height={250}
				    selected={today}
				    disabledDays={[0,6]}
				    minDate={lastWeek}
				  />
			</div>
		);
	}
}

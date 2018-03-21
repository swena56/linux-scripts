import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import styles from "@sambego/storybook-styles";
import { withNotes,withMarkdownNotes } from '@storybook/addon-notes';

//import Calender from './Calender';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

//onSelect

storiesOf('Calender',module)
	.add('Calender1', 
	withNotes("Notes")(() => 
		<InfiniteCalendar
			displayOptions={{
			    layout: 'landscape',
			    showOverlay: true,
			    shouldHeaderAnimate: true,
			    showTodayHelper: true
			  }}
		    width={500}
		    height={200}
		    selected={today}
		    disabledDays={[0,6]}
		    minDate={lastWeek}
		    />
		)
);

function callback(value) {
  console.log("got it",value);
}

storiesOf('Calender',module)
	.add('Calender2', 
	withNotes("Notes")(() => 
		<InfiniteCalendar
		    width={500}
		    height={300}
		    onSelect={callback}
		    selected={today}
		    disabledDays={[0,6]}
		    minDate={lastWeek}
		  />
		)
);


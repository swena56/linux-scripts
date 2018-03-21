import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import styles from "@sambego/storybook-styles";
import { withNotes,withMarkdownNotes } from '@storybook/addon-notes';

import Tabs from './Tabs';
import Table from '../Structure/Table';


import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

//onSelect

function callback(value) {
  console.log("got it",value);
}

storiesOf('pwr',module)
	.add('Calender2', 
	withNotes("Notes")(() => 
		<InfiniteCalendar
		    width={500}
		    height={300}
		    //onSelect={callback}
		    selected={today}
		    disabledDays={[0,6]}
		    minDate={lastWeek}
		  />
		)
);


storiesOf('pwr',module)
	.add('Tabs', 
	withNotes("Notes")(() => 
		<Tabs />
		)
);

storiesOf('pwr',module)
	.add('Table', 
	withNotes("Notes")(() => 
		<Table />
		)
);



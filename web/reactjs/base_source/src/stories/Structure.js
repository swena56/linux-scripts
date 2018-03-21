import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import styles from "@sambego/storybook-styles";
import { withNotes } from '@storybook/addon-notes';
import { withMarkdownNotes } from '@storybook/addon-notes';


import Footer from '../components/Structure/Footer';
import Header from '../components/Structure/Header';
import  '../components/Structure/structure.css';

var notes = "Notes";

storiesOf('Structure',module)
	.add('footer', 
	withNotes(notes)(() => 
		<div>
			<Footer>
				<div> Example Footer </div>
			</Footer>
		</div>
		)
);

storiesOf('Structure',module)
	.add('header', 
	withNotes(notes)(() => 
			<Header>
				<div> Example Header </div>
			</Header>
		)
);

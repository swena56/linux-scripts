import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import styles from "@sambego/storybook-styles";
import { withNotes } from '@storybook/addon-notes';
import { withMarkdownNotes } from '@storybook/addon-notes';
//import StorybookConsole  from 'react-storybook-console';

import * as fa from 'react-icons/lib/fa';

var methods = Object.getOwnPropertyNames(fa);
var arr = [];
var notes = "";

for (var i = methods.length - 1; i >= 0; i--) {
	arr.push(<div> {methods[i]}</div>);
	var line = methods[i] + "\n";
	notes = notes + line;
};

storiesOf('node_modules',module)
	.add('react-icons', 
	withNotes(notes)(() => 
		<div>
			<button onClick={action('clicked')}>Test Button</button>
			<h3> Lets go for a <fa.FaBeer />? </h3>
			<h3> Lets go for a <fa.FaBell />? </h3>
		</div>
));

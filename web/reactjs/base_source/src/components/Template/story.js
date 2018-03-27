import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import styles from "@sambego/storybook-styles";
import { withNotes,withMarkdownNotes } from '@storybook/addon-notes';

//import Template from '../components/template';

storiesOf('unsorted',module)
	.add('1', 
	withNotes("Notes")(() => 
		<div>
		Sample Work Space
		</div>
		)
);

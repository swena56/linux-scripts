import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import styles from "@sambego/storybook-styles";
import { withNotes,withMarkdownNotes } from '@storybook/addon-notes';

import Tabs from './Tabs';
import Table from './Table';

storiesOf('Structure',module)
	.add('Tabs', 
	withNotes("Notes")(() => 
		<Tabs />
		)
);

storiesOf('Structure',module)
	.add('Table', 
	withNotes("Notes")(() => 
		<Table />
		)
);

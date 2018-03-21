import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import styles from "@sambego/storybook-styles";
import { withNotes,withMarkdownNotes } from '@storybook/addon-notes';

import OrderDetails from './OrderDetails';

storiesOf('pwr',module)
	.add('OrderDetails', 
	withNotes("Notes")(() => 
		<div>
		<OrderDetails />
		</div>
		)
);

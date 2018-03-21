import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import styles from "@sambego/storybook-styles";
import { withNotes,withMarkdownNotes } from '@storybook/addon-notes';

import MediaExample from './MediaExample';
storiesOf('ReactStrapExamples',module)
	.add('MediaExample', 
	withNotes("Notes")(() => 
		<MediaExample/>
		)
);


import FormExample from './FormExample';
storiesOf('ReactStrapExamples',module)
	.add('FormExample', 
	withNotes("Notes")(() => 
		<FormExample/>
		)
);

import CardExample from './CardExample';
storiesOf('ReactStrapExamples',module)
	.add('CardExample', 
	withNotes("Notes")(() => 
		<CardExample/>
		)
);
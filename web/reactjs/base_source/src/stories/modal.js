import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';

import Modal from 'react-modal';

storiesOf('Model',module)
	.add('Open Model', 
	withNotes("notes")(() => 
		<div>
			
		</div>
));


storiesOf('Model',module)
	.add('Show Model', 
	withNotes("notes")(() => 
		<div>
			<Modal
			isOpen={true}
            contentLabel="Example Modal">
          		<button onClick={action('close Modal')}>close</button>
          		<div>I am a modal</div>
        	</Modal>
		</div>
));



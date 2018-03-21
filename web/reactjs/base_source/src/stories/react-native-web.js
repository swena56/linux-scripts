import React from 'react';

import { setAddon, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import JSXAddon from 'storybook-addon-jsx';
setAddon(JSXAddon);

import * as rnw from 'react-native-web';


storiesOf('react-native-web',module)
	.add('checkbox', 
	withNotes("notes")(() => 
		<div>
			<rnw.CheckBox 
				value={true}
				onClick={action('clicked')}
				onChange={action('onChange')}
				style={{ height: 32, width: 32 }}
			/>
			<rnw.Switch/>
			<rnw.Switch thumbColor="red" disabled="true"/>
			<rnw.Switch trackColor="green"/>
			<rnw.Switch/>
			<rnw.Switch/>
			<rnw.TextInput placeHolder="Test"/>
			<rnw.ActivityIndicator />

			Clipboard.setString('This text was copied to the clipboard by React Native');
		</div>
));

storiesOf('react-native-web',module)
.add('User Form', 
withNotes("notes")(() => 
	<div>
		<label> Male
		<rnw.CheckBox 
			value={true}
			onClick={action('clicked')}
			onChange={action('onChange')}
			style={{ height: 32, width: 32 }}
		/>
		</label>

		<label> Female
		<rnw.CheckBox 
			value={true}
			onClick={action('clicked')}
			onChange={action('onChange')}
			style={{ height: 32, width: 32 }}
		/>
		</label>

		<rnw.Switch/>
		<rnw.Switch thumbColor="red" disabled="true"/>
		<rnw.Switch trackColor="green"/>
		<rnw.Switch/>
		<rnw.TextInput placeHolder="First Name"/>

	</div>
));


storiesOf('react-native-web', module).addWithJSX('Toggle', () => (

 
  <div color="#333">test</div>
));


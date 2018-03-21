import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import styles from "@sambego/storybook-styles";
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';


storiesOf('Welcome', module).add('to Storybook', () => 
  <div>
  <Welcome showApp={linkTo('Button')} />
  </div>
  );

storiesOf('Welcome', module).add('Resources', () => 
  <div>
  <a href="https://reactstrap.github.io/components/popovers/"> ReactStrap </a>
  </div>
  );

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Test Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf("Button", module)
  .addDecorator(styles({
    fontFamily: 'Helvetica, Arial, sans-serif',
    background: '#e1ecfa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '500px',
  }))
.add("centered", () => <button>Click me</button>);



const stories = storiesOf('Button', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

// Knobs for React props
stories.add('with a button', () => (
  <button disabled={boolean('Disabled', false)} >
    {text('Label', 'Hello Button')}
  </button>
));

//Floating Buttons
const FloatingButtonsExample = () => {
  return (
    <div className="bg-info clearfix" style={{ padding: '.5rem', width: '100%' }}>
      <button className="btn btn-secondary float-left" >floated left</button>
      <button className="btn btn-danger float-right">Example Button floated right</button>
    </div>
  );
};

stories.add('FloatingButtonsExample', () => (
  <FloatingButtonsExample/>
));

const ColoredText = () => {
  return (
    <div>
      <p className="text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</p>
      <p className="text-primary">Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
      <p className="text-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
      <p className="text-info">Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
      <p className="text-warning">Etiam porta sem malesuada magna mollis euismod.</p>
      <p className="text-danger">Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p className="text-white">Etiam porta sem malesuada ultricies vehicula.</p>
    </div>
  );
};

stories.add('ColoredText', () => (
  <ColoredText/>
));


// Knobs as dynamic variables.
stories.add('as dynamic variables', () => {
  const name = text('Name', 'Arunoda Susiripala');
  const age = number('Age', 89);

  const content = `I am ${name} and I'm ${age} years old.`;
  return (<div>{content}</div>);
});

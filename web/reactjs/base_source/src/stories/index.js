import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

//imports
//import { ImageGallery } from '../node_modules/react-image-gallery/src/ImageGallery';

//import ImageGallery from '../node_modules/react-image-gallery/src/ImageGallery';
//import ImageGallery from '../components/ImageGallery';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

const images = [
  {
    original: 'http://lorempixel.com/1000/600/nature/1/',
    thumbnail: 'http://lorempixel.com/250/150/nature/1/',
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/2/',
    thumbnail: 'http://lorempixel.com/250/150/nature/2/'
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/3/',
    thumbnail: 'http://lorempixel.com/250/150/nature/3/'
  }
]


//import "node_modules/react-image-gallery/styles/scss/image-gallery.scss";
//import "../node_modules/react-image-gallery/styles/css/image-gallery.css";
//import "react-image-gallery/styles/css/image-gallery.css";


//node_modules/react-image-gallery/styles/scss/image-gallery-no-icon.scss
//node_modules/react-image-gallery/styles/css/image-gallery-no-icon.css

storiesOf('Testing', module).add('ImageGallery', () => 
	<ImageGallery items={images} />
	);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Test Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

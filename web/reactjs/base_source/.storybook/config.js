import { configure } from '@storybook/react';

//const req = require.context('../src/components', true, /\.stories\.js$/)


function loadStories() {
  require('../src/stories');
  require('../node_modules/react-image-gallery/src/ImageGallery');
   //req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);

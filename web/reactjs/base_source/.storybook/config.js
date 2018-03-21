import { configure } from '@storybook/react';

const req = require.context('../src/stories', true, /\.js$/)

const req_comp = require.context('../src/components', true, /story\.js$/)

function loadStories() {
  //require('../src/stories');
  //require('../node_modules/react-image-gallery/src/ImageGallery');
  req.keys().forEach((filename) => req(filename))
  req_comp.keys().forEach((filename) => req_comp(filename))
}

configure(loadStories, module);

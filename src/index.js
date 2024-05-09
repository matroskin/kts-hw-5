import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

document.body.innerHTML = '<div id="root"></div>';

const root = createRoot(document.getElementById('root'));
root.render(
  <h1 className='title'>Hello, world!</h1>
);

if (module.hot) {
  module.hot.accept();
}

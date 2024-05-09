import React from 'react';
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime';
import Button from 'components/Button';
import styles from './styles.module.scss';

import image from './monkey_puppet.jpg';

document.body.innerHTML = '<div id="root"></div>';
const root = createRoot(document.getElementById('root')!);
root.render(
  <div>
    <h1 className={styles.title}>Hello, world!</h1>
    <img className={styles.picture} style={{backgroundImage: `url(${image})`}} />
    <Button object={{ name: 'Button' }} onClick={async () => {}}>Кнопка</Button>
  </div>
);

if (module.hot) {
  module.hot.accept();
}

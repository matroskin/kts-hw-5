import React from 'react';
import { createRoot } from 'react-dom/client';
import styles from './styles.module.scss';

import image from './monkey_puppet.jpg';

type Props = {
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({children}: Props) =>{
  return <div>{children}</div>
}

document.body.innerHTML = '<div id="root"></div>';
const root = createRoot(document.getElementById('root')!);
root.render(
  <>
    <h1 className={styles.title}>Hello, world!</h1>
    <img className={styles.picture} style={{backgroundImage: `url(${image})`}} />
    <Button>Кнопка</Button>
  </>
);

if (module.hot) {
  module.hot.accept();
}

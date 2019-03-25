import React from 'react';
import styles from './loader.scss';

const Loader = () => {
  return pug`
    div.loader
      div.loader__circle
      span.loader__text
        | Пожалуйста, подождите...  
      
  `
};

export default Loader;

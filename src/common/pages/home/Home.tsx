import React from 'react';
import reactImg from 'images/react.png';
import styles from './styles.module.scss';

export const Home = (): JSX.Element => (
  <div className={styles.home}>
    <img src={reactImg} />
  </div>
);
Home.displayName = 'Home';

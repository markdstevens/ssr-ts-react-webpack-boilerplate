import React from 'react';
import styles from './styles.module.scss';

const {list, ['list-item']: listItem} = styles;

export const Home = (): JSX.Element => (
  <div className="pane">
    <span>Pane Content</span>
    <ul className={list}>
      <li className={listItem}>Item 1</li>
      <li className={listItem}>Item 2</li>
      <li className={listItem}>Item 3</li>
    </ul>
  </div>
);
Home.displayName = 'Home';

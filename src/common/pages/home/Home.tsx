import React from 'react';
import styles from './styles.module.scss';
import {cube} from 'utils/math';

const {list, ['list-item']: listItem} = styles;

export const Home = (): JSX.Element => {
  console.log(cube(3));
  return (
    <div className="pane">
      <span>Pane Content</span>
      <ul className={list}>
        <li className={listItem}>Item 1</li>
        <li className={listItem}>Item 2</li>
        <li className={listItem}>Item 3</li>
      </ul>
    </div>
  );
};
Home.displayName = 'Home';

import React, { Component } from 'react';
// import SinCosGraphs from './SinCosGraphs';

import profile from './assets/profile.jpg';

import styles from './styles.scss';

export default class Banner extends Component {
  render() {
    return (
      <div className={styles.profile}>
        <div className={styles.profileContainer}>
          <img className={styles.profileImage} src={profile} />
          <div className={styles.profileJob}>Software Engineer</div>
          <div className={styles.myName}>David Acevedo</div>
        </div>
        <div className={styles.title}>print("Hello World")</div>
      </div>
    )
  }
}
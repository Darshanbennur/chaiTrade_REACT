import React from 'react';
import NewsData from './NewsData';
import styles from './News.module.css';
import Footer from '../../components/Footer';

export default function NewsSection() {
  return (
    <>
      <div className={styles.bg}>
        <div className={styles.content}>
          <h3>Welcome to News Section</h3>
        </div>
        <NewsData />
      </div>
      <Footer/>
    </>
  );
};

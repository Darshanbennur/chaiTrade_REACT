import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import styles from './News.module.css';
import axios from "../../api/axiosConfig.js"

export default function NewsData() {
  const [news, getNews] = useState([]);

  useEffect(() => {
    axios.get('/news/getAllNews').then((res) => getNews(res.data.data))
  }, []);

  return (
    <div className={styles.main}>
      {news.map((newsItem) => (
        <NewsCard key={newsItem.id} data={newsItem} />
      ))}
    </div>
  )
};
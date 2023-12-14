import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import styles from './News.module.css';
import axios from "../../api/axiosConfig.js"
import NetworkError from '../Network Error Page/NetworkError.jsx';

export default function NewsData() {
  const [news, getNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get('/news/getAllNews');
        getNews(response.data.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", margin: "5rem 0rem" }}>
        <l-trefoil
          size="40"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.4"
          color="white"
        ></l-trefoil>
      </div>
    )
  }

  if (error) {
    return (
      <>
        <NetworkError/>
      </>
    )
  }

  return (
    <div className={styles.main}>
      {news.map((newsItem) => (
        <NewsCard key={newsItem.id} data={newsItem} />
      ))}
    </div>
  )
};
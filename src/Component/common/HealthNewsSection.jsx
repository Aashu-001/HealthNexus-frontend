import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsCard = ({ title, content, date }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{content.substring(0, 100)}...</p>
    <p className="text-sm text-gray-400">{new Date(date).toLocaleDateString()}</p>
  </div>
);

const HealthNewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Ensure this URL matches your running backend server's address
        const response = await axios.get('http://localhost:8000/api/news');
        // Display the latest 3 news articles
        setNews(response.data.value.slice(0, 3));
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center py-16">Loading news...</div>;
  }

  return (
    <section id="news" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Latest Health News</h2>
          <p className="text-gray-600">Stay informed with the latest updates from our experts.</p>
        </div>
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article) => (
              <NewsCard 
                key={article._id} 
                title={article.title} 
                content={article.desc}
                date={article.createdAt}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No news articles found.</p>
        )}
      </div>
    </section>
  );
};

export default HealthNewsSection;
import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AboutPage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const sampleReviewData = [
    { name: 'Positive', value: 75 },
    { name: 'Negative', value: 25 },
  ];

  return (
    <div className={`container mx-auto px-4 py-8  dark:text-white`}>
      <div className="bg-red-50 dark:bg-[#0E1117] rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
        <div className="p-6 border-b dark:border-gray-700">
          <h1 className="text-3xl font-bold dark:text-red-50">About Rotten Potato</h1>
        </div>
        <div className="p-6">
          <p className="dark:text-gray-300 ">
            Rotten Potato is a website dedicated to providing in-depth movie reviews and analysis. Our team of passionate film enthusiasts curates a wide range of content, from the latest blockbusters to hidden gems, helping you make informed decisions on what to watch next.
          </p>
          <p className="dark:text-gray-300">
            At the heart of Rotten Potato is our commitment to delivering honest, unbiased reviews that go beyond the surface-level. We delve into the nuances of each film, exploring the storytelling, cinematography, and performance of the cast, providing a comprehensive understanding of the viewing experience.
          </p>
        </div>
        <div className="p-6 border-t dark:border-gray-700">
          <h2 className="text-2xl font-bold dark:text-red-50 mb-4">Our Review Process</h2>
          <p className={`dark:text-gray-300 `}>
            At Rotten Potato, we believe that a thorough and objective review process is essential for providing valuable insights to our readers. Our team of experienced film critics follows a multi-step approach to ensure the quality and reliability of our reviews:
          </p>
          <ul className={`list-disc pl-6 dark:text-gray-300`}>
            <li>Comprehensive viewing and analysis of the film</li>
            <li>In-depth research into the creative team, production details, and cultural/historical context</li>
            <li>Careful consideration of various technical and artistic elements, such as cinematography, acting, and screenplay</li>
            <li>Evaluation of the film's overall impact, emotional resonance, and relevance to the audience</li>
            <li>Detailed written reviews that provide a balanced, well-reasoned perspective</li>
          </ul>
        </div>
        <div className="p-6 border-t dark:border-gray-700">
          <h2 className="text-2xl font-bold dark:text-red-50 mb-4">Sentiment Analysis</h2>
          <p className={`dark:text-gray-300 `}>
            In addition to our comprehensive reviews, Rotten Potato also provides sentiment analysis of user reviews. By leveraging advanced natural language processing techniques, we're able to gauge the overall sentiment of the audience towards a film, helping you understand the broader reception and public opinion.
          </p>
          <div className="flex justify-center mt-8">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sampleReviewData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#dc2626" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className={`text-center mt-4 dark:text-gray-300 `}>
            This chart shows a sample sentiment analysis for a movie, with the percentage of positive and negative reviews.
          </p>
        </div>
        <div className="p-6 border-t dark:border-gray-700">
          <h2 className="text-2xl font-bold dark:text-red-50 mb-4">Our Team</h2>
          <p className={`dark:text-gray-300 `}>
            Rotten Potato is proud to have a team of passionate film enthusiasts who bring their expertise and diverse perspectives to every review. A Creation of the team FireFox.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
import React from "react";

const EducationalResources = () => {
  const resources = [
    {
      title: "Introduction to Technical Analysis",
      description: "Learn the basics of technical analysis in trading.",
      link: "https://example.com/intro-technical-analysis",
    },
    {
      title: "Options Trading Strategies",
      description: "Explore advanced options trading strategies.",
      link: "https://example.com/options-trading-strategies",
    },
    // Add more educational resources as needed
  ];

  return (
    <div className="educational-resources">
      <h2>Educational Resources</h2>
      <ul>
        {resources.map((resource, index) => (
          <li key={index}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationalResources;

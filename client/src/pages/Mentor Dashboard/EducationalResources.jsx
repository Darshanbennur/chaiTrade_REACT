import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig.js";

const EducationalResources = () => {
  const [educationalResources, setEducationalResources] = useState([]);
  useEffect(() => {
    const getEducationalResources = async () => {
      const result = await axios.get(
        "/educationalRoutes/getAllEducationalResources"
      );
      console.log(result.data.data);
      setEducationalResources(result.data.data);
    };
    getEducationalResources();
  }, []);

  return (
    <div className="educational-resources">
      <h2>Educational Resources</h2>
      <ul>
        {educationalResources.map((resource, index) => (
          <li key={index}>
            <h3>{resource.title}</h3>
            <p>{resource.content}</p>
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

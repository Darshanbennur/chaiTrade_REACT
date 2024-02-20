import React, { useState, useEffect } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import EducationalResources from "./EducationalResources.jsx";
import BackgroundImage from "../../images/charts.jpg";
import axios from "../../api/axiosConfig.js";
import "./MentorDashboard.css";
import { useSelector } from "react-redux";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const MentorDashboard = () => {
  const [allBlogsWithDateAndLikes, setAllBlogsWithDateAndLikes] = useState([]);

  const userArrayID = useSelector((state) => state.userData.currentUser.arrayID);
  const dayTrading = useSelector((state) => state.userData.currentUser.mentorExperience.dayTrading) ?? 0;
  const swingTrading = useSelector((state) => state.userData.currentUser.mentorExperience.swingTrading) ?? 0;
  const optionsTrading = useSelector((state) => state.userData.currentUser.mentorExperience.optionsTrading) ?? 0;

  useEffect(() => {
    const getData = async () => {
      try {
        const body = {
          arrayID: userArrayID,
        };
        const result = await axios.post(
          "/mentor/getMentorBlogDatesAndLikes",
          body
        );

        setAllBlogsWithDateAndLikes(result.data.data);
      } catch (err) {
        console.log("error : ", err);
      }
    };
    getData();
  }, []);

  const mentorExpertiseData = [
    { label: "Day Trading", value: dayTrading },
    { label: "Swing Trading", value: swingTrading },
    { label: "Options Trading", value: optionsTrading },
  ];

  const blogData = allBlogsWithDateAndLikes.reduce((acc, curr) => {
    const month = curr.date;
    const existingMonthIndex = acc.findIndex((item) => item.month === month);

    if (existingMonthIndex !== -1) {
      acc[existingMonthIndex].blogs++;
      acc[existingMonthIndex].likes += curr.likes;
    } else {
      acc.push({ month: month, blogs: 1, likes: curr.likes });
    }

    return acc;
  }, []);

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const contentH1Style = {
    cursor: "pointer",
    fontFamily: "Sacramento, cursive",
    fontSize: "75px",
    color: isHovered ? "transparent" : "#65a893",
    textAlign: "center",
    WebkitTextStroke: isHovered ? "2px #88b9a9" : "none",
    fontWeight: "normal",
  };

  return (
    <div className="App">
      <img src={BackgroundImage} alt="background" className="backgroundpic" />
      <div className="content">
        <h1
          style={contentH1Style}
          onMouseOver={handleHover}
          onMouseOut={handleMouseOut}
        >
          Welcome to Mentor Dashboard
        </h1>
      </div>
      <div className="lineGraphsContainer">
        <div className="lineGraphCard">
          <Line
            data={{
              labels: blogData.map((data) => data.month),
              datasets: [
                {
                  label: "Blogs Posted",
                  data: blogData.map((data) => data.blogs),
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "rgba(75,192,192,1)",
                  borderWidth: 1,
                  tension: 0.4,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Number of Blogs Posted",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        <div className="lineGraphCard">
          <Line
            data={{
              labels: blogData.map((data) => data.month),
              datasets: [
                {
                  label: "Likes",
                  data: blogData.map((data) => data.likes),
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                  borderColor: "rgba(255, 0, 0, 1)",
                  borderWidth: 1,
                  tension: 0.4,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Number of Likes",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="chartsContainer">
        <div className="dataCard categoryCard">
          <Doughnut
            data={{
              labels: mentorExpertiseData.map((data) => data.label),
              datasets: [
                {
                  label: "Mentor's Expertise",
                  data: mentorExpertiseData.map((data) => data.value),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                    "rgba(76, 175, 80, 0.8)",
                    "rgba(255, 87, 34, 0.8)",
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Mentor's Expertise",
                },
              },
            }}
          />
        </div>
      </div>

      <EducationalResources />
    </div>
  );
};

export default MentorDashboard;

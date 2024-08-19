
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const [liveInternships, setLiveInternships] = useState("0");
  const [companies, setCompanies] = useState("0"); // Adjust based on available data
  const [seekers, setSeekers] = useState("0");
  const [employers, setEmployers] = useState("0");


  // useEffect(() => {
  //   const fetchStatistics = async () => {
  //     try {
  //       const response = await axios.get("https://intern-hub-backend.vercel.app/api/v1/statistics", {
  //         withCredentials: true,
  //       });
  //       console.log('API Response:', response.data);
  //       setLiveInternships(response.data.data.liveInternships || "0");
  //       setSeekers(response.data.data.jobSeekers || "0");
  //       setEmployers(response.data.data.employers || "0");
  //       // For companies, if you don't have a separate count, leave it or fetch separately
  //     } catch (error) {
  //       console.error("Error fetching statistics", error);
  //     }
  //   };

  //   fetchStatistics();
  // }, []);




  const details = [
    {
      id: 1,
      title: "10",
      subTitle: "Live Internships",
      icon: <FaSuitcase />,
      style: { backgroundColor: '#D0E8EE'}
    },
    {
      id: 2,
      title: "15",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "30",
      subTitle: "Internship Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "20",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Welcome To InternHub</h1>
            
            <p>
            Discover exciting opportunities that match your skills and aspirations. Whether you're looking to gain hands-on experience or explore new fields, our platform connects you with internships that help you grow and succeed.
            </p>
          </div>
          <div className="image">
            <img src="/internship.png" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id} >
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;

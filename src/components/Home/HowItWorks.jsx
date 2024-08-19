import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";


const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How InternHub Works</h3>
          <div className="banner">
            <div className="card">
            
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                
              </p>
              
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Internship/Post a Internship</p>
              <p>
                
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Internship/Recruit Suitable Candidates</p>
              <p>
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;

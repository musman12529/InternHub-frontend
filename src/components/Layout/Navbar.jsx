import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    // Open the logout URL in a new tab
    // Example usage in frontend:
const redirectUrl = "https://intern-hub-frontend.vercel.app/" ;
window.open(
  `https://intern-hub-backend.vercel.app/api/v1/user/logout?redirect=${encodeURIComponent(redirectUrl)}`,
  "_blank"
);

    // Clear local storage and session storage
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    
  
    // Redirect to the login page
    setIsAuthorized(false);
    navigateTo("/");
    
  };
  

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/scholar.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              ALL INTERNSHIPS
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>

          {user && user.role === "Job Seeker" && (
            <li>
              <Link to={"/Reviews"} onClick={() => setShow(false)}>
                REVIEWS
              </Link>
            </li>
          )}

          {user && user.role === "Employer" && (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST NEW INTERNSHIP
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  VIEW YOUR INTERNSHIPS
                </Link>
              </li>
            </>
          )}

          <li>
              <Link to={"/chat"} onClick={() => setShow(false)}>
                CHAT BOT
              </Link>
            </li>

          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

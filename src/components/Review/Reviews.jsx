import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const UserReview = () => {
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [postedReviews, setPostedReviews] = useState([]);

  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posted reviews when the component mounts
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://intern-hub-backend.vercel.app/api/v1/review/getall", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPostedReviews(response.data.reviews);
      } catch (error) {
        toast.error("Failed to load reviews.");
      }
    };

    fetchReviews();
  }, []);

  const handleReviewPost = async (e) => {
    e.preventDefault();
    if (!company || !rating || !review) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "https://intern-hub-backend.vercel.app/api/v1/review/post",
        {
          Company: company,
          Rating: rating,
          Review: review,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      // Clear the form fields after successful submission
      setCompany("");
      setRating("");
      setReview("");
      // Fetch reviews again to include the newly posted one
      const updatedResponse = await axios.get("https://intern-hub-backend.vercel.app/api/v1/review/getall", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPostedReviews(updatedResponse.data.reviews);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role !== "Job Seeker")) {
    navigate("/");
  }

  return (
    <div className="review_post page">
      <div className="container">
        <h3>POST NEW REVIEW</h3>
        <form onSubmit={handleReviewPost}>
          <div className="wrapper">
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company Name"
            />
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Select Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <textarea
            rows="10"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Your Review"
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>

      <div className="reviews_section">
        <h3>Reviews</h3>
        {postedReviews.length > 0 ? (
          <ul>
            {postedReviews.map((r, index) => (
              <li key={index} className="review_card">
                <h4>Company: {r.Company}</h4>
                <h6>Rating: {r.Rating} / 5</h6>
  <p> {r.Review}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default UserReview;

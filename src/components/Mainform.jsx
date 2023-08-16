import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainForm = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({ name: "", room: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value
    });
    setError(""); // Clear error when input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validation();
    if (isValid) {
      navigate(`/chat/${data.room}`, { state: data }); // Navigate to the chat room
    }
  };

  const validation = () => {
    if (!data.name || !data.room) {
      setError("Please enter your name and select a room.");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <div className="container mt-1">
      <div className="row justify-content-center">
        <div className="col-xl-9 bg-light p-4 rounded shadow mt-22">
          <form onSubmit={handleSubmit}>
            <h2 className="mb-4 text-center">Welcome to Khan Sajid ChatClub</h2>
            <div className="mb-5">
              <label htmlFor="name" className="form-label">
                Enter your name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="room" className="form-label">
                Select Room
              </label>
              <select
                onChange={handleChange}
                className="form-select"
                id="room"
              >
                <option value="">Select room</option>
                <option value="Gaming">Gaming</option>
                <option value="Coding">Coding</option>
                <option value="SocialMedia">Social Media</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
            {error ? <small className='text-danger'>{error}</small> : ""}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainForm;

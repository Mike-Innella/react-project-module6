import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true); // Set loading to true when the component first mounts
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false); // Set loading to false even on error to stop skeleton
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="container">
      {/* Navigation Buttons */}
      <div className="nav-buttons" style={{ marginBottom: "20px" }}>
        <button onClick={() => navigate("/")}>🏠 Home</button>
        <button onClick={() => navigate("/posts/1")}>📄 View Posts</button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users by name..."
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress} 
        />
        <button onClick={handleSearchSubmit}>Search</button>
      </div>

      {/* User List */}
      <div className="row">
        <div className="user-list">
          {loading ? (
            // Skeleton Loading State
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="user user-skeleton">
                <div className="user-card">
                  <div className="user-card__container">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                  </div>
                </div>
              </div>
            ))
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="user"
                onClick={() => navigate(`/posts/${user.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="user-card">
                  <div className="user-card__container">
                    <h3>{user.name}</h3>
                    <p>
                      <b>Email:</b> {user.email}
                    </p>
                    <p>
                      <b>Phone:</b> {user.phone}
                    </p>
                    <p>
                      <b>Website:</b> {user.website}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/index.css";

const Posts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, [id]);

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleSearchSubmit = () => {
    const nonNegativeIntegerRegex = /^[0-9]+$/;

    if (nonNegativeIntegerRegex.test(searchId)) {
      navigate(`/posts/${searchId}`);
    } else {
      alert("Please enter a valid user ID greater than or equal to 0.");
    }
  };

  return (
    <>
      <div className="post__search">
        <button onClick={() => navigate("/")}>← Back</button>
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number"
            value={searchId}
            onChange={handleSearchChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchSubmit();
              }
            }}
            min="0"
            placeholder="Search by Id..."
          />
          <button onClick={handleSearchSubmit}>Enter</button>
        </div>
      </div>

      <div className="post__list">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div className="post" key={index}>
                <div className="post__title">
                  <div className="post__title--skeleton"></div>
                </div>
                <div className="post__body">
                  <div className="post__body--skeleton"></div>
                </div>
              </div>
            ))
          : posts.slice(0, 10).map((post) => (
              <div key={post.id} className="post">
                <div className="post__title">{post.title}</div>
                <p className="post__body">{post.body}</p>
              </div>
            ))}
      </div>
    </>
  );
};

export default Posts;

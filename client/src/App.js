import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isLoading, setIsloading] = useState(true);
  const [video, setvideo] = useState(null);
  const [p, setP] = useState(0);
  const [mode, setMode] = useState(1);
  const [q, setQ] = useState(null);
  useEffect(() => {
    if (mode == 0) {
      search(q, p);
    } else {
      fetchvideo(p);
    }
  }, [p, mode]);
  const search = (q, p) => {
    setIsloading(true);

    fetch(`http://localhost:5000/api/youtube/search?q=${q}&page=${p}`)
      .then((res) => {
        if (res.ok) return res.json();
        else {
          throw new Error("Something went wrong");
        }
      })
      .then((result) => {
        setvideo(result);
        console.log(result);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchvideo = async (page) => {
    setIsloading(true);
    await fetch(`http://localhost:5000/api/youtube/videodata?page=${page}`)
      .then(function (response) {
        if (response.ok) return response.json();
        else throw new Error("Something went wrong");
      })
      .then(function (data) {
        setvideo(data);
        setIsloading(false);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1
        onClick={() => {
          setMode(1);
        }}
      >
        Youtube
      </h1>
      <div className="search">
        <input
          type="text"
          name="query"
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
        />
        <button onClick={() => setMode(0)}>Search</button>
      </div>
      <div className="pagination">
        <button disabled={p === 0} onClick={() => setP((p) => p - 1)}>
          prev
        </button>
        <button
          disabled={video && video.length < 5}
          onClick={() => setP((p) => p + 1)}
        >
          next
        </button>
        <br></br>
      </div>
      {isLoading ? (
        <div className="loading">Loading ....</div>
      ) : (
        <div className="video-info">
          {video.map((item, i) => {
            return (
              <article className="item" key={i}>
                <a href={item.thumbnailUrl}>
                  <h3>{item.title}</h3>
                </a>
                <p>{item.description}</p>
                {/* <div className="date">{new Date(item.publishedAt)}</div> */}
                <img src={item.thumbnailUrl} width="200px" height="200px" />
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;

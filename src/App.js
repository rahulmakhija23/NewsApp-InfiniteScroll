import "./styles.css";
import { useState, useEffect } from "react";
export default function App() {
  const [data, setData] = useState([]);
  const [page, setpage] = useState(20);

  const fetchData = () => {
    fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${page}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  const handleInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
        document.documentElement.scrollHeight
      ) {
        setpage((page) => page + 20);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
  }, []);
  return (
    <div className="App">
      <h2>Title NewsApp</h2>
      {data.map((item, id) => {
        return (
          <div className="container">
            <p className="title">
              <span className="id"> {item.id}</span>
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}

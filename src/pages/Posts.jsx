import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Posts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, [id])

  return (
    <>
      <div className="post__search">
        <button>← Back</button>
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input type="number" />
          <button>Enter</button>
        </div>
      </div>

      {loading ? (
        <div className="post">
          <div className="post__title">
            <div className="post__title--skeleton"></div>
          </div>
          <div className="post__body">
            <p className="post__body--skeleton"></p>
          </div>
        </div>
      ) : (
        posts.map(post => (
          <div className="post" key={post.id}>
            <div className="post__title">{post.title}</div>
            <p className="post__body">{post.body}</p>
          </div>
        ))
      )}
    </>
  )
}
export default Posts
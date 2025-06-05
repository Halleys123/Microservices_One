import React, { useEffect, useState } from 'react';
import Post from './Post';

export default function PostList() {
  const [data, setData] = useState({});
  async function fetchPosts() {
    const response = await fetch('http://localhost:30702/posts');
    if (!response.ok) {
      console.error('Failed to fetch posts');
      return;
    }
    const data = await response.json();
    console.log(data);
    console.log(Object.values(data));
    setData(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const arr = Object.values(data);

  return (
    <div>
      {arr.length
        ? arr.map((post) => <Post key={post.id} post={post} />)
        : 'No Posts Yet'}
    </div>
  );
}

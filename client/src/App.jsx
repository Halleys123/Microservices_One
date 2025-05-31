import './App.css';
import React from 'react';
import AddPost from './components/AddPost';
import PostList from './components/PostList';

export default function App() {
  return (
    <div className='app'>
      <div className='container'>
        <h1 className='title'>📝 Simple Post & Comment App</h1>
        <AddPost />
        <PostList />
      </div>
    </div>
  );
}

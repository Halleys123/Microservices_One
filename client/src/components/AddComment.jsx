import React, { useState } from 'react';

export default function AddComment({ postId }) {
  const [comment, setComment] = useState('');
  async function onAddComment() {
    if (!comment.trim()) {
      alert('Comment cannot be empty');
      return;
    }
    const request = await fetch(`http://posts.com/posts/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: comment }),
    });
    const data = await request.json();
    setComment('');
    if (!request.ok) {
      alert('There was an error adding the comment.');
    } else {
      console.log('Comment added:', data);
    }
  }

  return (
    <div className='add-comment'>
      <input
        type='text'
        placeholder='Add a comment...'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={onAddComment}>Comment</button>
    </div>
  );
}

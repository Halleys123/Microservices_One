import { useState } from 'react';

export default function AddPost() {
  const [postTitle, setPostTitle] = useState('');

  async function handleAddPost() {
    const request = await fetch('http://posts.com/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: postTitle }),
    });
    const data = await request.json();
    setPostTitle('');
    if (!request.ok) {
      alert('There was an error adding the post.');
    }
    console.log('Post added:', data);
  }

  return (
    <div className='add-post'>
      <input
        type='text'
        placeholder='Enter post title...'
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
}

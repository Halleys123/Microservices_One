import AddComment from './AddComment';

export default function Post({ post }) {
  // const [comments, setComments] = useState([]);

  // async function fetchComments() {
  //   const response = await fetch(
  //     `http://localhost:3001/posts/${post.id}/comment`
  //   );
  //   if (!response.ok) {
  //     console.error('Failed to fetch comments');
  //     return [];
  //   }
  //   const data = await response.json();
  //   setComments(data.data || []);
  //   console.log(data);
  // }

  // useEffect(() => {
  //   fetchComments();
  // }, [post.id]);

  return (
    <div className='post'>
      <h2>{post.post}</h2>
      <div className='comments'>
        {post.comments.map((comment, idx) => (
          <div key={idx} className='comment'>
            • {comment.content}
          </div>
        ))}
      </div>
      <AddComment postId={post.id} />
    </div>
  );
}

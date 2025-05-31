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
  const comments = Object.values(post.comments) || [];
  return (
    <div className='post'>
      <h2>{post.post}</h2>
      <div className='comments'>
        {comments.length
          ? comments.map((comment, idx) => (
              <div
                dangerouslySetInnerHTML={{ __html: '• ' + comment.content }}
                key={idx}
                className='comment'
              />
            ))
          : 'No Comments Yet'}
      </div>
      <AddComment postId={post.id} />
    </div>
  );
}

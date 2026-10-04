import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Feed = () => {
    const [posts, setposts] = useState([
        {
            _id: 1,
            image: 'https://images.pexels.com/photos/34021102/pexels-photo-34021102.jpeg',
            caption: 'This is a sample post',
        }
    ])

    useEffect(() => {
        axios.get('http://localhost:3000/api/posts')
            .then((response) => {
                const fetched = response.data.posts || response.data.data || response.data
                if (Array.isArray(fetched) && fetched.length > 0) {
                    setposts(fetched)
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error)
            })
    }, [])

    return (
        <section className="Feed-section feed-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '400px' }}>
                <h2>Feed</h2>
                <Link to="/" style={{ color: '#4caf50', textDecoration: 'none', fontWeight: 'bold' }}>+ Create Post</Link>
            </div>

            {posts && posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="post-card post">
                        <img src={post.image || post.Image} alt={post.caption || "Post"} />
                        <p>{post.caption}</p>
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </section>
    )
}

export default Feed
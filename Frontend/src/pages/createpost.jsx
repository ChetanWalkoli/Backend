import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        try {
            const response = await axios.post('http://localhost:3000/create-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response.data)
            alert("Post created successfully!")
            navigate('/feed')
        } catch (error) {
            console.error("Error creating post:", error)
            alert("Failed to create post.")
        }
    }

    return (
        <section className="create-post create-post-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '400px' }}>
                <h1>Create Post</h1>
                <Link to="/feed" style={{ color: '#4caf50', textDecoration: 'none', fontWeight: 'bold' }}>View Feed →</Link>
            </div>
            
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" accept="image/*" required />
                <input type="text" name="caption" placeholder="Write a caption..." required />
                <button type="submit">Post</button>
            </form>
        </section>
    )
}

export default CreatePost
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreatePost from './pages/createpost.jsx'
import Feed from './pages/Feed.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatePost />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/Feed" element={<Feed />} />
      </Routes>
    </Router>
  )
}

export default App
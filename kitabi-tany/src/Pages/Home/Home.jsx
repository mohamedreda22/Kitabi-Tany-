import BookCard from "../../Component/Shared/BookCard"
import { Link } from "react-router-dom"

const Home = () => {
    const bookTitle = "The Great Gatsby"
    return (
        <div>
            <h2>Home</h2>
            <p>Welcome to Kitabi Tany!</p>
            <p>Discover your next favorite book.</p>
            <p>Here are some books you might like:</p>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>


            <BookCard title={bookTitle}/>
        </div>
    )
}

export default Home
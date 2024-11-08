/*
  BookCard Component:
  - Displays information about a book, including its cover image, title, rating, publication date, author, and category.
  - Imports:
      - `PropTypes` for prop type checking.
      - CSS module for scoped styling.
      - Placeholder image for cases where a cover image is not provided.
  - Props:
      - `title` (string, required): The title of the book.
      - `rate` (number, required): The rating of the book.
      - `publishDate` (string, required): The publication date of the book.
      - `author` (string, required): The author's name.
      - `category` (string, required): The category of the book.
      - `imageCover` (string, optional): URL for the cover image; defaults to a placeholder image if not provided.
  - The component is exported as default for use in other parts of the application.
*/

import PropTypes from 'prop-types'
import styles from "./cssModule/BookCard.module.css"
import imagePlaceholder from "./image/bookPlaceholder.png"

const BookCard = ({ title, rate, publishDate, author, category, imageCover = imagePlaceholder }) => {
    return (
        <div className={styles.card}>
            <img src={imageCover} alt={title} className={styles.cover} />
            {/* You could add more content here like title, rate, etc., as needed */}
        </div>
    )
}

BookCard.propTypes = {
    title: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    publishDate: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    imageCover: PropTypes.string,
}

export default BookCard

import React, { useContext } from 'react';
import SearchContext from '../../utils/SearchContext';
import SaveButton from '../SaveButton';
import './style.css';

const FoundBook = (props) => {
  const { image, title, authors, description } = props;
  const { handleBookSave } = useContext(SearchContext);
  return (
    <div className="book-container">
      <img src={image} alt="" />
      <div className="book-details">
        <h4>{title}</h4>
        <p>{authors}</p>
        <p>{description}</p>
        <SaveButton {...props} handleBookSave={handleBookSave} />
      </div>
      {/* <button onClick={handleBookSave}>Save to Library</button> */}
    </div>
  );
}

const FoundBookList = () => {
  const { books } = useContext(SearchContext);
  console.log(books);
  return (
    <div>
      {books.map(book => (
        !book.volumeInfo.imageLinks || !book.volumeInfo.title || !book.volumeInfo.authors || !book.volumeInfo.description
          ? <p>error retrieving this book</p>
          : <FoundBook
            key={book.id}
            image={book.volumeInfo.imageLinks.smallThumbnail}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors.join(', ')}
            description={book.volumeInfo.description.slice(0, 280) + "..."}
          />
      ))}
    </div>
  );
}

export default FoundBookList;

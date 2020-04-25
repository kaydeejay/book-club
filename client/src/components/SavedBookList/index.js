import React, { useContext } from 'react';
import DbContext from '../../utils/DbContext';

const SavedBook = (props) => {
  const { image, title, authors, description } = props;
  const { handleBookDelete } = useContext(DbContext);
  return (
    <div>
      <img src={image} alt="" />
      <h4>{title}</h4>
      <p>{authors}</p>
      <p>{description}</p>
      {/* <DeleteButton /> */}
      <button onClick={handleBookDelete}>Delete</button>
    </div>
  );
}

const SavedBookList = () => {
  const { books } = useContext(DbContext);
  // console.log(useContext(DbContext));
  return (
    <div>
      {books.map(book => (
        <SavedBook
          key={book._id}
          image={book.image}
          title={book.title}
          authors={book.authors.join(', ')}
          description={book.description.slice(0, 280) + "..."}
        />
      ))}
    </div>
  );
}

export default SavedBookList;

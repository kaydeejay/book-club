import React, { useContext } from 'react';
import DbContext from '../../utils/DbContext';
import DeleteButton from '../DeleteButton';

const SavedBook = (props) => {
  const { id, image, title, authors, description } = props;
  const { handleBookDelete } = useContext(DbContext);
  console.log(props)
  return (
    <div>
      <img src={image} alt="" />
      <h4>{title}</h4>
      <p>{authors}</p>
      <p>{description}</p>
      <DeleteButton handleBookDelete={handleBookDelete} id={id} />
      {/* <button onClick={handleBookDelete}>Delete</button> */}
    </div>
  );
}

const SavedBookList = () => {
  const { books } = useContext(DbContext);
  // console.log(useContext(DbContext));
  return (
    <div>
      {books.length > 0
        ? books.map(book => (
          <SavedBook
            key={book._id}
            id={book._id}
            image={book.image}
            title={book.title}
            authors={book.authors.join(', ')}
            description={book.description.slice(0, 280) + "..."}
          />
        ))
        : "loading..."}
    </div>
  );
}

export default SavedBookList;

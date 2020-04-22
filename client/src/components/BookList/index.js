import React from 'react';
import BookListItem from '../BookListItem';

const BookList = ({ books }) => {
  // console.log(books);
  return (
    <div>
      {!books.length > 0 ?
        "loading..." :
        books.map(book => (
          <BookListItem
            key={book._id}
            title={book.title}
            authors={book.authors.join(', ')}
            desc={book.description}
            image={book.image}
            link={book.link}
          />
        ))}
    </div>
  )
}

export default BookList;

import React from 'react';
import BookListItem from '../BookListItem';

const BookList = ({ books }) => {
  console.log(books)
  return (
    <div>
      {books.length > 0 ?
        books.map(book => (
          <BookListItem
            key={book._id}
            image={book.image}
            title={book.title}
            authors={book.authors.join(', ')}
            desc={book.description.slice(0, 280) + "..."}
          />
        )) :
        "Loading Books..."}
    </div>
  )
}

export default BookList;

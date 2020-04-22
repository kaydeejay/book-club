import React, { useEffect, useState } from 'react';
import BookListItem from '../BookListItem';
const axios = require('axios');

const BookList = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    axios.get('/api/books')
      .then(res => {
        console.log(res.data);
        setBookList(res.data);
      });
  }, []);

  return (
    <div>
      Your Saved Books:
      {!bookList.length > 0 ?
        "loading..." :
        bookList.map(book => (
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

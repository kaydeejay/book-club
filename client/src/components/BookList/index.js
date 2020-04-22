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
      A list, presumably of books
      <BookListItem title={
        bookList.length > 0 ?
          bookList[0].title :
          "loading..."
      } />
    </div>
  )
}

export default BookList;

import React, { useState, useEffect } from 'react';
import BookList from '../../BookList';
import API from '../../../utils/API';

const Home = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    API.getBooks()
      .then(res => setBookList(res.data));
  };

  return (
    <div>
      <BookList books={
        bookList.length > 0 ?
          bookList :
          ""
      } />
    </div>
  )
}

export default Home;

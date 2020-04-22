import React, { useState, useEffect } from 'react';
import BookList from '../../BookList';
import API from '../../../utils/API';

const Home = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    API.getBooks()
      .then(res => {
        setBookList(res.data);
        // console.log(res.data);
      });
  }, []);

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

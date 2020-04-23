import React, { useState, useEffect } from 'react';
import BookList from '../../BookList';
import SearchForm from '../../SearchForm';
// import SearchBooks from '../../SearchBooks';

import API from '../../../utils/API';

const Home = () => {
  const [savedBooks, setSavedBooks] = useState([]);

  const loadBooks = () => {
    API.getBooks()
      .then(res => {
        // console.log(res.data);
        setSavedBooks(res.data);
      })
  }

  useEffect(() => {
    loadBooks();
  }, [])

  return (
    <div>
      <BookList books={savedBooks} />
      <SearchForm />
    </div>
  )
}

export default Home;

import React, { useState, useEffect } from 'react';
import SavedBookList from '../../SavedBookList';
import FoundBookList from '../../FoundBookList';

import SearchContext from '../../../utils/SearchContext';
import DbContext from '../../../utils/DbContext';
import API from '../../../utils/API';

const Home = () => {
  const [dbBooksState, setDbBooksState] = useState("ready");
  const [searchBooksState, setSearchBooksState] = useState("Search Results will Appear Here");

  const [savedBooks, setSavedBooks] = useState({
    books: [],
    handleBookDelete,
    // handleBookToggle
  });
  const [searchedBooks, setSearchedBooks] = useState({
    books: [],
    handleBookSave
  });
  const [formState, setFormState] = useState({});

  useEffect(() => {
    loadBooks();
  }, [])

  const loadBooks = () => {
    setDbBooksState("loading");
    API.getBooks()
      .then(res => {
        setSavedBooks({ ...savedBooks, books: res.data });
        setDbBooksState("resolved");
      })
      .catch(err => {
        console.log(err);
        setDbBooksState("failure");
      });
  }

  /* 
  helper function to build the queryUrl for 
  the google books api 
  */
  const makeSearch = (titleString, authorString) => {
    const words = [];
    if (titleString) {
      words.push(titleString.split(' ').join('+'));
    }
    if (authorString) {
      words.push(authorString.split(' ').join('+'));
    }
    return words.join('+');
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState, [name]: value
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchBooksState("Search Results will Appear Here");
    const { title, author } = formState;
    const searchTerms = makeSearch(title, author);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&key=`;
    API.googleBookSearch(url)
      .then(res => {
        setSearchedBooks({ ...searchedBooks, books: res.data });
        setSearchBooksState("resolved");
      })
      .catch(err => {
        console.log(err);
        setSearchBooksState("failed");
      });
  }

  function handleBookSave() {
    console.log("Read Me!");
    // API.saveBook({
    //   title: title,
    //   authors: authors,
    //   description: description,
    //   image: image
    // })
    //   .then(() => {
    //     loadBooks();
    //   })
  }

  function handleBookDelete(id) {
    // console.log('this kills the book');
    console.log(id);
    API.deleteBook(id)
      .then(() => loadBooks());
  }

  return (
    <div>
      {dbBooksState !== "resolved"
        ? <p>{dbBooksState}</p>
        : <DbContext.Provider value={savedBooks}>
          <SavedBookList books={savedBooks} />
        </DbContext.Provider>}
      {/* Search Form */}
      <form>
        <input onChange={handleInputChange} name="title" placeholder="Title" />
        <input onChange={handleInputChange} name="author" placeholder="Author" />
        <button onClick={handleFormSubmit}>Search Google Books</button>
      </form>
      {searchBooksState !== "resolved"
        ? <p>{searchBooksState}</p>
        : <SearchContext.Provider value={searchedBooks}>
          <FoundBookList books={searchedBooks} />
        </SearchContext.Provider>}
    </div>
  );

};

export default Home;

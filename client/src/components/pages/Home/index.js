import React, { useState, useEffect } from 'react';
import { BookList, BookListItem } from '../../BookList';

import API from '../../../utils/API';

const Home = () => {
  const [appState, setAppState] = useState("ready");
  const [savedBooks, setSavedBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [formState, setFormState] = useState({});

  useEffect(() => {
    loadBooks();
  }, [savedBooks])

  const loadBooks = () => {
    setAppState("loading");
    API.getBooks()
      .then(res => {
        setSavedBooks(res.data);
        setAppState("resolved");
      })
      .catch(err => {
        console.log(err);
        setAppState("failure");
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
    // console.log(e.target);
    const { name, value } = e.target;
    setFormState({
      ...formState, [name]: value
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, author } = formState;
    const searchTerms = makeSearch(title, author);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}+&key=`;
    API.googleBookSearch(url)
      .then(res => {
        console.log(res.data);
        setSearchedBooks(res.data);
      });
  }

  return (
    <div>
      <BookList header={"Your Library"}>
        {!savedBooks.length
          ? <p>{appState}</p>
          : savedBooks.map(book => (
            <BookListItem
              key={book._id}
              image={book.image}
              title={book.title}
              authors={book.authors.join(', ')}
              description={book.description.slice(0, 280) + "..."}
            />
          ))}
      </BookList>
      {/* Search Form */}
      <form>
        <input onChange={handleInputChange} name="title" placeholder="Title" />
        <input onChange={handleInputChange} name="author" placeholder="Author" />
        <button onClick={handleFormSubmit}>Search Google Books</button>
      </form>
      {/* BookList again, for searched books. */}
    </div>
  );
}

export default Home;

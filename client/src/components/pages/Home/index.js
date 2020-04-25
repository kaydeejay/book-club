import React, { useState, useEffect } from 'react';
import { BookList, BookListItem } from '../../BookList';
import SaveButton from '../../SaveButton';

import API from '../../../utils/API';

const Home = () => {
  const [dbBooksState, setDbBooksState] = useState("ready");
  const [searchBooksState, setSearchBooksState] = useState("Search Results will be Displayed Here");
  const [savedBooks, setSavedBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [formState, setFormState] = useState({});

  useEffect(() => {
    loadBooks();
  }, [])

  const loadBooks = () => {
    setDbBooksState("loading");
    API.getBooks()
      .then(res => {
        setSavedBooks(res.data);
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
    // console.log(e.target);
    const { name, value } = e.target;
    setFormState({
      ...formState, [name]: value
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchBooksState("loading...");
    const { title, author } = formState;
    const searchTerms = makeSearch(title, author);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}+&key=`;
    API.googleBookSearch(url)
      .then(res => {
        console.log(res.data);
        setSearchedBooks(res.data);
        setSearchBooksState("resolved");
      })
      .catch(err => {
        console.log(err);
        setSearchBooksState("failed");
      });
  }

  const handleBookSave = (e) => {
    console.log(e.target.attributes);
    const { title, authors, description, image } = e.target.attributes;
    console.log(title, authors, description, image);
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

  return (
    <div>
      <BookList header={"Your Library"}>
        {!savedBooks.length
          ? <p>{dbBooksState}</p>
          : savedBooks.map(book => (
            <BookListItem
              key={book._id}
              image={book.image}
              title={book.title}
              authors={book.authors.join(', ')}
              description={book.description.slice(0, 280) + "..."}
            >
              {/* <button onClick={handleBookSave}>Save to Library</button> */}
              <SaveButton {...book} onClick={handleBookSave}>Save to Library</SaveButton>
            </BookListItem>
          ))}
      </BookList>
      {/* Search Form */}
      <form>
        <input onChange={handleInputChange} name="title" placeholder="Title" />
        <input onChange={handleInputChange} name="author" placeholder="Author" />
        <button onClick={handleFormSubmit}>Search Google Books</button>
      </form>
      {/* BookList again, for searched books. */}
      <BookList header={"Results:"}>
        {!searchedBooks.length > 0
          ? <p>{searchBooksState}</p>
          : searchedBooks.map(book => (
            <BookListItem
              key={book.id}
              image={book.volumeInfo.imageLinks.smallThumbnail}
              title={book.volumeInfo.title}
              authors={book.volumeInfo.authors.join(', ')}
              description={book.volumeInfo.description.slice(0, 280) + "..."}
            >
              {/* <button onClick={handleBookSave}>Save to Library</button> */}
              <SaveButton {...book.volumeInfo} onClick={handleBookSave}>Save to Library</SaveButton>
            </BookListItem>
          ))}
      </BookList>
    </div>
  );
}

export default Home;

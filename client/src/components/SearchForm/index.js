import React, { useState, useEffect } from 'react';
import API from '../../utils/API';

const SearchForm = () => {
  const [search, setSearch] = useState({
    title: "",
    author: ""
  });

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
    setSearch({
      ...search, [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, author } = search;
    const searchTerms = makeSearch(title, author);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}+&key=`;
    API.googleBookSearch(url)
      .then(res => console.log(res.data));
  }

  return (
    <div>
      <form>
        <input onChange={handleInputChange} name="title" placeholder="Search by Title" />
        <input onChange={handleInputChange} name="author" placeholder="Search by Author" />
        <button onClick={handleFormSubmit}>Search</button>
      </form>
    </div>
  )
}

export default SearchForm;

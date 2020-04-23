import React from 'react';

const BookListItem = ({ image, title, authors, desc }) => {
  return (
    <div>
      <img src={image} alt="" />
      <h4>{title}</h4>
      <h5>{authors}</h5>
      <p>{desc}</p>
    </div>
  )
}

export default BookListItem;

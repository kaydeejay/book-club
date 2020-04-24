import React from 'react';

export const BookList = (props) => {
  return (
    <div>
      <h3>{props.header}</h3>
      {props.children}
    </div>
  );
}

export const BookListItem = (props) => {
  const { image, title, authors, description } = props;
  return (
    <div>
      <img src={image} alt="" />
      <h4>{title}</h4>
      <p>{authors}</p>
      <p>{description}</p>
      {props.children}
    </div>
  );
}
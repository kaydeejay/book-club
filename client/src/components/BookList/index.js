import React from 'react'

export const BookList = (props) => {
  return (
    <div>
      <h3>{props.header}</h3>
      {props.children}
    </div>
  );
}

export const BookListItem = ({
  // extract props
  image,
  title,
  authors,
  description
}) => {
  return (
    <div>
      <img src={image} alt="" />
      <h4>{title}</h4>
      <p>{authors}</p>
      <p>{description}</p>
    </div>
  );
}
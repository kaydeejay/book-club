import React from 'react'

const BookListItem = (props) => {
  console.log(props);
  return (
    <div>
      <img src={props.image} alt="" />
      <h3>{props.title}</h3>
      <h4>
        {props.authors}
      </h4>
      <p>{props.desc.slice(0, 280) + "..."}</p>

    </div>
  )
}

export default BookListItem;

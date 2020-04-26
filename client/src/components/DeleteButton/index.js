import React from 'react';
import './style.css';

const DeleteButton = (props) => {
  return (
    <button onClick={() => props.handleBookDelete(props.id)}>
      Delete from Library
    </button>
  )
}

export default DeleteButton;

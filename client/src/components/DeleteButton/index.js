import React from 'react'

const DeleteButton = (props) => {
  return (
    <button onClick={() => props.handleBookDelete(props.id)}>
      Delete from Library
    </button>
  )
}

export default DeleteButton;

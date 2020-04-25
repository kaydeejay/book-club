import React from 'react'

const SaveButton = (props) => {
  const { title, author, description, image } = props
  return (
    // enter in the components you need instead of just spreading them
    // use de-structuring
    <button
      title={title}
      author={author}
      description={description}
      image={image}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default SaveButton;

import React from 'react'

const SaveButton = (props) => {
  console.log(props)
  const { title, authors, description, image } = props
  return (
    <button onClick={() => {
      props.handleBookSave({
        title,
        authors,
        description,
        image
      })
    }}>
      Save to Library
    </button>
  )
}

export default SaveButton;

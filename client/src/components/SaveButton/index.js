import React from 'react'

const SaveButton = (props) => {
  return (
    // enter in the components you need instead of just spreading them
    // use de-structuring
    <button {...props} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default SaveButton;

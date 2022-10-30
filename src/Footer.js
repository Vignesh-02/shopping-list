import React from 'react'

const Footer = ({ length }) => {

    const today = new Date();

  return (
    <footer>
        <p>{ (length==1) ? `You have ${length} item in your list` : `You have ${length} items in your list`}</p>
        <p>Copyright &copy; {today.getFullYear()} </p>
    </footer>
  )
}

export default Footer
import React from 'react'
import './Button.css'

import { GAEvent } from '../../GoogleAnalytics'

export const Button = ({ onClick, ...rest }) => {

    const handleOnClick = (e) => {
      GAEvent(e)
      onClick()
    }

    return <ButtonUI onClick={handleOnClick} {...rest} />
}

export const ButtonUI = (props) => {
  const {
    secondary,
    onClick,
    children
  } = props

  if (secondary) 
    return <button
      className="button secondary"
      onClick={onClick}
    >
      {children}
    </button>
  
    return <button
      className="button primary"
      onClick={onClick}
    >
      {children}
    </button>
}
/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

interface ButtonProps {
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      css={css`
        border: none;
        outline: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        text-transform: uppercase;
        box-shadow: 0 6px 6px -6px #000000;
        font-family: inherit;
        font-size: 1rem;
      `}
    >
      {children}
    </button>
  )
}

export default Button
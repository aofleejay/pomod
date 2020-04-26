/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

interface LinkProps {
  to: string
}

const Link: React.FC<LinkProps> = ({ children, to }) => {
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      css={css`
        color: inherit;
        transition: color 0.5s ease-out;

        &:hover {
          color: #802050;
        }
      `}
    >
      {children}
    </a>
  )
}

export default Link

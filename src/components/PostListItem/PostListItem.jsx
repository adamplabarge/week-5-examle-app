import React from "react"
import { Likes } from '../Likes'

export const PostListItem = ({ id, title, children, likes }) => (
  <li
    style={{
      borderBottom: "1px solid #333",
      margin: ".5rem",
      padding: ".25rem",
    }}
  >
    <h3 style={{ marginBottom: ".1rem" }}>
      {id}: {title}
      {
        likes && <Likes likes={likes} />
      }
    </h3>
    {children}
  </li>
)

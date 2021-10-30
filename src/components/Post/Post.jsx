import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { likePost } from "actions"

import { Likes } from '../Likes'

const Post = ({ id, title, body, userId, likePost, likes }) => {
  const handleLikePost = (e) => {
    const id = parseInt(e.target.value)
    likePost(id)
  }

  return (
    <div className="Post">
      <header className="Post-header">
        <h1>{title}</h1>
        <button className="like" value={id} onClick={handleLikePost}>
          Like This Post
        </button>
          {
            likes && <Likes likes={likes} />
          }
      </header>
      <div className="Post-body">
        <p>{body}</p>
      </div>
      <footer className="Post-footer">
        <br />
        Author: {userId}
        <hr />
        <Link to="/">{`<< Back`}</Link>
      </footer>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  const { postId } = ownProps
  const post = state.postsState.posts[postId - 1]

  return {
    id: postId,
    title: post.title,
    body: post.body,
    userId: post.userId,
    likes: post.likes
  }
}

const mapDispatchToProps = {
  likePost,
}

const PostConnected = connect(mapStateToProps, mapDispatchToProps)(Post)

export { PostConnected as Post }

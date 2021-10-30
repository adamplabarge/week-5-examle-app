import {
  POSTS_REQUEST,
  POSTS_SUCESS,
  POSTS_FAILURE,
  LIKE_POST,
} from '../actions/types'

const initialState = {
  loading: false,
  posts: [],
  error: null
}

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case POSTS_SUCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: [...action.payload]
      }

    case POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    case LIKE_POST:
      const { payload: postId } = action

      const posts = state.posts.map(post => {
        const { id } = post
      
        if (postId === id) {
          const likes = post.likes ? post.likes + 1 : 1
          return {
            ...post,
            likes
          }
        }
      
        return post
      })

      return {
        ...state,
        posts
      }

    default:
      return state
  }
}
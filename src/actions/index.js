import {
  POSTS_REQUEST,
  POSTS_SUCESS,
  POSTS_FAILURE,
  LIKE_POST
} from './types'

export const getPosts = () => {
  return (dispatch) => {

    dispatch(requestPosts())

    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')

        .then(res => res.json())
      
        .then(data =>  {
          dispatch(setPosts(data))
        })      
      
        .catch(err => dispatch(errorPosts(err.message)))
    }, 1000)
  }
}

const setPosts = posts => ({
  type: POSTS_SUCESS,
  payload: posts
})

const requestPosts = () => ({
  type: POSTS_REQUEST
})

const errorPosts = error => ({
  type: POSTS_FAILURE,
  payload: {
    error
  }
})

export const likePost = id => ({
  type: LIKE_POST,
  payload: id
})

export const likePostApi = id => {
  return dispatch => {
    setTimeout(() => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'AuthenticationId': ''
        },
        method: 'POST',
        body: JSON.stringify({
          id,
        })
      }
      fetch('https://some-api.com/posts/likes/update', options)   
        .catch(err => dispatch(errorPosts(err.message)))
        
    }, 1000)
  }
}
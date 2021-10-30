import React from 'react'
import './App.css'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { Home } from './components/Home'
import { Post } from './components/Post'

const App = () =>
  <BrowserRouter>
    <Switch>

      <Route
        path="/post/:postId"
        render={({ match }) => <Post postId={match.params.postId} />}
      />

      <Route path="/">
        <Home />
      </Route>

    </Switch>
  </BrowserRouter >


export default App
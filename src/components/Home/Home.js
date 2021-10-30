import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { getPosts } from "actions"
import { PostListItem } from "components/PostListItem"

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filtered: [],
      filter: "all",
      needsHelps: false
    }

    this.filterPosts = this.filterPosts.bind(this)
    this.onFilterByChange = this.onFilterByChange.bind(this)
    this.isChecked = this.isChecked.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)

    const rgByFirstWord = new RegExp(/ .*/, "")
    const rgByLastWord = new RegExp(/\b(\w+)\b/)

    this.filters = {
      first: rgByFirstWord,
      last: rgByLastWord,
    }

    this.radioRef = React.createRef()

    const startTime = new Date()

    this.clicksIntoFilter = 0

    this.timeBetweenFilterClicks = () => new Promise((resolve) => {
      const endTime = new Date()
      const timeDiff = endTime - startTime // in ms

      connectWithAdService(resolve, timeDiff, this.clicksIntoFilter)
      console.log('connectWithAdService called.')
    })
  }

  componentDidMount() {
    const { posts, getPosts } = this.props
    if (!posts.length) {
      getPosts()
    }
  }

  filterPosts(e) {
    const { filter } = this.state
    const filterBy = this.filters[filter]
    const { posts } = this.props

    const filtered = posts.filter(({ title }) => {
      const str = filterBy ? title.replace(filterBy) : title
      return str.includes(e.target.value)
    })

    this.setState({
      filtered,
    })
  }

  onFilterByChange(e) {
    this.setState({
      filter: e.target.value,
    })
  }

  isChecked(value) {
    return value === this.state.filter
  }

  handleOnClick() {
    this.clicksIntoFilter = this.clicksIntoFilter + 1
    
    this.timeBetweenFilterClicks()
      .then(clicks => {
        if (clicks > 3) {
          this.setState({
            needsHelps: true
          })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { filtered, needsHelps } = this.state
    const { posts, loading, error } = this.props

    const postsList = filtered.length ? filtered : posts

    if (error) return <p>{error}</p>

    return (
      <div className="App">
        <header className="App-header">
          <h1>Articles</h1>
          {loading ? (
            <p>...loading</p>
          ) : (
            <div>
              <label htmlFor="post-filter">Fitler Posts by:</label>
              <br />
              <input
                style={{ height: "30px" }}
                name="post-filter"
                type="text"
                onClick={this.handleOnClick}
                onChange={this.filterPosts}
              />
              <br />
              { 
                needsHelps && 
                  <div onChange={this.onFilterByChange} ref={this.radioRef}>
                    <input
                      checked={this.isChecked("all")}
                      type="radio"
                      value="all"
                      name="filter-by"
                    />
                    All Words in Title
                    <input
                      checked={this.isChecked("first")}
                      type="radio"
                      value="first"
                      name="filter-by"
                    />
                    First Word in Title
                    <input
                      checked={this.isChecked("last")}
                      type="radio"
                      value="last"
                      name="filter-by"
                    />
                    Last Word in Title
                  </div>
              }
              <ul>
                {postsList.length &&
                  postsList.map((post) => (
                    <PostListItem key={post.id} {...post}>
                      <Link to={`/post/${post.id}`}>...read more</Link>
                    </PostListItem>
                  ))}
              </ul>
            </div>
          )}
        </header>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.postsState,
  }
}

const mapDispatchToProps = {
  getPosts,
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)

export { HomeConnected as Home }

const connectWithAdService = (resolve, time, clicks) => {
  setTimeout(() => {
    console.log("Time:", time)
    console.log("Clicks", clicks)
    return resolve(clicks)
  }, 1000)
} 
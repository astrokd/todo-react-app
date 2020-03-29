import React from 'react'
import { LoginContext } from './context'
import If from './If'

class LoginForm extends React.Component {
  static contextType = LoginContext
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.context.login(this.state.username, this.state.password)
    this.setState({
      username: '',
      password: ''
    })
  }

  render () {
    return (
      <>
        <If condition={this.context.loggedIn}>
          <button onClick={this.context.logout}>Log Out</button>
        </If>

        <If condition={!this.context.loggedIn}>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
            <button value="submit">Log In</button>
          </form>
        </If>
      </>
    )
  }
}

export default LoginForm

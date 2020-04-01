import React from 'react'
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken'

export const LoginContext = React.createContext()

const API = 'http://localhost:3333'

class AuthRules extends React.Component {
  constructor () {
    super()
    this.state = {
      loggedIn: false,
      user: {},
      login: this.login,
      logout: this.logout
    }
  }

  setLoginState = (loggedIn, token, user) => {
    this.setState({ loggedIn, token, user })
    cookie.save('auth', token || '')
  }

  login = async (username, password) => {
    try {
      const raw = await fetch(`${API}/signin`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
      })
      const response = await raw.json()
      const token = response.token
      this.validateToken(token)
    } catch (error) {
      console.error(error)
    }
  }

  validateToken = token => {
    try {
      const user = jwt.verify(token, "fine, keep your secrets")
      this.setLoginState(true, token, user)
    } catch (error) {
      this.setLoginState(false, null, {})
      console.error('Token validation error:', error)
    }
  }

  logout = () => {
    this.setLoginState(false, null, {})
  }

  componentDidMount () {
    const cookieToken = cookie.load('auth')
    if (cookieToken) this.validateToken(cookieToken)
  }

  render () {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    )
  }
}

export default AuthRules

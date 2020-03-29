import React, { useContext } from 'react'
import If from './If'
import { LoginContext } from '../context/AuthRules'

function Auth (props) {
  const { loggedIn, user } = useContext(LoginContext)
  let okToRender = false
  let isPermissible = true
  if (props.permission) {
    isPermissible = user.permissions && user.permissions.includes(props.permission)
  }
  okToRender = loggedIn && Object.keys(user).length !== 0 && isPermissible
  return (
    <If condition={okToRender}>
      {props.children}
    </If>
  )
}

export default Auth

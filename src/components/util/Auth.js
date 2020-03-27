import React, { useContext } from "react"
import {AuthMichContext} from '../../context/AuthMich'

function Auth(props) {

  const { user, loggedIn } = useContext(AuthMichContext)

  //do logic to determine if the person has the right permissions. 
  //props contains the requiredPermission.
  let authorized = false;
  if (!props.required) {
    authorized = true;
  } else {
    authorized = user.role && user.role.permissions.includes(props.required)
  }

  console.log('render todo auth status:  ', authorized, loggedIn, props.required, user)
  return authorized && loggedIn ? props.children : null
}

export default Auth
import React from 'react'

const UserContext = React.createContext({
  userDetails: {},
  addUserDetails: () => {},
})

export default UserContext

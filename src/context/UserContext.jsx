import { useState } from 'react'
import { createContext } from 'react';

export const UserProvider = createContext()

const UserContext = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null)
  return (
    <UserProvider.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserProvider.Provider>
  )
}

export default UserContext
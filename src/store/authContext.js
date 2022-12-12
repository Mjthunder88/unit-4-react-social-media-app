import { useState, useEffect, useCallback, createContext } from 'react'

let logoutTimer

const AuthContext = createContext({  //? initilizaion of our CONTEXT. so BELOW when you put .provider it will the provide all this data to any CONSUMERS/componuts 
  token: '',
  login: () => {},
  logout: () => {},
  userId: null
})

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime()
  const expTime = exp 
  const remainingTime = expTime - currentTime
  return remainingTime
}

const getLocalData = () => {
  const storedToken = localStorage.getItem('token')
  const storedExp = localStorage.getItem('exp')

  const remainingTime = calculateRemainingTime(storedExp)

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    return null
  }


  return {
    token: storedToken,
    duration: remainingTime,
  }
}



export const AuthContextProvider = (props) => { //? And this custome component is the one that wraps our ENTIRE APPLICATION. because it contain's all the data and the inilizied data to share with our consumers. 
  const localData = getLocalData()
  
  let initialToken
  if (localData) {
    initialToken = localData.token
  }

  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(null)


  const logout = () => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationTime') //* wer remove them all so that any other compoents won't have access to the data anymore either. 
    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }

  }

  const login = (token, expirationTime, userId) => {
    setToken(token)
    setUserId(userId)
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId) //?
    localStorage.setItem('expirationTime', expirationTime)

    const remainingTime = calculateRemainingTime(expirationTime)
    logoutTimer = setTimeout(logout, remainingTime) // setTimeout method takes a callback and a number in millisecounds
  }

  const contextValue = {
    token,
    login,
    logout, 
    userId
  }
  // * These values will be the default values of our context if nothing changes. Thats why above ^ when you create the context you have to set it to default/ plain values. 
  // * Because these can change or if not they will just be the default you set in the beginning. 
//? the AuthContext.provider is what you would see above where it first gets created.  and it has all the values of the contextvalue on LINE 56
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}


export default AuthContext

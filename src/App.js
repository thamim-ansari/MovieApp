import {useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieDetails from './components/MovieDetails'
import Search from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import UserContext from './context/UserContext'

import './App.css'

const App = () => {
  const [userData, setUserData] = useState({})
  const onAddUserData = user => setUserData(user)
  console.log(userData)
  return (
    <UserContext.Provider
      value={{
        userData,
        addUserDetails: onAddUserData,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/popular" component={Popular} />
        <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
        <ProtectedRoute exact path="/search" component={Search} />
        <ProtectedRoute exact path="/account" component={Account} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </UserContext.Provider>
  )
}
export default App

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
import SearchContext from './context/SearchContext'

import './App.css'

const App = () => {
  const [searchInput, setSearchInput] = useState('')
  const onSearchInputData = search => setSearchInput(search)

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        onSearchInput: onSearchInputData,
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
    </SearchContext.Provider>
  )
}
export default App

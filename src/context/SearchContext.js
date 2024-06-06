import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  onSearchInput: () => {},
})

export default SearchContext

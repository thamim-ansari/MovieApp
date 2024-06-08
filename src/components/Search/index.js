import {useState} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import MovieItem from '../MovieItem'
import Footer from '../Footer'

import './index.css'

const searchApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

const Search = () => {
  const [searchList, setSearchList] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchApiStatus, setSearchApiStatus] = useState(
    searchApiStatusConstants.initial,
  )

  const getFormattedMovieData = data => ({
    id: data.id,
    name: data.title,
    posterImage: data.poster_path,
    backdropImage: data.backdrop_path,
  })

  const getSearchResult = async input => {
    setSearchApiStatus(searchApiStatusConstants.in_progress)
    setSearchInput(input)
    const movieSearchApiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${input}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const movieSearchResponse = await fetch(movieSearchApiUrl, options)
    if (movieSearchResponse.ok) {
      const fetchedMovieSearchData = await movieSearchResponse.json()
      const formattedMovieSearchData = fetchedMovieSearchData.results.map(
        eachItem => getFormattedMovieData(eachItem),
      )
      setSearchList(formattedMovieSearchData)
      setSearchApiStatus(searchApiStatusConstants.success)
    } else {
      setSearchApiStatus(searchApiStatusConstants.failure)
    }
  }

  const onClickSearchRetry = () => getSearchResult()

  const renderSearchResult = () =>
    searchList.length > 0 ? (
      <div className="search-movie-container">
        <ul className="search-movie-responsive">
          {searchList.map(searchData => (
            <MovieItem key={searchData.id} moviesData={searchData} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-search-result-container">
        <img
          src="https://res.cloudinary.com/dbu8hb7th/image/upload/v1717595070/yapql2obtefc9isipmji.png"
          alt="no movies"
          className="no-search-result-image"
        />
        <p className="no-search-result-description">
          {`Your search for ${searchInput} did not find any matches.`}
        </p>
      </div>
    )

  const renderSearchResultLoader = () => (
    <div className="search-result-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  const renderSearchResultFailure = () => (
    <div className="search-result-failure-container">
      <img
        src="https://res.cloudinary.com/dbu8hb7th/image/upload/v1717514018/mahf00wtlfk7gtyccnvm.png"
        alt="failure view"
        className="search-result-failure-image"
      />
      <p className="search-result-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="search-result-retry-btn"
        onClick={onClickSearchRetry}
      >
        Try Again
      </button>
    </div>
  )
  const renderSearchResultsView = () => {
    switch (searchApiStatus) {
      case searchApiStatusConstants.success:
        return renderSearchResult()
      case searchApiStatusConstants.in_progress:
        return renderSearchResultLoader()
      case searchApiStatusConstants.failure:
        return renderSearchResultFailure()
      default:
        return null
    }
  }

  return (
    <div className="search-bg-container">
      <Header getSearchResult={getSearchResult} />
      <div className="search-main-container">{renderSearchResultsView()}</div>
      <Footer />
    </div>
  )
}

export default Search

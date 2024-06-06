import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import MovieItem from '../MovieItem'
import Footer from '../Footer'

import './index.css'

const popularApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

const Popular = () => {
  const [popularMovieList, setPopularMovieList] = useState([])
  const [popularMovieApiStatus, setPopularMovieApiStatus] = useState(
    popularApiStatusConstants.initial,
  )

  const getFormattedMovieData = data => ({
    id: data.id,
    title: data.title,
    posterImage: data.poster_path,
    backdropImage: data.backdrop_path,
  })

  const getPopularMovieData = async () => {
    setPopularMovieApiStatus(popularApiStatusConstants.in_progress)
    const popularMovieApiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const popularMovieResponse = await fetch(popularMovieApiUrl, options)
    if (popularMovieResponse.ok) {
      const fetchedPopularMovieData = await popularMovieResponse.json()
      const formattedPopularMovieData = fetchedPopularMovieData.results.map(
        eachItem => getFormattedMovieData(eachItem),
      )
      setPopularMovieList(formattedPopularMovieData)
      setPopularMovieApiStatus(popularApiStatusConstants.success)
    } else {
      setPopularMovieApiStatus(popularApiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getPopularMovieData()
  }, [])

  const onClickPopularMovieRetry = () => {
    getPopularMovieData()
  }

  const renderPopularMovies = () => (
    <div className="popular-movie-container">
      <ul className="popular-movie-responsive">
        {popularMovieList.map(eachItem => (
          <MovieItem key={eachItem.id} moviesData={eachItem} />
        ))}
      </ul>
    </div>
  )

  const renderPopularMovieLoader = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )
  const renderPopularMovieFailure = () => (
    <div className="popular-failure-container">
      <img
        src="https://res.cloudinary.com/dbu8hb7th/image/upload/v1717514018/mahf00wtlfk7gtyccnvm.png"
        alt="failure view"
        className="popular-failure-image"
      />
      <p className="popular-movie-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="popular-movie-retry-btn"
        onClick={onClickPopularMovieRetry}
      >
        Try Again
      </button>
    </div>
  )

  const renderPopularView = () => {
    switch (popularMovieApiStatus) {
      case popularApiStatusConstants.success:
        return renderPopularMovies()
      case popularApiStatusConstants.in_progress:
        return renderPopularMovieLoader()
      case popularApiStatusConstants.failure:
        return renderPopularMovieFailure()
      default:
        return null
    }
  }

  return (
    <div className="popular-bg-container">
      <Header />
      {renderPopularView()}
      <Footer />
    </div>
  )
}

export default Popular

import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {parseISO, format} from 'date-fns'
import Cookies from 'js-cookie'

import Header from '../Header'
import MovieItem from '../MovieItem'
import Footer from '../Footer'

import './index.css'

const movieDetailsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

const MovieDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const [movieDetailsData, setMovieDetailsData] = useState([])
  const [movieDetailsApiStatus, setMovieDetailsApiStatus] = useState(
    movieDetailsApiStatusConstants.initial,
  )

  const convertMinutesToHoursAndMinutes = minutes => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  const formatDate = dateString => {
    if (!dateString) return ''
    try {
      const date = parseISO(dateString)
      return format(date, 'do MMMM yyyy')
    } catch (error) {
      console.error('Invalid date format:', dateString)
      return ''
    }
  }

  const movieRuntime = convertMinutesToHoursAndMinutes(movieDetailsData.runtime)
  const releasedYear = new Date(movieDetailsData.releaseDate).getFullYear()
  const movieCertificate = movieDetailsData.adult ? 'A' : 'U/A'
  const releaseDate = formatDate(movieDetailsData.releaseDate)

  const getFormattedMovieData = data => ({
    id: data.id,
    name: data.title,
    posterImage: data.poster_path,
    backdropImage: data.backdrop_path,
    overview: data.overview,
    adult: data.adult,
    budget: data.budget,
    genres: data.genres,
    releaseDate: data.release_date,
    runtime: data.runtime,
    similarMovies: data.similar_movies.map(eachSimilarMovie => ({
      id: eachSimilarMovie.id,
      name: eachSimilarMovie.title,
      posterImage: eachSimilarMovie.poster_path,
      backdropImage: eachSimilarMovie.backdrop_path,
    })),
    spokenLanguages: data.spoken_languages,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  const getMovieDetails = async () => {
    setMovieDetailsApiStatus(movieDetailsApiStatusConstants.in_progress)
    const movieDetailsApiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const movieDetailsApiResponse = await fetch(movieDetailsApiUrl, options)
    if (movieDetailsApiResponse.ok) {
      const fetchMovieDetailsData = await movieDetailsApiResponse.json()
      const formattedMovieDetailsData = getFormattedMovieData(
        fetchMovieDetailsData.movie_details,
      )
      setMovieDetailsData(formattedMovieDetailsData)
      setMovieDetailsApiStatus(movieDetailsApiStatusConstants.success)
    } else {
      setMovieDetailsApiStatus(movieDetailsApiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getMovieDetails()
  }, [id])

  const renderMovieDetailsBanner = () => (
    <div
      className="movie-details-banner-container"
      style={{backgroundImage: `url(${movieDetailsData.backdropImage})`}}
    >
      <div className="movie-details-banner-responsive">
        <h1 className="movie-details-banner-title">{movieDetailsData.name}</h1>
        <div className="movie-details-banner-info-container">
          <p className="movie-details-banner-info">{movieRuntime}</p>
          <p className="movie-details-banner-info movie-certificate">
            {movieCertificate}
          </p>
          <p className="movie-details-banner-info">{releasedYear}</p>
        </div>
        <p className="movie-details-banner-description">
          {movieDetailsData.overview}
        </p>
        <button type="button" className="movie-details-banner-play-btn">
          Play
        </button>
      </div>
    </div>
  )
  const renderMovieDetailsInfo = () => (
    <div className="movie-details-container">
      <div className="movie-details-responsive">
        <div>
          <h1 className="movie-details-item-heading">Genres</h1>
          <ul className="movie-details-list">
            {movieDetailsData.genres.map(genre => (
              <li key={genre.id} className="movie-details-item">
                <p className="movie-details-genre-and-language">{genre.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="movie-details-item-heading">Audio Available</h1>
          <ul className="movie-details-list">
            {movieDetailsData.spokenLanguages.map(language => (
              <li key={language.id} className="movie-details-item">
                <p className="movie-details-genre-and-language">
                  {language.english_name}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div>
            <h1 className="movie-details-item-heading">Rating Count</h1>
            <p className="movie-details-item">{movieDetailsData.voteCount}</p>
          </div>
          <div>
            <h1 className="movie-details-item-heading">Rating Average</h1>
            <p className="movie-details-item">{movieDetailsData.voteAverage}</p>
          </div>
        </div>
        <div>
          <div>
            <h1 className="movie-details-item-heading">Budget</h1>
            <p className="movie-details-item">{movieDetailsData.budget}</p>
          </div>
          <div>
            <h1 h1 className="movie-details-item-heading">
              Release Date
            </h1>
            <p className="movie-details-item">{releaseDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
  const renderMoreLikeThis = () => (
    <div className="similar-movies-container">
      <div className="similar-movies-responsive">
        <h1 className="similar-movie-container-heading">More like this</h1>
        <ul className="similar-movie-list">
          {movieDetailsData.similarMovies.map(similarMovie => (
            <MovieItem key={similarMovie.id} moviesData={similarMovie} />
          ))}
        </ul>
      </div>
    </div>
  )
  const renderMovieDetails = () => (
    <>
      {renderMovieDetailsBanner()}
      {renderMovieDetailsInfo()}
      {renderMoreLikeThis()}
    </>
  )
  const renderMovieDetailsLoader = () => (
    <div className="movie-details-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )
  const onClickMovieDetailsRetry = () => {
    getMovieDetails()
  }
  const renderMovieDetailsFailure = () => (
    <div className="movie-details-failure-container">
      <img
        src="https://res.cloudinary.com/dbu8hb7th/image/upload/v1717514018/mahf00wtlfk7gtyccnvm.png"
        alt="failure view"
        className="movie-details-failure-image"
      />
      <p className="movie-details-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="movie-details-retry-btn"
        onClick={onClickMovieDetailsRetry}
      >
        Try Again
      </button>
    </div>
  )
  const renderMovieDetailsView = () => {
    switch (movieDetailsApiStatus) {
      case movieDetailsApiStatusConstants.success:
        return renderMovieDetails()
      case movieDetailsApiStatusConstants.in_progress:
        return renderMovieDetailsLoader()
      case movieDetailsApiStatusConstants.failure:
        return renderMovieDetailsFailure()
      default:
        return null
    }
  }

  return (
    <div className="movie-details-bg">
      <Header />
      {renderMovieDetailsView()}
      <Footer />
    </div>
  )
}

export default MovieDetails

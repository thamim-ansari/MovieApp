import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Carousel from '../Carousel'
import Footer from '../Footer'

import './index.css'

const homeApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}
const Home = () => {
  const [originalMovieList, setOriginalMovieList] = useState([])
  const [trendingMovieList, setTrendingMovieList] = useState([])
  const [topRatedMovieList, setTopRatedMovieList] = useState([])

  const [originalMovieApiStatus, setOriginalMovieApiStatus] = useState(
    homeApiStatusConstants.initial,
  )
  const [trendingMovieApiStatus, setTrendingMovieApiStatus] = useState(
    homeApiStatusConstants.initial,
  )
  const [topRatedMovieApiStatus, setTopRatedMovieApiStatus] = useState(
    homeApiStatusConstants.initial,
  )

  const randomMovieData =
    originalMovieList.length > 0
      ? originalMovieList[Math.floor(Math.random() * originalMovieList.length)]
      : ''

  const jwtToken = Cookies.get('jwt_token')
  const options = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    method: 'GET',
  }

  const getFormattedMovieData = data => ({
    id: data.id,
    name: data.title,
    posterImage: data.poster_path,
    backdropImage: data.backdrop_path,
    overview: data.overview,
  })

  const getOriginalMovieList = async () => {
    setOriginalMovieApiStatus(homeApiStatusConstants.in_progress)
    const originalMovieApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const originalMovieApiResponse = await fetch(originalMovieApiUrl, options)
    if (originalMovieApiResponse.ok) {
      const originalMovieData = await originalMovieApiResponse.json()
      const formattedOriginalMovieData = originalMovieData.results.map(
        eachData => getFormattedMovieData(eachData),
      )
      setOriginalMovieList(formattedOriginalMovieData)
      setOriginalMovieApiStatus(homeApiStatusConstants.success)
    } else {
      setOriginalMovieApiStatus(homeApiStatusConstants.failure)
    }
  }

  const getTrendingMovieList = async () => {
    setTrendingMovieApiStatus(homeApiStatusConstants.in_progress)
    const trendingMovieApiUrl =
      'https://apis.ccbp.in/movies-app/trending-movies'
    const trendingMovieApiResponse = await fetch(trendingMovieApiUrl, options)
    if (trendingMovieApiResponse.ok) {
      const trendingMovieData = await trendingMovieApiResponse.json()
      console.log(trendingMovieData)
      const formattedTrendingMovieData = trendingMovieData.results.map(
        eachData => getFormattedMovieData(eachData),
      )
      setTrendingMovieList(formattedTrendingMovieData)
      setTrendingMovieApiStatus(homeApiStatusConstants.success)
    } else {
      setTrendingMovieApiStatus(homeApiStatusConstants.failure)
    }
  }

  const getTopRatedMovieList = async () => {
    setTopRatedMovieApiStatus(homeApiStatusConstants.in_progress)
    const topRatedMovieApiUrl =
      'https://apis.ccbp.in/movies-app/top-rated-movies'
    const topRatedMovieApiResponse = await fetch(topRatedMovieApiUrl, options)
    if (topRatedMovieApiResponse.ok) {
      const topRatedMovieData = await topRatedMovieApiResponse.json()
      const formattedTopRatedMovieData = topRatedMovieData.results.map(
        eachData => getFormattedMovieData(eachData),
      )
      setTopRatedMovieList(formattedTopRatedMovieData)
      setTopRatedMovieApiStatus(homeApiStatusConstants.success)
    } else {
      setTopRatedMovieApiStatus(homeApiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getOriginalMovieList()
    getTrendingMovieList()
    getTopRatedMovieList()
  }, [])

  const onClickOriginalMovieRetry = () => getOriginalMovieList()
  const onClickTrendingMovieRetry = () => getTrendingMovieList()
  const onClickTopRatedMovieRetry = () => getTopRatedMovieList()

  const renderHomeBanner = () => (
    <div
      className="home-banner-container"
      style={{backgroundImage: `url(${randomMovieData.posterImage})`}}
    >
      <div className="home-banner-responsive">
        <h1 className="home-banner-title">{randomMovieData.name}</h1>
        <p className="home-banner-description">{randomMovieData.overview}</p>
        <button type="button" className="home-banner-play-btn">
          Play
        </button>
      </div>
    </div>
  )
  const renderBannerLoader = () => (
    <div testid="loader" className="banner-loader-container">
      <div className="banner-loader-responsive">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )
  const renderBannerFailure = () => (
    <div testid="loader" className="banner-loader-container">
      <div className="banner-loader-responsive">
        <img
          src="https://res.cloudinary.com/dbu8hb7th/image/upload/v1717852268/nosabx7lzf7og6fo1eta.png"
          alt="failure view"
          className="banner-warning-icon"
        />
        <p className="banner-failure-description">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="banner-try-again-btn"
          onClick={onClickOriginalMovieRetry}
        >
          Try Again
        </button>
      </div>
    </div>
  )
  const renderBannerView = () => {
    switch (originalMovieApiStatus) {
      case homeApiStatusConstants.success:
        return renderHomeBanner()
      case homeApiStatusConstants.in_progress:
        return renderBannerLoader()
      case homeApiStatusConstants.failure:
        return renderBannerFailure()
      default:
        return null
    }
  }
  const renderTrendingMovies = () => <Carousel sliderData={trendingMovieList} />
  const renderCategoryLoader = () => (
    <div testid="loader" className="category-loader-container">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )
  const renderTrendingMovieFailure = () => (
    <div testid="loader" className="category-loader-container">
      <img
        src="https://res.cloudinary.com/dbu8hb7th/image/upload/v1717852268/nosabx7lzf7og6fo1eta.png"
        alt="failure view"
        className="category-warning-icon"
      />
      <p className="category-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="category-try-again-btn"
        onClick={onClickTrendingMovieRetry}
      >
        Try Again
      </button>
    </div>
  )
  const renderTrendingNowView = () => {
    switch (trendingMovieApiStatus) {
      case homeApiStatusConstants.success:
        return renderTrendingMovies()
      case homeApiStatusConstants.in_progress:
        return renderCategoryLoader()
      case homeApiStatusConstants.failure:
        return renderTrendingMovieFailure()
      default:
        return null
    }
  }
  const renderOriginalsMovies = () => (
    <Carousel sliderData={originalMovieList} />
  )
  const renderOriginalsMovieFailure = () => (
    <div testid="loader" className="category-loader-container">
      <img
        src="https://res.cloudinary.com/dbu8hb7th/image/upload/v1717852268/nosabx7lzf7og6fo1eta.png"
        alt="failure view"
        className="category-warning-icon"
      />
      <p className="category-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="category-try-again-btn"
        onClick={onClickOriginalMovieRetry}
      >
        Try Again
      </button>
    </div>
  )
  const renderOriginalsView = () => {
    switch (originalMovieApiStatus) {
      case homeApiStatusConstants.success:
        return renderOriginalsMovies()
      case homeApiStatusConstants.in_progress:
        return renderCategoryLoader()
      case homeApiStatusConstants.failure:
        return renderOriginalsMovieFailure()
      default:
        return null
    }
  }

  const renderTopRatedMovies = () => <Carousel sliderData={topRatedMovieList} />

  const renderTopRatedMoviesFailure = () => (
    <div testid="loader" className="category-loader-container">
      <img
        src="https://res.cloudinary.com/dbu8hb7th/image/upload/v1717852268/nosabx7lzf7og6fo1eta.png"
        alt="failure view"
        className="category-warning-icon"
      />
      <p className="category-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="category-try-again-btn"
        onClick={onClickTopRatedMovieRetry}
      >
        Try Again
      </button>
    </div>
  )

  const renderTopRatedView = () => {
    switch (topRatedMovieApiStatus) {
      case homeApiStatusConstants.success:
        return renderTopRatedMovies()
      case homeApiStatusConstants.in_progress:
        return renderCategoryLoader()
      case homeApiStatusConstants.failure:
        return renderTopRatedMoviesFailure()
      default:
        return null
    }
  }
  const homeCategoryClass =
    originalMovieApiStatus === 'SUCCESS'
      ? 'home-category-container home-category-container-success'
      : 'home-category-container'

  return (
    <div className="home-bg-container">
      <Header />
      {renderBannerView()}
      <div className={homeCategoryClass}>
        <div className="home-category-responsive">
          <div>
            <h1 className="home-category-headings">Trending Now</h1>
            {renderTrendingNowView()}
          </div>
          <div>
            <h1 className="home-category-headings">Top Rated</h1>
            {renderTopRatedView()}
          </div>
          <div>
            <h1 className="home-category-headings">Originals</h1>
            {renderOriginalsView()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home

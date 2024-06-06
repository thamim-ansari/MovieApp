import {Link} from 'react-router-dom'

import './index.css'

const MovieItem = props => {
  const {moviesData} = props
  const {id, posterImage, title} = moviesData
  return (
    <li className="movie-item">
      <Link to={`/movies/${id}`}>
        <img src={posterImage} alt={title} className="movie-list-image" />
      </Link>
    </li>
  )
}

export default MovieItem

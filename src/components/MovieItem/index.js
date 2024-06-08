import {Link} from 'react-router-dom'

import './index.css'

const MovieItem = props => {
  const {moviesData} = props
  const {id, posterImage, name} = moviesData
  return (
    <Link to={`/movies/${id}`}>
      <li className="movie-item">
        <img src={posterImage} alt={name} className="movie-list-image" />
      </li>
    </Link>
  )
}

export default MovieItem

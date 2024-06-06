import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const Carousel = props => {
  const {sliderData} = props
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <FaChevronRight color="#ffffff" />,
    prevArrow: <FaChevronLeft color="#ffffff" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
    ],
    className: 'custom-slider',
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {sliderData.map(movieData => (
          <Link to={`/movies/${movieData.id}`}>
            <div key={movieData.name} className="carousel-image-container">
              <img
                src={movieData.posterImage}
                alt={movieData.name}
                className="carousel-image"
              />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default Carousel

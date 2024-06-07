import {useState} from 'react'
import {useLocation, Link} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'
import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

const Header = ({getSearchResult}) => {
  const [isMenubarShown, setMenuBarStatus] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const location = useLocation()
  const pageLocation = location.pathname

  const onClickOpenMenu = () => setMenuBarStatus(true)
  const onClickCloseMenu = () => setMenuBarStatus(false)
  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearch = event => {
    event.preventDefault()
    if (event.key === 'Enter' || searchInput.length > 0) {
      getSearchResult(searchInput)
    }
  }

  const renderSearchContainer = () =>
    pageLocation === '/search' ? (
      <form className="search-input-container" onSubmit={onClickSearch}>
        <input
          type="search"
          value={searchInput}
          placeholder="Search"
          className="search-input"
          onChange={onChangeSearchInput}
        />
        <button type="button" className="search-btn" onClick={onClickSearch}>
          <HiOutlineSearch className="search-page-icon" testid="searchButton" />
        </button>
      </form>
    ) : (
      <Link to="/search">
        <button type="button" className="header-search-btn">
          <HiOutlineSearch
            className="header-search-icon"
            testid="searchButton"
          />
        </button>
      </Link>
    )

  return (
    <>
      <nav className="header-bg-container">
        <div className="header-responsive-container">
          <div className="header-logo-nav-route-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dbu8hb7th/image/upload/v1717071521/midvhqtddq6cvgbllcxr.png"
                alt="website logo"
                className="header-logo-img"
              />
            </Link>
            <ul className="desktop-nav-links-container">
              <Link
                to="/"
                className={
                  pageLocation === '/'
                    ? 'desktop-nav-links active-page-link '
                    : 'desktop-nav-links'
                }
              >
                <li>Home</li>
              </Link>
              <Link
                to="/popular"
                className={
                  pageLocation === '/popular'
                    ? 'desktop-nav-links active-page-link '
                    : 'desktop-nav-links'
                }
              >
                <li>Popular</li>
              </Link>
            </ul>
          </div>
          <div className="header-search-menu-container">
            {renderSearchContainer()}
            <Link to="/account">
              <button type="button" className="profile-btn">
                <img
                  src="https://res.cloudinary.com/dbu8hb7th/image/upload/v1717244703/wsob9uy0mq0sueqor4bn.png"
                  alt="profile"
                  className="profile-image"
                />
              </button>
            </Link>
            <button
              type="button"
              className="header-nav-menu-btn"
              onClick={onClickOpenMenu}
            >
              <img
                src="https://res.cloudinary.com/dbu8hb7th/image/upload/v1717571307/iugevkc90i0r2gc1blgb.png"
                alt="menu icon"
                className="header-menu-icon"
              />
            </button>
          </div>
        </div>
      </nav>
      {isMenubarShown && (
        <div className="mobile-nav-container">
          <div className="responsive-mobile-nav">
            <ul className="mobile-nav-list">
              <Link to="/" className="mobile-nav-links">
                <li>Home</li>
              </Link>
              <Link to="/popular" className="mobile-nav-links">
                <li>Popular</li>
              </Link>
              <Link to="/account" className="mobile-nav-links">
                <li>Account</li>
              </Link>
            </ul>
            <div>
              <button
                type="button"
                className="nav-close-btn"
                onClick={onClickCloseMenu}
              >
                <IoIosCloseCircle className="nav-close-icon" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header

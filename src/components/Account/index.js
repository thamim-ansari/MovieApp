import {useContext} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

import UserContext from '../../context/UserContext'

import './index.css'

const Account = props => {
  const {history} = props
  const {userData} = useContext(UserContext)
  const {username, password} = userData

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="account-bg-container">
      <Header />
      <div className="account-container">
        <div className="account-responsive">
          <h1 className="account-heading">Account</h1>
          <hr className="account-page-line-separator" />
          <div className="membership-info-container">
            <p className="account-sub-heading">Member ship</p>
            <div className="account-info-sub">
              <p className="account-info">{username}</p>
              <p className="account-secure-info">
                Password: {`${'*'.repeat(password.length)}`}
              </p>
            </div>
          </div>
          <hr className="account-page-line-separator" />
          <div className="membership-info-container">
            <p className="account-sub-heading">Plan details</p>
            <div className="membership-info">
              <p className="account-info">Premium</p>
              <p className="membership-quality">Ultra HD</p>
            </div>
          </div>
          <hr className="account-page-line-separator" />
          <button type="button" onClick={onClickLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Account

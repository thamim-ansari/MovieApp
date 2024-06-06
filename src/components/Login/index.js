import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginErrorShown, setIsLoginErrorShown] = useState('')
  const [loginErrorMsg, setLoginErrorMsg] = useState('')
  const userDetails = {username, password}

  const onChangeUsername = event => setUsername(event.target.value)
  const onChangePassword = event => setPassword(event.target.value)

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    Cookies.set('user_details', JSON.stringify(userDetails), {expires: 1})
    history.replace('/')
  }

  const onSubmitFailure = errorMsg => {
    setIsLoginErrorShown(true)
    setLoginErrorMsg(errorMsg)
  }

  const onClickLogin = async event => {
    event.preventDefault()
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const loginResponse = await fetch(loginApiUrl, options)
    const loginData = await loginResponse.json()
    if (loginResponse.ok === true) {
      onSubmitSuccess(loginData.jwt_token)
    } else {
      onSubmitFailure(loginData.error_msg)
    }
  }
  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-bg-container">
      <div className="login-responsive-container">
        <img
          src="https://res.cloudinary.com/dbu8hb7th/image/upload/v1717071521/midvhqtddq6cvgbllcxr.png"
          alt="login website logo"
          className="login-logo-img"
        />
        <div className="login-container">
          <form className="login-form-container" onSubmit={onClickLogin}>
            <h1 className="login-heading">Login</h1>
            <div className="login-input-container">
              <label htmlFor="username" className="login-label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="login-input"
                placeholder="Enter username"
                value={username}
                onChange={onChangeUsername}
              />
            </div>
            <div className="login-input-container">
              <label htmlFor="password" className="login-label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="login-input"
                placeholder="Enter password"
                value={password}
                onChange={onChangePassword}
              />
              {isLoginErrorShown && (
                <p className="login-error-msg">{loginErrorMsg}</p>
              )}
            </div>
            <button type="submit" className="login-button sign-in-btn">
              Sign in
            </button>
            <button type="submit" className="login-button login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

import React, { useState } from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import logo from '../../images/logo.png';
import { onLinkSelect } from '../../utils/utils'
import { Modal, Spinner } from 'react-bootstrap';
import './Header.scss';
import { environment } from '../../environment.js'
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { connect } from 'react-redux'
import { setToken, setUserInfo, pushNotification } from '../../redux/actions'
import { getJwtPayload } from "../../utils/utils.js";

function Header({ userInfo, setToken, setUserInfo, pushNotification }) {
  const [expanded, setExpanded] = useState(false);
  let onSelect = () => {
    onLinkSelect();
    setExpanded(false)
  }

  return (
    <header className="header_area">
      <div className="container">
        <Navbar collapseOnSelect expand="lg" variant="light" expanded={expanded}>
          <Link to="/" onClick={onSelect}>
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)}>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <ul className="nav navbar-nav menu_nav ml-auto">
              <li className="nav-item">
                <NavLink exact to="/" activeClassName="active" className="nav-link" onClick={onSelect}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/search" activeClassName="active" className="nav-link" onClick={onSelect}>Search</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" activeClassName="active" className="nav-link" onClick={onSelect}>About</NavLink>
              </li>
              <li className="nav-item">
                {(userInfo == null) ?
                  <span className="nav-link" style={{ cursor: 'pointer' }}>
                    <Login setToken={setToken} setUserInfo={setUserInfo} pushNotification={pushNotification} />
                  </span> :
                  <NavDropdown title={userInfo.name} show={true}>
                    <NavLink to="/account/personal-info" activeClassName="active-item" className="nav-link sub-item dropdown-item" onClick={onSelect}>Personal info</NavLink>
                    <NavLink to="/account/my-flights" activeClassName="active-item" className="nav-link sub-item dropdown-item" onClick={onSelect}>My flighs</NavLink>
                    <NavDropdown.Divider />
                    <span className="nav-link sub-item dropdown-item log-out" onClick={() => {
                      setToken(null);
                      setUserInfo(null);
                    }}>Log out</span>
                  </NavDropdown>
                }
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}
const mapStateToProps = ({ userInfo }) => ({ userInfo });
export default connect(mapStateToProps, { setToken, setUserInfo, pushNotification })(Header);

function Login({ setToken, setUserInfo, pushNotification }) {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <>
      <div onClick={() => { setShowSignIn(!showSignIn) }}>Sign in</div>
      <LoginModal show={showSignIn} handleClose={() => setShowSignIn(false)}
        setToken={setToken} setUserInfo={setUserInfo} handleSignUp={() => setShowSignUp(true)} />
      <SignUpModal show={showSignUp} handleClose={() => setShowSignUp(false)} setShow={setShowSignUp}
        onSuccess={() => {
          pushNotification({ header: 'Sign Up', body: 'Sign up successfully. Please sign in with your email and password.' })
        }} />
    </>);
};

function LoginModal({ show, handleClose, setToken, setUserInfo, handleSignUp }) {
  const [signingIn, setSigningIn] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn(e) {
    e.preventDefault();
    if (!signingIn) {
      try {
        setSigningIn(true);
        const loginResponse = await fetch(`${environment.authBaseUrl}/auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: email, password })
        })
        if (!loginResponse.ok) throw new Error(loginResponse.statusText || loginResponse.status)
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        setToken(token);
        const payload = getJwtPayload(token);
        const getUserResponse = await fetch(`${environment.authBaseUrl}/users/${payload.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!getUserResponse.ok) throw new Error(getUserResponse.statusText || loginResponse.status)
        const getUserContent = await getUserResponse.json();
        setUserInfo(getUserContent)
      }
      catch (e) {
        setErrorMessage(e.message);
        setSigningIn(false);
      }
    }
  }

  const signInWithGoogle = e => {
    e.preventDefault();
    const height = 600;
    const width = 600;
    var left = (window.screen.width / 2) - (width / 2);
    var top = (window.screen.height / 2) - (height / 2);
    window.open("https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline&include_granted_scopes=true&response_type=code&state=test_state&redirect_uri=https%3A%2F%2Firedeem.tk%2Fauth%2Fauth%2Fgoogle&client_id=798521678690-6kppnermd79tiaau4t26i580vrelr4n6.apps.googleusercontent.com&flowName=GeneralOAuthFlow",
      "googleOAuth", `height=${height}, width=${width}, top=${top}, left=${left}`);
  }

  let firstInputRef = React.createRef();

  return (
    <Modal show={show} onShow={() => { firstInputRef.current.focus(); }} onHide={() => {
      handleClose();
      setEmail('');
      setPassword('');
      setErrorMessage('');
    }} centered>
      <Modal.Body>
        <Modal.Title>Sign in</Modal.Title>
        <div className={`error-msg ${(errorMessage === "") ? "hide" : ""}`}><BsFillExclamationTriangleFill /> {errorMessage}</div>
        <form>
          <div>Email</div>
          <input className="wide form-control nice-select sign-in-input" type="email" ref={firstInputRef}
            value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleEnter}></input>
          <div>Password</div>
          <input className="wide form-control nice-select sign-in-input" type="password"
            value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleEnter}></input>
          <div className="sign-up"><a onClick={handleSignUp} href="#">Sign up</a></div>
          <ModalButton onClick={signIn}>
            {signingIn ? <Spinner animation="border" variant="primary" size="sm" /> : "Sign in"}
          </ModalButton>
        </form>
        <ModalButton onClick={signInWithGoogle} cssClass="google-btn">
          Sign in with
          <svg alt="Google" className="logo-svg " xmlns="http://www.w3.org/2000/svg" width="80" height="20" viewBox="0 0 86 28">
            <path fill="#4285F4" d="M10.4,21C4.7,21,0,16.2,0,10.5S4.7,0,10.4,0c3.1,0,5.3,1.3,7,2.9l-1.9,2c-1.2-1.2-2.8-2-5-2
            c-4.1,0-7.3,3.4-7.3,7.6s3.2,7.6,7.3,7.6c2.7,0,4.2-1.1,5.1-2.1c0.8-0.8,1.3-2,1.5-3.8h-6.6V9.3h9.3c0.1,0.5,0.2,1.1,0.2,1.8
            c0,2.2-0.5,5-2.4,6.9C15.7,20,13.4,21,10.4,21z"></path>
            <path fill="#EA4335" d="M34.2,14.1c0,3.9-2.9,6.7-6.6,6.7s-6.6-2.8-6.6-6.7s2.9-6.7,6.6-6.7S34.2,10.2,34.2,14.1z M31.4,14.1
            c0-2.5-1.7-4.1-3.7-4.1c-1.9,0-3.7,1.6-3.7,4.1c0,2.4,1.7,4.1,3.7,4.1C29.6,18.2,31.4,16.5,31.4,14.1z"></path>
            <path fill="#FBBC03" d="M48.4,14.1c0,3.9-2.9,6.7-6.6,6.7s-6.6-2.8-6.6-6.7s2.9-6.7,6.6-6.7S48.4,10.2,48.4,14.1z M45.5,14.1
            c0-2.5-1.7-4.1-3.7-4.1c-1.9,0-3.7,1.6-3.7,4.1c0,2.4,1.7,4.1,3.7,4.1C43.8,18.2,45.5,16.5,45.5,14.1z"></path>
            <path fill="#4285F4" d="M61.7,7.8V20c0,5-2.7,7-6.1,7c-3.2,0-5-2.2-5.8-4l2.5-1.1c0.4,1.1,1.5,2.4,3.3,2.4c2.1,0,3.4-1.4,3.4-3.9v-1
            h-0.1c-0.6,0.8-1.8,1.6-3.4,1.6c-3.3,0-6.2-2.9-6.2-6.8s2.9-6.7,6.2-6.7c1.6,0,2.7,0.7,3.4,1.6h0.1V7.8H61.7z M59.2,14.1
            c0-2.4-1.5-4.1-3.5-4.1c-1.9,0-3.5,1.7-3.5,4.1s1.5,4.1,3.5,4.1C57.7,18.2,59.2,16.5,59.2,14.1z"></path>
            <path fill="#34A853" d="M66.4,1.1v19.8h-2.8V1.1H66.4z"></path>
            <path fill="#EA4335" d="M77.7,16.3l2.2,1.6c-0.7,1.1-2.5,3-5.5,3c-3.7,0-6.5-2.9-6.5-6.7c0-4,2.8-6.7,6.2-6.7c3.4,0,5,2.8,5.6,4.3
            l0.3,0.7l-8.8,3.7c0.7,1.4,1.7,2,3.2,2S76.9,17.5,77.7,16.3z M70.8,14l5.8-2.5c-0.4-0.8-1.3-1.5-2.4-1.5C72.7,10,70.7,11.3,70.8,14
            z"></path>
          </svg>
        </ModalButton>
      </Modal.Body>
    </Modal>
  );
};

function SignUpModal({ show, setShow, handleClose, onSuccess }) {
  const [signingUp, setSigningUp] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    if (!signingUp) {
      if (password !== passwordConfirm) {
        setErrorMessage("Passwords don't match.");
        return;
      }
      try {
        setSigningUp(true);
        const loginResponse = await fetch(`${environment.authBaseUrl}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        })
        if (!loginResponse.ok) throw new Error(loginResponse.statusText || loginResponse.status)
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        setToken(token);
        setShow(false);
        onSuccess();
      }
      catch (e) {
        setErrorMessage(e.message);
      }
      finally {
        setSigningUp(false);
      }
    }
  }

  let firstInputRef = React.createRef();
  return (
    <Modal show={show} onShow={() => { firstInputRef.current.focus(); }} onHide={() => {
      handleClose();
      setname('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      setErrorMessage('');
    }} centered>
      <Modal.Body>
        <Modal.Title>Sign up</Modal.Title>
        <div className={`error-msg ${(errorMessage === "") ? "hide" : ""}`}><BsFillExclamationTriangleFill /> {errorMessage}</div>
        <form>
          <div>name</div>
          <input className="wide form-control nice-select sign-in-input" type="text" ref={firstInputRef}
            value={name} onChange={e => setname(e.target.value)} onKeyDown={handleEnter}></input>
          <div>Email</div>
          <input className="wide form-control nice-select sign-in-input" type="email"
            value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleEnter}></input>
          <div>Password</div>
          <input className="wide form-control nice-select sign-in-input" type="password" autocomplete="new-password"
            value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleEnter}></input>
          <div>Confirm</div>
          <input className="wide form-control nice-select sign-in-input" type="password" autocomplete="new-password"
            value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} onKeyDown={handleEnter}></input>
          <ModalButton onClick={signUp}>
            {signingUp ? <Spinner animation="border" variant="primary" size="sm" /> : "Sign up"}
          </ModalButton>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function ModalButton({ cssClass, children, onClick }) {
  return (
    <button className={`theme_btn sign-in-btn stretch ${cssClass}`} onClick={onClick}>
      {children}
    </button>
  );
}

function handleEnter(e) {
  if (e.key !== 'Enter') return;
  const form = e.target.form;
  const index = [...form].indexOf(e.target);
  form.elements[index + 1].focus();
  e.preventDefault();
}
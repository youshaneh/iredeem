import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { environment } from '../../environment.js'
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { connect } from 'react-redux'
import { setToken, setUserInfo, pushNotification } from '../../redux/actions'
import './account.scss';

function PersonalInfo({ userId, token, setUserInfo, pushNotification }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [loading, setLoading] = useState(true);

  function fillInBlanks(userInfo) {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPlatform(userInfo.authType.platform);
    setPassword('');
    setPasswordConfirm('');
  }

  useEffect(() => {
    fetch(`${environment.authBaseUrl}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(function (response) {
        if (!response.ok) throw new Error(response.statusText)
        return response.json();
      })
      .then(function (responseJson) {
        setLoading(false);
        fillInBlanks(responseJson);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, [userId, token]);

  const save = (e) => {
    e.preventDefault();
    if (!saving) {
      if (password !== passwordConfirm) {
        setErrorMessage("Passwords don't match.");
        return;
      }

      setSaving(true);
      fetch(`${environment.authBaseUrl}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
        body: JSON.stringify({ name, email, password })
      })
        .then(function (response) {
          if (!response.ok) throw new Error(response.statusText)
          return response.json();
        })
        .then(function (responseJson) {
          setErrorMessage('');
          fillInBlanks(responseJson);
          setUserInfo(responseJson);
          pushNotification({ header: 'Personal Info', body: 'Update personal info successfully.' })
        })
        .catch(function (err) {
          setErrorMessage(err.message);
        })
        .finally(function () {
          setSaving(false);
        });
    }
  }

  let passwordSection;
  if (platform === 'google') {
    passwordSection = (<div className="oauth-placeholder">
      You are signed in with
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
    </div>);
  }
  else {
    passwordSection = (<>
      <div>Password</div>
      <input className="wide form-control nice-select sign-in-input" type="password" autoComplete="new-password"
        value={password} onChange={e => setPassword(e.target.value)}></input>
      <div>Confirm</div>
      <input className="wide form-control nice-select sign-in-input" type="password" autoComplete="new-password"
        value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}></input>
    </>);
  }

  return (
    <div className="row">
      <div className="col-md-12 align-items-center">
        <div className="about_content ">
          <h2 className="title">Personal Info</h2>
          {loading ? <div className="loading"><Spinner animation="border" variant="primary" /></div> :
            (<>
              <div className={`error-msg ${(errorMessage === "") ? "hide" : ""}`}><BsFillExclamationTriangleFill /> {errorMessage}</div>
              <form>
                <div>Nickname</div>
                <input className="wide form-control nice-select sign-in-input" type="text"
                  value={name} onChange={e => setName(e.target.value)}></input>
                <div>Email</div>
                <input className="wide form-control nice-select sign-in-input" type="email"
                  value={email} onChange={e => setEmail(e.target.value)}></input>
                {passwordSection}
                <div style={{ textAlign: "right" }}>
                  <button className={'theme_btn sign-in-btn stretch'} style={{ width: "30%" }} onClick={save}>
                    {saving ? <Spinner animation="border" variant="primary" size="sm" /> : "Save"}
                  </button>
                </div>
              </form>
            </>)
          }
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = ({ userId, token }) => ({ userId, token });
export default connect(mapStateToProps, { setToken, setUserInfo, pushNotification })(PersonalInfo);
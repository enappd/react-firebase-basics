import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, GithubAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInAnonymously } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";

export default function SocialLogin() {
  const appVerifier = window.recaptchaVerifier;
  const [enableBtn, setEnableBtn] = useState(false);
  const [ phoneNumber, setPhoneNumber ] = useState(); 
  const navigate = useNavigate();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        setEnableBtn(true);
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
      }
    }, auth);
  }, []);

  const navigateWithUserData = (userData) => {
    console.log('data', userData);
    // navigate('/home', {state: userData});
  };

  const googleLogin = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      navigateWithUserData({userData: user, type: 'google'});
      console.log('User', user);
    }).catch((err) => {
      console.log(err);
      alert('Error while google login');
    })
  }

  const facebookLogin = (e) => {
    e.preventDefault();
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      navigateWithUserData({userData: user, type: 'facebook'});
      console.log('User', user);
    }).catch((err) => {
      console.log(err);
      alert('Error while facebook login');
    });
  }

  const githubLogin = (e) => {
    e.preventDefault();
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      navigateWithUserData({userData: user, type: 'github'});
      console.log('User', user);
    }).catch((err) => {
      console.log(err);
      alert('Error while github login');
    });
  }

  const signInUsingPhone = (e) => {
    e.preventDefault();
    console.log(phoneNumber);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      console.log(confirmationResult);
      const code = window.prompt('Enter code', '');
      if (code) {
        confirmationResult.confirm(code).then((result) => {
          const user = result.user;
          console.log(user);
          navigateWithUserData({userData: user, type: 'phone'});
        }).catch((err) => {
          console.log(err);
          alert('Error while github login');
        });
      } else {
        console.log('Enter code')
      }
      // window.confirmationResult = confirmationResult;
      // // ...
    }).catch((err) => {
      console.log(err);
      alert('Error while github login');
    });
  };

  const anonymousLogin = (e) => {
    e.preventDefault();
    signInAnonymously(auth)
    .then(() => {
      console.log('Anonymous login')
      navigateWithUserData({userData: 'Anonymous user', type: 'anonymous'});
    })
    .catch((err) => {
      console.log(err);
      alert('Error while Anonymous login');
    });
  }

  return (
        <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Sign In</h5>
            <form class="form-signin">

              <div class="form-label-group">
                <input  onChange={(text) => setPhoneNumber(text.target.value)} type="tel" id="inputPhone" class="form-control" placeholder="Phone number (+91)"/>
              </div>

              {/* <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                <label class="custom-control-label" for="customCheck1">Remember password?</label>
              </div> */}
              <button disabled={!phoneNumber} onClick={(e) => signInUsingPhone(e)} class="btn mt-2 btn-lg btn-primary btn-block text-uppercase">Login</button>
              <div id="sign-in-button"></div>
              <hr class="my-4"/>
              <button onClick={(e) => googleLogin(e)} class="btn btn-lg btn-google btn-block text-uppercase" ><i class="fab fa-google mr-2"></i> Sign in with Google</button>
              <button onClick={(e) => facebookLogin(e)} class="btn btn-lg btn-facebook btn-block text-uppercase"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
              <button onClick={(e) => githubLogin(e)} class="btn btn-lg btn-facebook btn-block text-uppercase"><i class="fab fa-facebook-f mr-2"></i> Sign in with Github</button>
              <button onClick={(e) => anonymousLogin(e)} class="btn btn-lg btn-facebook btn-block text-uppercase"><i class="fab fa-facebook-f mr-2"></i> Anonymous sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
};
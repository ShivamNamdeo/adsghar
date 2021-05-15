import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../base.js";
import { AuthContext } from "../Auth.js";
    import { GoogleLogout,GoogleLogin } from 'react-google-login';

const Login = ({ history }) => {
  
    const { currentUser } = useContext(AuthContext);



  const handleLogin = useCallback(
    async response => {
      console.log(response.profileObj);

    const { email, name, } = response.profileObj;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email, name);
        history.push("/DashboardScreen");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );


    const responseGoogle = (response) => {
  console.log(response);
}

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
    <div className="login_flex">

           <div className="login_child">

           <form>
      <h1>Log in</h1>
             <GoogleLogin
    clientId={'272071898039-sgiehtnk2a8a73ubpjv05b0b5vkub8ci.apps.googleusercontent.com'}
    onSuccess={handleLogin}
    onFailure={responseGoogle}
  >
   
    <span> Login with Google</span>
  </GoogleLogin>

     </form>
            </div>
      </div>
    </div>
  );
};

export default withRouter(Login);

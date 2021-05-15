import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../base";

    import { GoogleLogout,GoogleLogin } from 'react-google-login';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async response => {

    console.log(response.profileObj);

    const { email, name, imageUrl} = response.profileObj;
    try {
      await  app.auth()
  .createUserWithEmailAndPassword(email,name);

    app.firestore()
      .collection("users")
      .doc(email)
      .set({
        email:email,
        name:name,
        avatar:imageUrl,

      })
  
      history.push("/DashboardScreen");
    } catch (error) {
      alert(error);
    }
  }, [history]);


  const responseGoogle = (response) => {
  console.log(response);
}
  


  return (
    <div>
      <div className="login_flex">

           <div className="login_child">

           <form>
                 <h1>Sign up</h1>
               
               <GoogleLogin
                 clientId={'272071898039-sgiehtnk2a8a73ubpjv05b0b5vkub8ci.apps.googleusercontent.com'}
                 onSuccess={handleSignUp}
                 onFailure={responseGoogle}
                 uxMode={true}
               >
          
                   <span> Signup with Google</span>
                </GoogleLogin>
        
        
            </form>
            </div>
      </div>
    </div>
  );
};

export default withRouter(SignUp);

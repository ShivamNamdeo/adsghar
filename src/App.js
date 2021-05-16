import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./routes/Login";
import SignUp from "./routes//SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import DashboardScreen from "./routes/DashboardScreen";
import HeaderComp from "./routes/comp/HeaderComp";
import FooterComp from "./routes/comp/FooterComp";
import FaqScreen from "./routes/FaqScreen";
import PostNowScreen from "./routes/PostNowScreen";
import BlogScreen from "./routes/blogs/BlogScreen";
import ReadMoreBlogScreen from "./routes/blogs/ReadMoreBlogScreen";
import StoreScreen from "./routes/store/StoreScreen";
import CartScreen from "./routes/cart/CartScreen";
import CheckoutScreen from "./routes/checkout/CheckoutScreen";







import ScrollToTop from "./ScrollToTop";

const App = () => {
  return (
    <AuthProvider>
      <Router>

        <ScrollToTop />
        
        <div className="App">
        <HeaderComp />
           <Route exact path = "/" component={Home} />
          <PrivateRoute exact path="/DashboardScreen" component={DashboardScreen} />

            <Route exact path = "/StoreScreen" component={StoreScreen} />
          
          <Route exact path="/FaqScreen" component={FaqScreen}/>
          <Route exact path="/PostNowScreen" component={PostNowScreen }/>

          <Route exact path="/BlogScreen" component={BlogScreen }/>
          <Route exact path="/ReadMoreBlogScreen/:blog_id" component={ReadMoreBlogScreen }/>
           <PrivateRoute exact path="/CartScreen" component={CartScreen }/>
           <PrivateRoute exact path="/CheckoutScreen" component={CheckoutScreen }/>
          
          
          
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <FooterComp />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

import React,{useEffect,useState,useContext} from 'react';
import GetUserPicComp from "./../comp/GetUserPicComp";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import firebase from './../../base';
import Loading  from "./../comp/Loading";
import { AuthContext } from "./../../Auth";
import BlogScreenComp from "../blogs/comp/BlogScreenComp";
import "../blogs/blogscreen.css";
import MostLikedBlogComp from "../blogs/comp/MostLikedBlogComp";

function GetBlogData({blog_id}) {



	 const {currentUser} = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [most_liked_list, set_most_liked_list] = useState([]);

	const [blog_data, set_blog_data] = useState({});



	useEffect(() => {

		

	const subscriber = firebase.firestore()
      .collection("blogs")
      .doc(blog_id)
      .onSnapshot(doc => {
        
        set_blog_data({...doc.data(),key:doc.id});
  
        setLoading(false);
              //
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();



	}, []);


console.log(blog_data);

if(!blog_data || blog_data == null){
	return(
		<p>Blog Not Found</p>
	)
}

if(loading){
	return(
		<Loading />
	)
}
	



	return (

		<div className="blog_contain">
			
			<p>{blog_data.title}</p>

			<Link className="column" to={`/ReadMoreBlogScreen/${blog_data.key}`} >Read More</Link>
		

		</div>
	)

}

export default GetBlogData;
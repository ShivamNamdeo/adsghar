import React,{useEffect,useState,useContext} from 'react'
import GetUserPicComp from "./../comp/GetUserPicComp";
import { makeStyles } from '@material-ui/core/styles';

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
import BlogScreenComp from "./comp/BlogScreenComp";
import "./blogscreen.css";
import MostLikedBlogComp from "./comp/MostLikedBlogComp";
import CommentComp from "./comp/CommentComp";


function ReadMoreBlogScreen() {

	 let { blog_id } = useParams();

	const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius:8,
  },

  margin:{
    margin:16,
    width:"90%",
  },


  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

	 const classes = useStyles();
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



	}, [blog_id]);


if(loading){
	return(
		<Loading />
	)
}
	

	return (

		<div className="bg_color">
		<div className="blog_screen">

			<div className="center_blog" className={classes.root}>
	
				 	<BlogScreenComp blog_data={blog_data} blog_id={blog_id}/>
	
				 	<CommentComp blog_id={blog_id} author={blog_data.blog_author}/>
			</div>

			<div className="auth_user">
					<p>Posted by</p>
					<GetUserPicComp img={true} name={true} contact={true} address={true} user_email={blog_data.blog_author}/>

			</div>
		</div>

		</div>
	)

}

export default ReadMoreBlogScreen
import React,{useEffect,useState,useContext} from 'react';
import GetUserPicComp from "../../comp/GetUserPicComp";
import moment from "moment";
import "./../blogscreen.css";
import MessageIcon from '@material-ui/icons/Message';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Chip from '@material-ui/core/Chip';
import firebase from '../../../base';
import Loading  from "../../comp/Loading";
import { AuthContext } from "../../../Auth";
import {

  Link,
} from "react-router-dom";

function BlogScreenComp({blog_data,blog_id}) {

const {currentUser} = useContext(AuthContext);

const [loading, setLoading] = useState(true);

const handleLike = (arr,key,author)=>{


	const liked_id = key+currentUser.email;

	arr.push(currentUser.email) 

	firebase.firestore()
	.collection("blogs")
	.doc(key)
	.set({
		liked_user:arr,
	},{merge:true});




	firebase.firestore()
	.collection("users")
	.doc(author)
	.collection("acts")
	.doc(liked_id)
	.set({
		user_email:currentUser.email,
		act_text:"Liked a blog",
		blog_id:key,
		blog_liked:true,
		timestamp:Date.now(),
	},{merge:true});



	firebase.firestore()
	.collection("users")
	.doc(currentUser.email)
	.collection("acts")
	.doc(liked_id)
	.set({
		user_email:currentUser.email,
		act_text:"Liked a blog",
		blog_id:key,
		blog_liked:true,
		timestamp:Date.now(),
	},{merge:true});




}

const handleUnLike = (arr,key,author)=>{

	const liked_id = key+currentUser.email;
	arr = arr.filter(user => user !== currentUser.email); 

	firebase.firestore()
	.collection("blogs")
	.doc(key)
	.set({
		liked_user:arr,
	},{merge:true});


	firebase.firestore()
	.collection("users")
	.doc(author)
	.collection("acts")
	.doc(liked_id)
	.delete();


		firebase.firestore()
	.collection("users")
	.doc(currentUser.email)
	.collection("acts")
	.doc(liked_id)
	.delete();


}



	return (
		<div className="blog_comp">
			<div className="blog_user">

				<div className="align_left">
					<GetUserPicComp img={true} user_email={blog_data.blog_author}/>
					<GetUserPicComp name={true} user_email={blog_data.blog_author}/>
				</div>
				
				<p>{moment(blog_data.timestamp).format("LLL")}</p>

			</div>

			<div className="blog_content">
				<img src={blog_data.img} />
				<h1>{blog_data.title}</h1>
				<h2>{blog_data.desc}</h2>

			</div>

			{
				currentUser ?
				<div className="blog_bottom">

							{
								blog_data.liked_user.includes(currentUser.email)?
								<Chip label= {blog_data.liked_user.length+" Likes"} icon={<FavoriteIcon />} onClick={()=>handleUnLike(blog_data.liked_user,blog_data.key,blog_data.blog_author)}/>
								:
								<Chip label= {blog_data.liked_user.length+" Likes"} icon={<FavoriteBorderIcon />} onClick={()=>handleLike(blog_data.liked_user,blog_data.key,blog_data.blog_author)}/>
							}

							
				</div>

				:

				<div className="blog_bottom">

				<Chip label= {blog_data.liked_user.length+" Likes"} icon={<FavoriteIcon /> } />
				</div>
			}
				
		</div>
	)
}

export default BlogScreenComp
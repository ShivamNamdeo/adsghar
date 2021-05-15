import React,{useEffect,useState,useContext} from 'react';
import firebase from '../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";
import "./blogscreen.css";
import BlogScreenComp from "./comp/BlogScreenComp";
import MostLikedBlogComp from "./comp/MostLikedBlogComp";





function BlogScreen() {

	const {currentUser} = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [blog_list, set_blog_list] = useState([]);
	const [most_liked_list, set_most_liked_list] = useState([]);

useEffect(() => {
  
    const subscriber = firebase.firestore()

      .collection("blogs")
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const blog_list_ = [];
        const most_liked_list_ = [];
  
        querySnapshot.forEach(doc => {

        	if(doc.data().liked_user.length >= 1){
        			most_liked_list_.push({
          		  ...doc.data(),
          		  key: doc.id,
          		});
        	}

        	
        	blog_list_.push({
          	 		 ...doc.data(),
          	 		 key: doc.id,
          	});

          	
        });
    
        set_blog_list(blog_list_);
        set_most_liked_list(most_liked_list_);
        
        setLoading(false);
        
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, []); 


if(loading){
	return(
		<Loading />
	)
}
	

	return (

		<div className="bg_color">

		<div className="blog_screen">

			<div className="main_blog_list">
			<h1>Latest Articles</h1>
			 {blog_list.map((item,index) => (


				 	<div key={item.key} >

				 		<MostLikedBlogComp blog_data={item} blog_id={item.key}/>

					</div>


            ))}

			</div>

			<div className="blog_most_liked">
			<h1>Most Popular Articles</h1>
			 {most_liked_list.map((item,index) => (


				 	<div key={item.key} >

				 		<MostLikedBlogComp blog_data={item} blog_id={item.key}/>
					</div>


            ))}

			</div>


		</div>
		</div>
	)
}

export default BlogScreen
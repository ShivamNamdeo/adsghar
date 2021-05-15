import React,{useEffect,useState,useContext} from 'react'
import "../Style.css";

import moment from "moment";

import GetUserPicComp from "../comp/GetUserPicComp";


import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';

import CommentComp from "../blogs/comp/CommentComp";

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import MessageIcon from '@material-ui/icons/Message';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import LabelIcon from '@material-ui/icons/Label';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CardMedia from '@material-ui/core/CardMedia';
import firebase from './../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";
import EditIcon from '@material-ui/icons/Edit';
import "./DashComp.css";

import "../blogs/blogscreen.css";
import "../Style.css";




const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    backgroundColor: theme.palette.background.paper,
    borderRadius:8,
    marginTop:16,
    margin:16,
  },

    formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  margin:{
    margin:16,
    width:"90%",
  },


  margin_button:{
  	margin:16,
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
}));






function DashBlogComp() {

const {currentUser} = useContext(AuthContext);
  const classes = useStyles();

  const [filter_text, set_filter_text] = useState("");

  const [category_list, set_category_list] = useState([]);

  const handleChange = (event) => {
    set_filter_text(event.target.value);
  };


const [loading, setLoading] = useState(true);

const [title, set_title] = useState("");
const [desc, set_desc] = useState("");
const [blog_id, set_blog_id] = useState("");
const [img, set_img] = useState("http://adsghar.in/wp-content/uploads/2017/12/product-w-jeans4-300x300.jpg")
const [open, setOpen] = React.useState(false);
const [blogs_list, set_blogs_list] = useState([]);
const [search, set_search] = useState("");


	  useEffect(() => {

	  	if(blog_id){
		    const subscriber = firebase.firestore()
		    .collection("blogs")
		    .doc(blog_id)
		    .onSnapshot(doc => {
		    	
		    	set_title(doc.data().title);
		    	set_img(doc.data().img);
		    	set_desc(doc.data().desc);
		      	
		    });
  			// Unsubscribe from schlorships when no longer in use
  			return () => subscriber();	
	  	}

		 
	}, [blog_id]);


  useEffect(() => {


  	 	
  
    const subscriber = firebase.firestore()
	 .collection("blogs")
	 .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const blogs_list_ = [];
  
        querySnapshot.forEach(doc => {

        	if(doc.data().blog_author == currentUser.email){
        		 if(doc.data().title.toLowerCase().includes(filter_text.toLowerCase()) &&doc.data().title.toLowerCase().includes(search.toLowerCase())){
          			blogs_list_.push({
          			  ...doc.data(),
          			  key: doc.id,
          			});
          		}
        	}
          
         
          		
  
        });
  
        
  
        set_blogs_list(blogs_list_);
        setLoading(false);
        
              //
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [search,filter_text]); 


  useEffect(() => {


  	 	
  
    const subscriber = firebase.firestore()
	 .collection("category")
	 .orderBy('name','desc')
      .onSnapshot(querySnapshot => {
        
        const category_list_ = [];
  
        querySnapshot.forEach(doc => {

        	
          			category_list_.push({
          			  ...doc.data(),
          			  key: doc.id,
          			});
      
         
          		
  
        });
  
        
  
        set_category_list(category_list_);
        setLoading(false);
        
              //
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, []); 


  const handleblogAdd = () => {
  	set_title("");
  	set_desc("");
  	set_blog_id("");
    setOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



const set_desc_fun = (e)=>{
	set_desc(e.target.value);
}

const set_title_fun = (e)=>{
	set_title(e.target.value);
}


const set_search_fun = (e)=>{
	set_search(e.target.value);
}

const handleForm = ()=>{


	const blog_id = Date.now()+"blog";


	firebase.firestore()
	.collection("blogs")
	.doc(blog_id)
	.set({
		title,
		desc,
		img,
		liked_user:[],
		blog_author:currentUser.email,
		timestamp:Date.now(),
	},{merge:true});



	firebase.firestore().collection("users")
	.doc(currentUser.email)
	.collection("acts")
	.doc(blog_id)
	.set({
		blog_posted:true,
		user_email:currentUser.email,
		act_text:"Posted a blog ",
		blog_id:blog_id,
		timestamp:Date.now(),
	},{merge:true});

	alert("Blog Posted");

	clear_blog()
}

const handleBlogEdit = ()=>{


	firebase.firestore()
	.collection("blogs")
	.doc(blog_id)
	.set({
		title,
		desc,
		img,
		timestamp:Date.now(),
	},{merge:true});


	clear_blog();
	alert("Blog Edited")
	
}


const clear_blog=()=>{
	set_title("");
	set_desc("");
	set_blog_id("");
	set_img("");
}


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


const confirm_delete=(e) =>{
  

	clear_blog();

  var txt;

  if (window.confirm("Are you sure to delete your blog")) {
    txt = "You pressed OK!";
    firebase.firestore()
	.collection("blogs")
	.doc(e)
	.delete()

	alert("Blog Deleted");
  } else {
    txt = "You pressed Cancel!";
  }

  console.log(txt);

}


const edit_blog = (key)=>{

	set_blog_id(key);
}

const ClearFilter = ()=>{
	set_filter_text("");
}

if(loading && !blogs_list){
	return(
		<Loading />
	)
}
	



	return (
		<div className="dash_comp">

			

			<div className="comp_heading">
								<h1>Blogs</h1>
				
			</div>
					

					<div className="column_button">

				         	


				          <TextField
					            id="name"
				            label="Enter Your Title"
				            type="email"
								variant="outlined"
          						size="small"
				      		defaultValue={title}
				      		  className={classes.margin}
				      		onChange={set_title_fun}
				      		value={title}
				      		
				      		
				          />
				          <TextField
				           id="outlined-textarea"
          					label="Enter Your Description"
          					multiline
				  			variant="outlined"
          					size="small"
          					value={desc}
          					className={classes.margin}
				      		onChange={set_desc_fun}
				           />

				           <img src={img} alt="" />
				   
			
		
   			 		</div>

   			 		<Button variant="contained" color="primary" className={classes.margin_button} onClick={blog_id ?handleBlogEdit: handleForm}>	 
   			 			POST BLOG
   			 		</Button>

   			 		{
   			 			blog_id?
   			 			<Button variant="contained" color="primary" className={classes.margin_button} onClick={clear_blog}>	 
   			 			Clear
   			 			</Button>
   			 			:
   			 			<div>
   			 			</div>
   			 		}
   			 		

   			 		


		
			<div className="search_product">
				<FormControl className={classes.formControl} >
            <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
           <Select
           className={classes.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          

          value={filter_text}
          onChange={handleChange}
        >	
         {category_list.map((item,index) => (
          	<MenuItem value={item.name}>{item.name}</MenuItem>

          ))}
         
        </Select>
        	{
        		filter_text?
        			<Button  color="primary"  onClick={ClearFilter}>	 
   			 			<ClearIcon />
   					</Button>
   				:

   					<div/>
        	
        	}
        	
        </FormControl>

				<TextField id="standard-read-only-input" size="small" variant="outlined" defaultValue={search} onChange={set_search_fun}
				
				
				
				 label="Search Blog"  InputProps={{   readOnly: false, }}/>

			</div>

			<div className="blog_list">

			 {blogs_list.map((item,index) => (


				 	<div key={item.key} >

        			  <div className="dash_blog">

					<div className="blog_head">
						<div className="blog_user">
							<GetUserPicComp img={true} user_email={item.blog_author}/>
							<h3>{moment(item.timestamp).format("LLL")}</h3>
						</div>


						<div>
						<IconButton onClick={()=>edit_blog(item.key)} color="default">
							<EditIcon />
						</IconButton>

						 <IconButton onClick={()=>confirm_delete(item.key)} color="default">
				            <DeleteIcon />
				          </IconButton>

				          </div>

					</div>
					<img className="blog_image" src={item.img}  alt=""/>
					

					<h1  >{item.title}</h1>
            		<h2 >{item.desc}</h2>

            			<div className="blog_bottom">
							{
								item.liked_user.includes(currentUser.email)?
								<Chip label= {item.liked_user.length+" Likes"} icon={<FavoriteIcon />} onClick={()=>handleUnLike(item.liked_user,item.key,item.blog_author)}/>
								:
								<Chip label= {item.liked_user.length+" Likes"} icon={<FavoriteBorderIcon />} onClick={()=>handleLike(item.liked_user,item.key,item.blog_author)}/>
							}

							
						</div>
            		

						<CommentComp blog_id={item.key}/>
					
				</div>
			
      			
					</div>

             	))}

				
			
			
				

			</div>

			
		</div>
	)
}

export default DashBlogComp
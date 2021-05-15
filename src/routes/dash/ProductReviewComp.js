import React,{useEffect,useState,useContext} from 'react'
import GetUserPicComp from "../comp/GetUserPicComp";

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import CommentIcon from '@material-ui/icons/Comment';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircle from '@material-ui/icons/AccountCircle';
import moment from "moment";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import firebase from '../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "../../Auth";






import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';






import "../blogs/blogscreen.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop:5,
    borderRadius:8,

  },

  margin:{
    margin:16,

    width:"90%",
  },

   rating: {

  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ProductReviewComp({product_id,vendor}) {



  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const [open, setOpen] = React.useState(false);

   const {currentUser} = useContext(AuthContext);

   const [review_id, set_review_id] = useState("");


   const [avg_review, set_avg_review] = useState();

   const [rating, set_rating] = useState();

   const [review_text, set_review_text] = useState("");


    const [loading, setLoading] = useState(true);
  const [review_list, set_review_list] = useState([]);

  const [review_data,set_review_data] = useState({});




  useEffect(() => {

 if(review_id)   
    {
      const subscriber = firebase.firestore()
          .collection("products")
          .doc(product_id)
          .collection("reviews")
          .doc(review_id)
          .onSnapshot(doc => {
            
            set_review_text(doc.data().review_text);
      
            setLoading(false);
                  //
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }


  }, [review_id]);













useEffect(() => {
  
    const subscriber = firebase.firestore()

      .collection("products")
      .doc(product_id)
      .collection("reviews")
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        

        var sum = 0;
        const review_list_ = [];
  
        querySnapshot.forEach(doc => {


          
          review_list_.push({
                 ...doc.data(),
                 key: doc.id,
            });


          sum = sum + doc.data().rating;
            
        });
    
        set_review_list(review_list_);

        set_avg_review(sum/review_list_.length);
        
        setLoading(false);
        
      });
  
    // Unsubscribe from products when no longer in use
    return () => subscriber();
  }, [review_id,review_list]); 




const add_review =()=> {

    const temp_id = review_id ? review_id : Date.now()+"review";
    


  firebase.firestore()
  .collection("products")
  .doc(product_id)
  .collection("reviews")
  .doc(temp_id)
  .set({
    review_text,
    user_email:currentUser.email,
    timestamp:Date.now(),
    rating,
  },{merge:true})


  act_review_to_both(temp_id,vendor);

  set_review_text("");
   set_review_id("");
  alert(review_id ? "review Edited" : "review Posted");


}

const delete_review = (key)=>{
  

  set_clear();

  if(window.confirm("Are your sure to delete your review")){
     firebase.firestore()
  .collection("products")
  .doc(product_id)
  .collection("reviews")
  .doc(key)
  .delete();

  firebase.firestore()
  .collection("users")
  .doc(currentUser.email)
  .collection("acts")
  .doc(key)
  .delete()


    firebase.firestore()
  .collection("users")
  .doc(vendor)
  .collection("acts")
  .doc(key)
  .delete()







  alert("review Deleted");
  }

}

const edit_review =(key)=>{

  console.log(key)
  set_review_id(key);

}


const act_review_to_both=(key,vendor)=>{

  firebase.firestore()
  .collection("users")
  .doc(currentUser.email)
  .collection("acts")
  .doc(key)
  .set({
      act_text:"You reviewed On Product",
      product_id,
      timestamp:Date.now(),
      user_email:currentUser.email,
      review_product:true,
  },{merge:true});


   firebase.firestore()
  .collection("users")
  .doc(vendor)
  .collection("acts")
  .doc(key)
  .set({
      act_text:"reviewed On Product",
      product_id,
      timestamp:Date.now(),
      user_email:currentUser.email,
      review_product:true,
  },{merge:true});

}


const set_clear = ()=>{
  set_review_text("");

  set_review_id("");
}

const set_review_text_fun = (e)=>{
  set_review_text(e.target.value);
}


if(loading){
  return(
    <Loading />
  )
}
  






  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
         {
                currentUser?
                  <Avatar>{currentUser.email.substring(0,1)}</Avatar>
                  
                
                :
                 <AccountCircle  />
              }
             
        </ListItemIcon>
        <ListItemText primary={review_list.length +" reviews"} />

             <Rating name="half-rating-read" value={avg_review} precision={0.5} readOnly />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
          


      <div className="comment_button">
      <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Add Your review Here"
        value={review_text}
        onChange={set_review_text_fun}
        variant="outlined"
        size="small"
        multiline
        

      />

      <div className="row_button">
                <div className={classes.root}>
        <Rating
          name="hover-feedback"
          value={rating}
          precision={0.5}
          onChange={(event, newValue) => {
            set_rating(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
      </div>
      </div>

      <div className="row_button">

        <Button color="primary" variant="contained" onClick={()=>currentUser && rating && review_text? add_review() :alert("Fill All Fields To Add Your Review")}>
        { review_id ? " Confirm Edit" :" Post review"}
        </Button>

        {
          review_id &&  

           <Button color="primary" variant="contained" onClick={()=> set_clear()}>
                Cancel
            </Button>
        }

        </div>  


      </div>


      <div className="review_list">
           {review_list.map((item,index) => (


                     <div key={item.key} className="review_box">
                        <div className="review_header">
                            <div className="review_user">
                               <GetUserPicComp img={true} user_email={item.user_email}/>
                               <GetUserPicComp name={true} user_email={item.user_email}/>
                             </div>

                             <div className="row_commment">
                                 <p>{moment(item.timestamp).format("LLL")}</p>
                                
                                {
                                 ( currentUser && (currentUser.email == item.user_email) ) ?
                                    <div>
                                   <IconButton onClick={()=>edit_review(item.key)}>
                                      <EditIcon />
                                  </IconButton>
                                 <IconButton onClick={()=>delete_review(item.key)}>
                                  <DeleteIcon />
                                 </IconButton>

                                 </div>

                                 :

                                 <div/>
                                }
                                

                             </div>
                        </div>
                    
                          <Rating name="half-rating-read" value={item.rating} precision={0.5} readOnly /> <p >{item.review_text}</p>
                     </div>


            ))}


      </div>

      </Collapse>
    </List>
  );
}

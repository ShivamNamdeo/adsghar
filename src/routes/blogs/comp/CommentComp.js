import React,{useEffect,useState,useContext} from 'react'
import GetUserPicComp from "../../comp/GetUserPicComp";

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

import firebase from '../../../base';
import Loading  from "../../comp/Loading";
import { AuthContext } from "../../../Auth";
import "../blogscreen.css";

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


  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function CommentComp({blog_id,author}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

   const {currentUser} = useContext(AuthContext);

   const [comment_id, set_comment_id] = useState("");


   const [comment_text, set_comment_text] = useState("");


    const [loading, setLoading] = useState(true);
  const [comment_list, set_comment_list] = useState([]);

  const [comment_data,set_comment_data] = useState({});




  useEffect(() => {

 if(comment_id)   
    {
      const subscriber = firebase.firestore()
          .collection("blogs")
          .doc(blog_id)
          .collection("comments")
          .doc(comment_id)
          .onSnapshot(doc => {
            
            set_comment_text(doc.data().comment_text);
      
            setLoading(false);
                  //
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }


  }, [comment_id]);













useEffect(() => {
  
    const subscriber = firebase.firestore()

      .collection("blogs")
      .doc(blog_id)
      .collection("comments")
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const comment_list_ = [];
  
        querySnapshot.forEach(doc => {


          
          comment_list_.push({
                 ...doc.data(),
                 key: doc.id,
            });

            
        });
    
        set_comment_list(comment_list_);
        
        setLoading(false);
        
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [comment_id]); 




const add_comment =()=> {

    const temp_id = comment_id ? comment_id : Date.now()+"comment";
    


  firebase.firestore()
  .collection("blogs")
  .doc(blog_id)
  .collection("comments")
  .doc(temp_id)
  .set({
    comment_text,
    user_email:currentUser.email,
    timestamp:Date.now(),
  },{merge:true})


  act_comment_to_both(temp_id,author);

  set_comment_text("");
   set_comment_id("");
  alert(comment_id ? "Comment Edited" : "Comment Posted");


}

const delete_comment = (key)=>{
  
  set_clear()

  if(window.confirm("Are your sure to delete your comment")){
     firebase.firestore()
  .collection("blogs")
  .doc(blog_id)
  .collection("comments")
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
  .doc(author)
  .collection("acts")
  .doc(key)
  .delete()







  alert("Comment Deleted");
  }

}

const edit_comment =(key)=>{

  console.log(key)
  set_comment_id(key);

}


const act_comment_to_both=(key,author)=>{

  firebase.firestore()
  .collection("users")
  .doc(currentUser.email)
  .collection("acts")
  .doc(key)
  .set({
      act_text:"You Commented On Blog",
      blog_id,
      timestamp:Date.now(),
      user_email:currentUser.email,
      comment:true,
  },{merge:true});


   firebase.firestore()
  .collection("users")
  .doc(author)
  .collection("acts")
  .doc(key)
  .set({
      act_text:"Commented On Blog",
      blog_id,
      timestamp:Date.now(),
      user_email:currentUser.email,
      comment:true,
  },{merge:true});

}


const set_clear = ()=>{
  set_comment_text("");
  set_comment_id("");
}

const set_comment_text_fun = (e)=>{
  set_comment_text(e.target.value);
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
        <ListItemText primary={comment_list.length +" Comments"} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
          


      <div className="comment_button">
      <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="Add Your Comment Here"
        value={comment_text}
        onChange={set_comment_text_fun}
        size="small"
        variant="outlined"
        multiline
        
        

      />

      <div className="row_button">

        <Button color="primary" variant="contained" onClick={()=>currentUser && comment_text? add_comment() :alert("Sign In / Enter Fields To Add Your Comment")}>
        { comment_id ? " Confirm Edit" :" Post Comment"}
        </Button>

        {
          comment_id &&  

           <Button color="primary" variant="contained" onClick={()=> set_clear()}>
                Cancel
            </Button>
        }

        </div>  


      </div>


      <div className="comment_list">
           {comment_list.map((item,index) => (


                     <div key={item.key} className="comment_box">
                        <div className="comment_header">
                            <div className="comment_user">
                               <GetUserPicComp img={true} user_email={item.user_email}/>
                               <GetUserPicComp name={true} user_email={item.user_email}/>
                             </div>

                             <div className="row_commment">
                                 <p>{moment(item.timestamp).format("LLL")}</p>
                                
                                {
                                 ( currentUser && (currentUser.email == item.user_email) ) ?
                                    <div>
                                   <IconButton onClick={()=>edit_comment(item.key)}>
                                      <EditIcon />
                                  </IconButton>
                                 <IconButton onClick={()=>delete_comment(item.key)}>
                                  <DeleteIcon />
                                 </IconButton>

                                 </div>

                                 :

                                 <div/>
                                }
                                

                             </div>
                        </div>
                            <p >{item.comment_text}</p>
                     </div>


            ))}


      </div>

      </Collapse>
    </List>
  );
}

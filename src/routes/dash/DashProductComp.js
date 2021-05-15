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
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircle from '@material-ui/icons/AccountCircle';
import moment from "moment";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import firebase from '../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "../../Auth";
import "../blogs/blogscreen.css";
import "../Style.css";
import ProductReviewComp from "./ProductReviewComp";

import ReactSelect from 'react-select';


import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    backgroundColor: theme.palette.background.paper,
    borderRadius:8,
    marginTop:16,
    margin:16,
  },

  margin:{
    margin:16,
    width:"90%",
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

export default function DashProductComp() {



  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


   const {currentUser} = useContext(AuthContext);

   const [product_id, set_product_id] = useState("");
      const [product_price, set_product_price] = useState("");


   const [img, set_img] = useState("http://adsghar.in/wp-content/uploads/2017/12/product-w-jeans4-300x300.jpg");


    const [loading, setLoading] = useState(true);
  const [product_list, set_product_list] = useState([]);

  const [product_title,set_product_title] = useState("");
  const [in_stock, set_in_stock] = useState(true)


  const [tag_text, set_tag_text] = useState("");
const [tag_list, set_tag_list] = useState([]);
const [category_list, set_category_list] = useState([]);

  const [search, set_search] = useState("");
  const [filter_text, set_filter_text] = useState(false);

  const handleChange = (event) => {
    set_filter_text(event.target.value);
  };


  const handleChangeTag = (e)=>{
  	set_tag_text(e.target.value);
  }





  useEffect(() => {

 if(product_id)   
    {
      const subscriber = firebase.firestore()
          .collection("products")
          .doc(product_id)
          .onSnapshot(doc => {
            
            set_product_title(doc.data().product_title);
            set_img(doc.data().img);
            set_tag_list(doc.data().tag_list);
            set_product_price(doc.data().product_price);

            setLoading(false);
                  //
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }


  }, [product_id]);



useEffect(() => {
    const subscriber = firebase.firestore()
      .collection("category")
      .orderBy('name','desc')
      .onSnapshot(querySnapshot => {
        
        const category_list_ = [];
  
        querySnapshot.forEach(doc => {

            category_list_.push(doc.data());          
         
        });
    
        set_category_list(category_list_);
        
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, []); 






useEffect(() => {
  
    const subscriber = firebase.firestore()

      .collection("products")
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const product_list_ = [];
  
        querySnapshot.forEach(doc => {

          if(currentUser.email == doc.data().user_email){

              if(tag_fun(doc.data().tag_list) && (doc.data().public == filter_text) && doc.data().product_title.toLowerCase().includes(search.toLowerCase())){
              

               product_list_.push({
                 ...doc.data(),
                 key: doc.id,
             });

           }
          }
          
         

            
        });
    
        set_product_list(product_list_);
        
        setLoading(false);
        
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [search,filter_text,tag_text]); 


const tag_fun= (arr)=>{
	if(tag_text){
		return (arr.includes(tag_text))
	}else{
		return true;
	}

}

const add_product =()=> {


  try{


    const temp_id = product_id ? product_id : Date.now()+"";
    
    const li_temp = [];

    for (var i = 0; i < tag_list.length; i++) {
    	li_temp.push(tag_list[i].value);
    }


  firebase.firestore()
  .collection("products")
  .doc(temp_id)
  .set({
    product_title,
    public:true,
    img,
    user_email:currentUser.email,
    timestamp:Date.now(),
    tag_list:li_temp,
    product_price,
    in_stock,
  },{merge:true})


  act_product(temp_id,currentUser.email);

  set_product_title("");
   set_product_id("");
  alert(product_id ? "product Edited" : "product Posted");

}catch(error){


    if(!tag_list){
      alert("Please enter valid tags to your product")
    }

    if(error.code == "invalid-argument"){
      alert("Please Check Your All Fields");
    }else{
      alert(error);
    }
    
}




}

const delete_product = (key,title)=>{

	set_clear();
  
  if(window.confirm("Are your sure to delete your product")){
     firebase.firestore()
  .collection("products")
  .doc(key)
  .delete();


    firebase.firestore()
  .collection("users")
  .doc(currentUser.email)
  .collection("acts")
  .add({
      act_text:"You deleted a product - "+title,
      product:true,
      timestamp:Date.now(),
      user_email:currentUser.email,

      
  },{merge:true});


  alert("product Deleted");
  }

}

const edit_product =(key)=>{

  set_product_id(key);

}


const act_product=(key,author)=>{

  firebase.firestore()
  .collection("users")
  .doc(currentUser.email)
  .collection("acts")
  .doc(key)
  .set({
      act_text: product_id ? "You edited a product "+ product_title : "You added a product "+ product_title ,
      product:true,
      timestamp:Date.now(),
      user_email:currentUser.email,
      
      
  },{merge:true});




}


const set_clear = ()=>{
  set_product_title("");
  set_product_id("");
  set_img("");
  set_tag_list([]);
  set_tag_text("");
}

const set_product_title_fun = (e)=>{
  set_product_title(e.target.value);
}

const set_product_search = (e)=>{
  set_search(e.target.value);
}


const set_in_stock_fun = (e)=>{
	set_in_stock(e.target.checked);
}




if(loading && !product_list){


  return(
    <Loading />
  )
}
  






  const handleClick = () => {
    setOpen(!open);
  };

  return (
    
          <div className="dash_comp">
          <div className="comp_heading">
          	<h1>Product List</h1>
          	</div>

      <div className="product_button">

            <TextField
          required
          autoFocus
          
          className={classes.margin}
          value={product_title} onChange={set_product_title_fun}
          id="outlined-required"
          label="Add Your product Here"
          variant="outlined"
          size="small"
       />
             <TextField
          required
          className={classes.margin}
          value={product_title} onChange={set_product_title_fun}
          id="outlined-required"
          label="Add Your product Here"
          variant="outlined"
          size="small"
       />
             <TextField
          required
          className={classes.margin}
          value={product_title} onChange={set_product_title_fun}
          id="outlined-required"
          label="Add Your product Here"
          variant="outlined"
          size="small"
       />
             <TextField
          required
          className={classes.margin}
          value={product_title} onChange={set_product_title_fun}
          id="outlined-required"
          label="Add Your product Here"
          variant="outlined"
          size="small"
       />
             <TextField
          required
          className={classes.margin}
          value={product_price} onChange={(e)=>set_product_price(e.target.value)}
          id="outlined-required"
          label="Product Price"
          variant="outlined"
          size="small"
       />



       

              <div className="react_select">


     	 	

             <ReactSelect
             	placeholder="Select Tag For This Product"
      		  	options={category_list}
      		  	isMulti
  				onChange={opt => set_tag_list(opt)}
      		/>

      </div>
       <div className="react_select">

       <FormControlLabel
          control={<Switch
        checked={in_stock}
        onChange={set_in_stock_fun}
        name="checkedA"
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />}
          label={in_stock ? <h4 style={{color:"green"}}>In Stock</h4> :<h4 style={{color:"red"}}>Not In Stock</h4>}
        />
      
      </div>

      </div>


      <div className="column_button">
         <img src={img} alt=""/>

        </div>
       <div className="product_add_button">

        <Button color="primary" variant="contained" onClick={()=>product_title? add_product() :alert("Enter Fields To Add Your product")}>
        { product_id ? " Confirm Edit" :" Add product"}
        </Button>

        {
          product_id &&  

           <Button color="primary" variant="contained" onClick={()=> set_clear()}>
                Cancel
            </Button>
        }

        </div>  





        <div className="search_product">
           

           <div>
            <FormControl className={classes.formControl} >
            <InputLabel id="demo-simple-select-label">FILTER BY</InputLabel>
           <Select
           className={classes.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          

          value={filter_text}
          onChange={handleChange}
        >
          <MenuItem value={true}>Listed </MenuItem>
          <MenuItem value={false}>Not Listed </MenuItem>
        </Select>
        </FormControl>


        <FormControl className={classes.formControl} >
            <InputLabel id="demo-simple-select-label">TAG</InputLabel>
           <Select
           className={classes.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tag_text}
          onChange={handleChangeTag}
        >

        		{category_list.map((item,index) => (
        			<MenuItem value={item.name} >{item.name}</MenuItem>
        		))}
         
          


        </Select>
        </FormControl>

        </div>





         <TextField
               value={search} 
               onChange={set_product_search}
               label="Search Product"
               variant="outlined"
               size="small"
            />



  

        </div>


        <div className="search_product">
        	{
        		( tag_text) ?
        		<div>
        	 <Button color="primary" variant="outlined" onClick={set_clear}>
       			 Clear Filter
        	
       		</Button>

       		</div>
       		:
       		<div>
       		</div>
       		}
        </div>	

        <div className="search_product">
        	<p>{product_list.length} products found</p>
        </div>



      <div className="product_list">
			
			  {product_list.map((item,index) => (

			  	 <div key={item.key}>

			       <div className="dash_order">
								<div className="order_head">
										<Chip label={"Product Id : #"+item.key}  />
										{
  			                               ((currentUser.email == item.user_email)) ?
  			                                  <div>
  			                                 
  			                                 <IconButton onClick={()=>edit_product(item.key)}>
  			                                    <EditIcon />
  			                                </IconButton>
  			                               <IconButton onClick={()=>delete_product(item.key,item.product_title)}>
  			                                <DeleteIcon />
  			                               </IconButton>

                                		 </div>
                                		 :
                                		 <div/>
                                		}
								</div>
										<div className="tag_list_grid">
										{item.tag_list.map((item,index) => (

												<div key={item} >
													<p className="tag_word">{item}</p>
												</div>
										))}

										</div>

								<div className="order_details">

										
										<img src={item.img} alt=""/>



										<div className="order_details">
               						       <h1>Product Name</h1>
               						       <h2>{item.product_title}</h2>
               						       <div>
               						         <h1>Description</h1>
               						         <h2>{item.desc}</h2>
               						       </div>
               						       <div>
               						         <h1>Stock Status</h1>
               						         <h2>{item.in_stock == true?<p className="in_stock">In Stock</p> :<p className="not_in_stock">Not In Stock</p>}</h2>
               						       </div>
               						        <div>
               						         <h1>Price</h1>
               						         <h2>RS {item.product_price}</h2>
               						       </div>
               						     </div>
										<div className="order_details">
											<h1>Status</h1>
											<h2>{item.public ? "Public" :"Not Listed"}</h2>
											<div>
												<h1>Delivery Expected</h1>
												<h2>25 january 2020</h2>
											</div>
										</div>

								</div>
                 				<ProductReviewComp product_id={item.key} vendor={item.user_email}/>

							</div>


					</div>


            ))}

			  </div>

      </div>
    
  );
}

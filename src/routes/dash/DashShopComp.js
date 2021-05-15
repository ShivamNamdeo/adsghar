import React,{useEffect,useState,useContext} from 'react'
import Button from '@material-ui/core/Button';
import "../Style.css";
import firebase from './../../base';
import Loading  from "../comp/Loading";
import TextField from '@material-ui/core/TextField';
import { AuthContext } from "./../../Auth";


import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
function DashShopComp() {



	const [loading, setLoading] = useState(true);
	const [shop_name, set_shop_name] = useState("");
	const [shop_desc, set_shop_desc] = useState("");
	const [shop_address, set_shop_address] = useState("");
	const [shop_contact, set_shop_contact] = useState("");
	const [edit, set_edit] = useState(true);
	const [shop_type, set_shop_type] = useState("Rent");

	const {currentUser} = useContext(AuthContext);

	  useEffect(() => {

		  const subscriber = firebase.firestore()
		    .collection('users')
		    .doc(currentUser.email)
		    .onSnapshot(doc => {
		    	
		    	set_shop_name(doc.data().shop_name);
		     	set_shop_address(doc.data().shop_address);
		    	set_shop_desc(doc.data().shop_desc);
		    	set_shop_contact(doc.data().shop_contact);
				set_shop_type(doc.data().shop_type)
		      setLoading(false);
		    });
		  // Unsubscribe from schlorships when no longer in use
		  return () => subscriber();
	}, []);



const handleShop = ()=>{
	firebase.firestore().collection("users")
	.doc(currentUser.email)
	.set({
		shop_name,
		shop_desc,
		shop_address,
		shop_contact,
		shop_type,
	},{merge:true});

	alert("Shop Information Updated")

	set_edit(!edit);
}

const set_shop_name_fun = (e)=>{
	console.log(e.target.value);
	set_shop_name(e.target.value);
}

const set_shop_address_fun = (e)=>{
	set_shop_address(e.target.value);
}

const set_shop_desc_fun = (e)=>{
	set_shop_desc(e.target.value);
}

const set_shop_contact_fun = (e)=>{
	set_shop_contact(e.target.value);
}






const set_edit_fun = (e)=>{
	set_edit(!edit);
}

if(loading){
	return(
		<Loading />
	)
}



	return (
		<div>

			<div className="comp_heading">
				<h1>Shop Information</h1>
				<Button variant="outlined" color={edit?"primary":"default"}  size="small" onClick={edit ? set_edit_fun : handleShop}>{edit ? "Edit" : "Submit"}</Button>
			</div>
				


			<div  className="profile_">

					 <form   noValidate  >
   					    <TextField id="standard-read-only-input" label="Your Shop Name" value={shop_name} onChange={set_shop_name_fun} InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Your Shop Description" value={shop_desc} onChange={set_shop_desc_fun}InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Your Shop Address" value={shop_address}  onChange={set_shop_address_fun} InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Your Shop Contact" value={shop_contact}  onChange={set_shop_contact_fun} InputProps={{   readOnly: edit, }}/>




						
   					   
   					 </form>


			</div>

			<div  className="profile_">


						<InputLabel id="demo-simple-select-helper-label">Shop Type</InputLabel>
   					     <Select
   					     	label="Shop Type"
   					       labelId="demo-simple-select-label"
   					       id="demo-simple-select"
   					       value={shop_type}
   					       onChange={(e)=>set_shop_type(e.target.value)}
   					     >	



   					       <MenuItem value="Male">Rent</MenuItem>
   					       <MenuItem value="Self-Owned">Self-Owned</MenuItem>
   					        <MenuItem value="Lease">Lease</MenuItem>


   					     </Select>
   					  

   					     
					


			</div>








			




		</div>
	)
}

export default DashShopComp
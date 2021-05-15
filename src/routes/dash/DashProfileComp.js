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


import DashShopComp from "./DashShopComp";
import DashFinanceComp from "./DashFinanceComp";

import DashAdsComp from "./DashAdsComp";


function DashProfileComp() {



	const [loading, setLoading] = useState(true);
	const [schlorship, set_schlorship] = useState([]);


	const [name, set_name] = useState("");
	const [email, set_email] = useState("");
	const [contact, set_contact] = useState("");
	const [avatar, set_avatar] = useState("");
	const [desc, set_desc] = useState("");
	const [address, set_address] = useState("");

	const [pincode, set_pincode] = useState("");
	const [lang, set_lang] = useState("");
	const [zone, set_zone] = useState("");

	const [gender, set_gender] = useState("Male");

	const [dob, set_dob] = useState("");
	const [edit, set_edit] = useState(true);



const {currentUser} = useContext(AuthContext);

	  useEffect(() => {

  const subscriber = firebase.firestore()
    .collection('users')
    .doc(currentUser.email)
    .onSnapshot(doc => {
    	
    	set_email(doc.data().email);
    	set_name(doc.data().name);
    	set_contact(doc.data().contact);
    	set_avatar(doc.data().avatar);
    	set_address(doc.data().address);
    	set_desc(doc.data().desc);
    	set_dob(doc.data().dob);
    	set_zone(doc.data().zone);
    	set_lang(doc.data().lang);
    	set_pincode(doc.data().pincode);

      setLoading(false);
    });
  // Unsubscribe from schlorships when no longer in use
  return () => subscriber();
}, []);



const handleForm = (event)=>{
	firebase.firestore().collection("users")
	.doc(currentUser.email)
	.set({
		name,
		email,
		contact,
		desc,
		address,
		dob,
		pincode,
		lang,
		zone,
	},{merge:true});

	alert("Profile Updated")

	set_edit(!edit);
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
		<div className="dash_comp">

			<div className="comp_heading">
				<h1>Personal Information</h1>
				<Button variant="outlined" color={edit?"primary":"default"}  size="small" onClick={edit ? set_edit_fun : handleForm}>{edit ? "Edit" : "Submit"}</Button>
			</div>
				


			<div  className="profile_">

					 <img src={avatar} alt=""/>
					 <form  noValidate  >
   					    <TextField id="standard-read-only-input" label="Your Name" value={name} onChange={(e)=>set_name(e.target.value)} InputProps={{   readOnly: edit, }}/>
   					    <TextField id="standard-read-only-input" label="Your Email" value={email} onChange={(e)=>set_email(e.target.value)} InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Your Contact" value={contact} onChange={(e)=>set_contact(e.target.value)} InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Your Description" value={desc} onChange={(e)=>set_desc(e.target.value)}InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Your Address" value={address}  onChange={(e)=>set_address(e.target.value)} InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Language Known" value={lang}  onChange={(e)=>set_lang(e.target.value)} InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Your Zone / City" value={zone}  onChange={(e)=>set_zone(e.target.value)} InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Your Pin Code" value={pincode}  onChange={(e)=>set_pincode(e.target.value)} InputProps={{   readOnly: edit, }}/>


						


				</form>
   					   


			</div>

			<div  className="profile_">

   						<TextField  id="standard-read-only-input" label="Date of Birth"  type="date" value={dob}  onChange={(e)=>set_dob(e.target.value)} InputProps={{   readOnly: edit, }}/>

						<FormControl >
						<InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
   					     <Select
   					     	label="Gender"
   					       labelId="demo-simple-select-label"
   					       id="demo-simple-select"
   					       value={gender}
   					       onChange={(e)=>set_gender(e.target.value)}
   					     >	



   					       <MenuItem value="Male">Male</MenuItem>
   					       <MenuItem value="Female">Female</MenuItem>


   					     </Select>
   					  
   					     </FormControl >

   					     
					


			</div>



			<DashShopComp />
			<DashFinanceComp />
			<DashAdsComp />


			




		</div>
	)
}

export default DashProfileComp
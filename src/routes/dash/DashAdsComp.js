import React,{useEffect,useState,useContext} from 'react'
import Button from '@material-ui/core/Button';
import "../Style.css";
import firebase from './../../base';
import Loading  from "../comp/Loading";
import TextField from '@material-ui/core/TextField';
import { AuthContext } from "./../../Auth";

function DashAdsComp() {



	const [loading, setLoading] = useState(true);
	const [ads_no, set_ads_no] = useState("");
	const [agent_code, set_agent_code] = useState("");
	const [sub_type_ads, set_sub_type_ads] = useState("");
	const [ads_type, set_ads_type] = useState("");
	const [edit, set_edit] = useState(true);

	const [ads_subs, set_ads_subs] = useState("");

	const {currentUser} = useContext(AuthContext);

	  useEffect(() => {

		  const subscriber = firebase.firestore()
		    .collection('users')
		    .doc(currentUser.email)
		    .onSnapshot(doc => {
		    	
		    	set_ads_no(doc.data().ads_no);
		     	set_sub_type_ads(doc.data().sub_type_ads);
		    	set_agent_code(doc.data().agent_code);
		    	set_ads_type(doc.data().ads_type);
				set_ads_subs(doc.data().ads_subs);

		      setLoading(false);
		    });
		  // Unsubscribe from schlorships when no longer in use
		  return () => subscriber();
	}, []);



const handleShop = ()=>{
	firebase.firestore().collection("users")
	.doc(currentUser.email)
	.set({
		ads_no,
		agent_code,
		sub_type_ads,
		ads_type,
		ads_subs,

	},{merge:true});

	alert("Advertisement Information Updated")

	set_edit(!edit);
}

const set_ads_no_fun = (e)=>{
	console.log(e.target.value);
	set_ads_no(e.target.value);
}

const set_sub_type_ads_fun = (e)=>{
	set_sub_type_ads(e.target.value);
}

const set_agent_code_fun = (e)=>{
	set_agent_code(e.target.value);
}

const set_ads_type_fun = (e)=>{
	set_ads_type(e.target.value);
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
				<h1>Advertisement Information</h1>
				<Button variant="outlined" color={edit?"primary":"default"}  size="small" onClick={edit ? set_edit_fun : handleShop}>{edit ? "Edit" : "Submit"}</Button>
			</div>
				


			<div  className="profile_">

					 <form   noValidate  >
   					    <TextField id="standard-read-only-input" label="Advertisement No" value={ads_no} onChange={set_ads_no_fun} InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Agent Code" value={agent_code} onChange={set_agent_code_fun}InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Advertisement Subcription " value={ads_subs}  onChange={(e)=>set_ads_subs(e.target.value)} InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Type of Advertisement" value={ads_type}  onChange={set_ads_type_fun} InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Sub Type of Advertisement" value={sub_type_ads}  onChange={set_sub_type_ads_fun} InputProps={{   readOnly: edit, }}/>





						
   					   
   					 </form>


			</div>







			




		</div>
	)
}

export default DashAdsComp;
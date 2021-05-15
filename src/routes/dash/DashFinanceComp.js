import React,{useEffect,useState,useContext} from 'react'
import Button from '@material-ui/core/Button';
import "../Style.css";
import firebase from './../../base';
import Loading  from "../comp/Loading";
import TextField from '@material-ui/core/TextField';
import { AuthContext } from "./../../Auth";

function DashFinanceComp() {



	const [loading, setLoading] = useState(true);
	const [pan_don, set_pan_don] = useState("");
	const [gst_no, set_gst_no] = useState("");
	const [back_acc, set_back_acc] = useState("");
	const [upi_id, set_upi_id] = useState("");
	const [edit, set_edit] = useState(true);

	const [acc_name, set_acc_name] = useState("");
	const [ifsc, set_ifsc] = useState("");

	const {currentUser} = useContext(AuthContext);

	  useEffect(() => {

		  const subscriber = firebase.firestore()
		    .collection('users')
		    .doc(currentUser.email)
		    .onSnapshot(doc => {
		    	
		    	set_pan_don(doc.data().pan_don);
		     	set_back_acc(doc.data().back_acc);
		    	set_gst_no(doc.data().gst_no);
		    	set_upi_id(doc.data().upi_id);
				set_acc_name(doc.data().acc_name);
				set_ifsc(doc.data().ifsc);

		      setLoading(false);
		    });
		  // Unsubscribe from schlorships when no longer in use
		  return () => subscriber();
	}, []);



const handleShop = ()=>{
	firebase.firestore().collection("users")
	.doc(currentUser.email)
	.set({
		pan_don,
		gst_no,
		back_acc,
		upi_id,
		ifsc,
		acc_name,

	},{merge:true});

	alert("Financial Information Updated")

	set_edit(!edit);
}

const set_pan_don_fun = (e)=>{
	console.log(e.target.value);
	set_pan_don(e.target.value);
}

const set_back_acc_fun = (e)=>{
	set_back_acc(e.target.value);
}

const set_gst_no_fun = (e)=>{
	set_gst_no(e.target.value);
}

const set_upi_id_fun = (e)=>{
	set_upi_id(e.target.value);
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
				<h1>Financial Information</h1>
				<Button variant="outlined" color={edit?"primary":"default"}  size="small" onClick={edit ? set_edit_fun : handleShop}>{edit ? "Edit" : "Submit"}</Button>
			</div>
				


			<div  className="profile_">

					 <form   noValidate  >
   					    <TextField id="standard-read-only-input" label="Your PAN NO" value={pan_don} onChange={set_pan_don_fun} InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Your GST NO" value={gst_no} onChange={set_gst_no_fun}InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Bank Account Name " value={acc_name}  onChange={(e)=>set_acc_name(e.target.value)} InputProps={{   readOnly: edit, }}/>
						
						<TextField id="standard-read-only-input" label="Bank IFSC No" value={ifsc}  onChange={(e)=>set_ifsc(e.target.value)} InputProps={{   readOnly: edit, }}/>

						<TextField id="standard-read-only-input" label="Bank Account No " value={back_acc}  onChange={set_back_acc_fun} InputProps={{   readOnly: edit, }}/>
						<TextField id="standard-read-only-input" label="Paytm/Phonepe/ etc UPI NO" value={upi_id}  onChange={set_upi_id_fun} InputProps={{   readOnly: edit, }}/>





						
   					   
   					 </form>


			</div>







			




		</div>
	)
}

export default DashFinanceComp
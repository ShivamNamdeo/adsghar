import React,{useEffect,useState,useContext} from 'react'
import firebase from './../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";
import moment from "moment";
import "./order.css";

function GetAddressUser({user_email,address_id}) {

	const {currentUser} = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	const [address_data, set_address_data] = useState({});

	useEffect(() => {
    const subscriber = firebase.firestore()
      .collection("users")
      .doc(user_email)
      .collection("address")
      .doc(address_id)
      .onSnapshot(doc => {
        set_address_data({key:doc.id,...doc.data()});
        setLoading(false);
      });
  
    return () => subscriber();
  	}, []); 


if(!address_data){
	return(
		<p>Address Not found</p>
	)
}



if(loading){
	return(

		<Loading />
	)
}

	return (
		<div className="address_user_row">
			<div className="address_head">
				<h4>Address Details</h4>
			</div>
			<div className="address_user_comp">
				<p>{user_email}</p>
				<p>{address_data.person_name}</p>
				<p>{address_data.person_mobile}</p>
			</div>
			<div className="address_user_comp">
				
				<p>{address_data.address}</p>
				<p>{address_data.city}</p>
				<p>{address_data.pincode}</p>
			</div>
		</div>
	)
}

export default GetAddressUser
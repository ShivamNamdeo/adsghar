import React,{useEffect,useState,useContext} from 'react'
import firebase from '../../base';
import Loading  from "./Loading";
import { AuthContext } from "../../Auth";

function GetUserPicComp({name,img,user_email,contact,desc,address}) {

	const [loading, setLoading] = useState(true);
	const [avatar, set_avatar] = useState("");
	const [name_, set_name_] = useState("");

	const [address_, set_address_] = useState("");
	const [contact_, set_contact_] = useState("");
	const [desc_, set_desc_] = useState("");



	const {currentUser} = useContext(AuthContext);

	useEffect(() => {

	  		 const subscriber = firebase.firestore()
		    .collection('users')
		    .doc(user_email)
		    .onSnapshot(doc => {
		    	
		    	set_avatar(doc.data().avatar);
		    	set_name_(doc.data().name);
		    	set_address_(doc.data().address);
				set_contact_(doc.data().contact);
				set_desc_(doc.data().desc);

		    	setLoading(false);
		      	
		    });
 		 // Unsubscribe from schlorships when no longer in use
 		 return () => subscriber();	
	  	
		 
}, []);

if(loading){
	return(
		<Loading />
	)
}

if(!avatar || !name_){
	return(
		<div/>
	)
}



	return (

		<div>

			{(img && user_email) &&
				<div className="act_user">
					<img src={avatar} alt=""/>
				</div>
			}

			{(name && user_email) &&
				<div className="act_user">
					<p> {name_}</p>
				</div>
			}

	

			{(desc && user_email) &&
				<div className="act_user">
					<p> {desc_}</p>
				</div>
			}

			{(address && user_email) &&
				<div className="act_user">
					<p> {address_}</p>
				</div>
			}
			{(contact && user_email) &&
				<div className="act_user">
					<p> {contact_}</p>
				</div>
			}

		

		</div>
	)
}

export default GetUserPicComp
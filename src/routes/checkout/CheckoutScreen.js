import React,{useEffect,useState,useContext} from 'react';
import "./checkout.css";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import RemoveIcon from '@material-ui/icons/Remove';
import {Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from '../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


function CheckoutScreen() {

	const {currentUser} = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [cart_list, set_cart_list] = useState([]);
	const [total_items, set_total_items] = useState(0);
	const [total_price, set_total_price] = useState(0);
	const [pincode, set_pincode] = useState("");
	const [city, set_city] = useState("");


	const [person_name, set_person_name] = useState("");
	const [person_mobile, set_person_mobile] = useState("");

	const [edit_address_id, set_edit_address_id] = useState("");

	const [address_list, set_address_list] = useState([]);

	const [mark_address, set_mark_address] = useState("");


	const [address, set_address] = useState("");


	useEffect(() => {
    const subscriber = firebase.firestore()
      .collection("users")
      .doc(currentUser.email)
      .collection("cart")
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        const cart_list_ = [];
        var total_price_ = 0;
        var total_items_ = 0;
        querySnapshot.forEach(doc => {

        	total_items_ = total_items_ + doc.data().quantity;
        	total_price_ = total_price_ + parseInt(doc.data().product_price)*doc.data().quantity;


        	cart_list_.push({
        		...doc.data(),
        		key:doc.id,
        	});
        });

        set_total_items(total_items_);
        set_total_price(total_price_);
        set_cart_list(cart_list_);
        setLoading(false);
      });
  
    return () => subscriber();
  	}, []); 

  	useEffect(() => {
    const subscriber = firebase.firestore()
      .collection("users")
      .doc(currentUser.email)
      .collection("address")
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        const address_list_ = [];

        querySnapshot.forEach(doc => {

        	address_list_.push({
        		...doc.data(),
        		key:doc.id,
        	});
        });


        set_address_list(address_list_);
        setLoading(false);
      });
  
    return () => subscriber();
  	}, []); 



const make_address = ()=>{
	set_edit_address_id(Date.now()+"");
}


const add_address = ()=>{


		const temp_id = edit_address_id ? edit_address_id : Date.now()+"";

		return new Promise((res, rej) => {
                firebase.firestore()
                .collection('users')
                .doc(currentUser.email)
                .collection('address')
                .doc(temp_id)
                .set({
                    address,
                    pincode,
                    city,
                    person_mobile,
                    person_name,
                    timestamp:Date.now(),
                },{ merge: true })
                    .then(ref => {
                    set_clear()
                    res(ref);                    
                })
                .catch(error => {
                    rej(error);
                })
       		 })
}

const delete_address = (key)=>{
	if(window.confirm("Are you sure to remove this address")){
			 return new Promise((res, rej) => {
                firebase.firestore()
                .collection('users')
                .doc(currentUser.email)
                .collection('address')
                .doc(key)
                .delete()
                 .then(ref => {
                 	set_clear();
                    res(ref);                    
                })
                .catch(error => {
                    rej(error);
                })
       		 })
		}
}

const edit_address = (data)=>{
	set_edit_address_id(data.key);
	set_address(data.address);
	set_pincode(data.pincode);
	set_city(data.city);
	set_person_mobile(data.person_mobile);
	set_person_name(data.person_name);
}

const set_clear = ()=>{
	set_edit_address_id("");
	set_city("");
	set_address("");
	set_pincode("");
	set_person_name("");
	set_person_mobile("");
}


if(loading){
	return(

		<Loading />
	)
}

if(cart_list ==[] || total_items == 0){
	return(
		<div className="empty">
			<h1>Your cart is empty</h1>
			<Link to="/StoreScreen">Go To Store</Link>

		</div>
	)
}

	return (
		<div className="cart">
			
			<div className="cart_grid_main">

		 			<div className="cart_grid">
		
						<div className="cart_head">
							<h1>Your Address {(address_list.length >=1 &&address_list.length <=2 && !edit_address_id) && <IconButton onClick={()=>make_address()}><AddIcon /></IconButton>}</h1>
						</div>
						
						<div className="cart_list_main">

							


							{
								(address_list.length == 0 ) || edit_address_id?
								<div className="form_checkout_main">
								<div className="form_checkout">
									<TextField variant="outlined" size="small"  value={person_name} onChange={(e)=>set_person_name(e.target.value)}  label="Person name" />
									<TextField variant="outlined" size="small"  value={person_mobile} onChange={(e)=>set_person_mobile(e.target.value)}  label="Person Mobile No" />
									
									<TextField variant="outlined" size="small" value={address} onChange={(e)=>set_address(e.target.value)}  label="Address" />
									<TextField variant="outlined" size="small"  value={pincode}onChange={(e)=>set_pincode(e.target.value)}  label="Pincode" />
									<TextField variant="outlined" size="small"  value={city} onChange={(e)=>set_city(e.target.value)}  label="City" />
									



								</div>
									<div className="form_checkout_button">
									<Button color="primary" variant="contained" onClick={()=>add_address()}>SUBMIT</Button>

									{edit_address_id && <Button onClick={()=>set_clear()}color="primary" variant="contained">Cancel </Button> }

									</div>
								</div>
								:
								<div>
								</div>

							}

							





							<div className="cart_list">
							{address_list.map((item,index) => (

									<div className="checkout_comp">
												<div className="cart_comp_head">

													<div className="address_details">
														<p>{item.person_name}</p>
														<p>{item.person_mobile}</p>
														<p>{item.address}</p>
														<p>{item.city}</p>
														<p>{item.pincode}</p>
														
													</div>

													
													<div className="button_checkout">

														<IconButton onClick={()=>edit_address(item)}><EditIcon /></IconButton>
														<IconButton onClick={()=>delete_address(item.key)}><DeleteIcon /></IconButton>
														<IconButton onClick={()=>set_mark_address(item.key)}><CheckCircleOutlineIcon color={item.key == mark_address ? "primary" :" secondary"}/></IconButton>


													</div>
												</div>
				
												
									</div>

							))}
							</div>

							
					



						</div>	

					</div>	
		
					<div className="cart_total">
		
						<div className="cart_head">
							<h1>Total Order</h1>
						</div>

						<div className="cart_total_list">


							<div className="cart_total_comp">
								<p>Item Price</p>

								{cart_list.map((item,index) => (
									<p>{item.product_price} * {item.quantity} = {item.product_price * item.quantity}</p>
								))}
								
								<hr/>
								
								<p>Total Items : {total_items}  Total Price : {total_price}</p>
							</div>


							<Link to="/CheckoutScreen">
							<div className="checkout_flex">
								
									<Button>Confirm Order</Button>
								
							</div>
							</Link>
						</div>
					
					</div>	
			</div>
			
		</div>
	)
}

export default CheckoutScreen
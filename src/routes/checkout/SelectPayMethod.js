import React,{useEffect,useState,useContext} from 'react';
import "./checkout.css";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import firebase from '../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";

function SelectPayMethod() {


	const {currentUser} = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [cart_list, set_cart_list] = useState([]);
	const [total_items, set_total_items] = useState(0);
	const [total_price, set_total_price] = useState(0);
	const [payment_true, set_payment_true] = useState(false);
	const [address_data, set_address_data] = useState({});

	const [order_id, set_order_id] = useState("");
	const [address_id, set_address_id] = useState("");

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

        	if(doc.data().latest){
        		set_address_id(doc.id);
        		set_address_data(doc.data())
        	}

        	
        });
        setLoading(false);
      });
  
    return () => subscriber();
  	}, []); 



  	const add_order= ()=>{


  		try{


		const temp_id = Date.now()+"";

		const time = parseInt(temp_id);

		set_order_id(temp_id);

				firebase.firestore()
                .collection('order')
                .doc(temp_id)
                .set({
                	order_id:temp_id,
                	address_id:address_id,
                   	user_email:currentUser.email,
                   	total_price,
                   	total_items,
                    timestamp:time,

                },{merge:true});


                firebase.firestore()
                .collection("users")
                .doc(currentUser.email)
                .collection('buy_order')
                .doc(temp_id)
                .set({
                	order_id:temp_id,
                	timestamp:time,
                },{merge:true});

		
		for (var i = 0; i < cart_list.length; i++) {
			firebase.firestore()
                .collection('order')
                .doc(temp_id)
                .collection('product')
                .doc(cart_list[i].key)
                .set({
                	product_id:cart_list[i].product_id,
                	product_price:cart_list[i].product_price,
                	quantity:cart_list[i].quantity,
                	vendor_email:cart_list[i].vendor_email,
                	timestamp:time,
                  status:"Order Done",
                },{merge:true});


                firebase.firestore()
                .collection("users")
                .doc(cart_list[i].vendor_email)
                .collection('sell_order')
                .doc(temp_id)
                .set({
                	order_id:temp_id,
                	timestamp:time,
                },{merge:true});

		}


		empty_cart();
		set_payment_true(true);


	}catch(error){
		alert(error);
	}


		
}

	
const empty_cart = ()=>{

	try{
		for (var i = 0; i < cart_list.length; i++) {
			firebase.firestore()
                .collection('users')
                .doc(currentUser.email)
                .collection('cart')
                .doc(cart_list[i].key)
                .delete()
		}
	}catch(error){
		alert(error);
	}
		
}


  	if(payment_true){
  		return(

  				<div className="order_done">

  					<div>
  						<img src="https://cdn.dribbble.com/users/14038/screenshots/3292894/loading2done.gif" alt=""/>
  						<h3>Your order has been done</h3>
  						<h3>Order Id : {order_id}</h3>
  					</div>
  				</div>
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
		<div className="select_pay">
			<div className="paymethod_head">
				<h1>Select Payment Method</h1>
			</div>



			<div className="select_pay_method">
				<Button onClick={()=>add_order()}>Cash On Delivery</Button>
				<Button >Online Payment</Button>
			</div>

		</div>
	)
}

export default SelectPayMethod
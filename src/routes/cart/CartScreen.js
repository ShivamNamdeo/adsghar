import React,{useEffect,useState,useContext} from 'react';
import "./cart.css";

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import RemoveIcon from '@material-ui/icons/Remove';

import {Link} from "react-router-dom";

import firebase from '../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";

function CartScreen() {


	const {currentUser} = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [cart_list, set_cart_list] = useState([]);
	const [total_items, set_total_items] = useState(0);
	const [total_price, set_total_price] = useState(0);



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


	console.log(cart_list);

	const add_to_cart = (key,quantity)=>{
		  return new Promise((res, rej) => {
                firebase.firestore()
                .collection('users')
                .doc(currentUser.email)
                .collection('cart')
                .doc(key)
                .set({
                    quantity:quantity+1,
                },{ merge: true })
                    .then(ref => {
                    res(ref);                    
                })
                .catch(error => {
                    rej(error);
                })
        })

	}

	const minus_to_cart = (key,quantity)=>{

			if(quantity>1){
				return new Promise((res, rej) => {
                firebase.firestore()
                .collection('users')
                .doc(currentUser.email)
                .collection('cart')
                .doc(key)
                .set({
                    quantity:quantity-1,
                },{ merge: true })
                    .then(ref => {
                    res(ref);                    
                })
                .catch(error => {
                    rej(error);
                })
       		 })
			}else{
				alert("You can remove your product by clicking on remove from cart")
			}

		  

	}

	const remove_from_cart = (key)=>{

		if(window.confirm("Are you sure to remove this product from your cart")){
			 return new Promise((res, rej) => {
                firebase.firestore()
                .collection('users')
                .doc(currentUser.email)
                .collection('cart')
                .doc(key)
                .delete()
                 .then(ref => {
                    res(ref);                    
                })
                .catch(error => {
                    rej(error);
                })
       		 })
		}

		 

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
							<h1>Your Cart</h1>
						</div>
						
						<div className="cart_list">


							{cart_list.map((item,index) => (

									<div className="cart_comp">
												<div className="cart_comp_head">
													<img src="http://adsghar.in/wp-content/uploads/2017/12/product-w-jeans4-300x300.jpg" alt="" />
												</div>
				
												<div className="button_cart">
														<p>Quantity</p>
														<IconButton onClick={()=>add_to_cart(item.product_id,item.quantity)}><AddIcon /></IconButton>
														<p>{item.quantity}</p>
														<IconButton onClick={()=>minus_to_cart(item.product_id,item.quantity)}><RemoveIcon /></IconButton>
												</div>
												<div className="cart_content">
													<div>
														<p>Dark Brown Jeans</p>
														<p>Price : {item.product_price}</p>
													</div>
													<div className="rem_cart">
														<p onClick={()=>remove_from_cart(item.key)}>Remove from cart</p>
													</div>	
					
				
				
										</div>
									</div>

							))}

							
					



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


							<div className="checkout_flex">
								<Button>Checkout</Button>
							</div>
						</div>
					
					</div>	
			</div>
			
		</div>
	)
}

export default CartScreen
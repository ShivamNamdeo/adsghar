import React,{useEffect,useState,useContext} from 'react';
import "./store.css";
import moment from "moment";
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import firebase from '../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";
import {useHistory } from "react-router";


function StoreComp({comp}) {

	const history = useHistory();


	const {currentUser} = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [cart_list, set_cart_list] = useState([]);
	
	useEffect(() => {
		if(currentUser){
			 const subscriber = firebase.firestore()
      .collection("users")
      .doc(currentUser.email)
      .collection("cart")
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        const cart_list_ = [];
        querySnapshot.forEach(doc => {
        	cart_list_.push(doc.data().product_id);
        });
        set_cart_list(cart_list_);
        setLoading(false);
      });
  
    return () => subscriber();
		}
   
  	}, []); 


	const add_to_cart = ()=>{
		  return new Promise((res, rej) => {
                firebase.firestore()
                .collection('users')
                .doc(currentUser.email)
                .collection('cart')
                .doc(comp.key)
                .set({
                 	

                 	vendor_email:comp.user_email,
                	product_price:comp.product_price,
                	product_id:comp.key,
                	quantity:1,
                 	timestamp:Date.now(),

                
                },{ merge: true })
                    .then(ref => {
                    res(ref);                    
                })
                .catch(error => {
                    rej(error);
                })
        })

	}

	const remove_from_cart = (key)=>{
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


	const signin = ()=>{
		history.push("/login");
	}








	return (
		<div className="store_comp">

			<div className="comp_row">
				<div className="comp_head">
					<img src={comp.img} alt=""/>
				</div>
				<div className="comp_data">
					<div className="tag_list_grid">
										{comp.tag_list.map((item,index) => (

												<div key={item} >
													<p className="tag_word">{item}</p>
												</div>
										))}

					</div>
					<p>{comp.product_title}</p>
					<p>{comp.user_email}</p>
 					<p>{moment(comp.timestamp).format("LLL")}</p>
 					<h4>In Stock</h4>

 					<div className="comp_vendor">
 						<p>Shop Details</p>

 						<img src={comp.img} alt=""/>
 						<p>Shivam Garments And Footwear Hindoria</p>
 					</div>
				</div>

			</div>

			{
				currentUser?
				<div className="comp_button">
				
				<Button  color="primary">RS {comp.product_price}</Button>
				{
					cart_list.includes(comp.key)?
					<Button variant="outlined"  color="secondary"  onClick={()=>remove_from_cart(comp.key)}>Remove From Cart</Button>
					:
					<Button variant="outlined" onClick={()=>add_to_cart()}>Add To Cart</Button>
				}
				
				</div>
				:
				<div className="comp_button">
					<Button  color="primary">RS {comp.product_price}</Button>
					<Button variant="outlined" onClick={()=>signin()}>Add To Cart</Button>
				</div>
			}
			
 			
		</div>
	)
}

export default StoreComp
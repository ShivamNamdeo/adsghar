import React,{useEffect,useState,useContext} from 'react'
import firebase from './../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";
import moment from "moment";


function GetProductData({product_id}) {

	const {currentUser} = useContext(AuthContext);
	const [product_data, set_product_data] = useState({});
	const [loading, setLoading] = useState(true);


	useEffect(() => {
    const subscriber = firebase.firestore()
      .collection("products")
      .doc(product_id)
      .onSnapshot(doc => {
        	
        set_product_data({key:doc.id,...doc.data()});



        setLoading(false);
      });
  
    return () => subscriber();
  	}, []); 

if(!product_data){
	return(
		<p>Product Not found</p>
	)
}

if(loading){
	return(

		<Loading />
	)
}


	return (
		<div className="order_details">

			<img src={product_data.img} alt=""/>
			<div className="order_details">
			<div>
				<h1>{product_data.product_title}</h1>
				<h2>By {product_data.user_email}</h2>
			</div>
		

			</div>	
							
		</div>
	)
}

export default GetProductData
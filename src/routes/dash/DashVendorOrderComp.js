import React,{useEffect,useState,useContext} from 'react'
import "../Style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MessageIcon from '@material-ui/icons/Message';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import LabelIcon from '@material-ui/icons/Label';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import firebase from './../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";
import moment from "moment";
import ShopOrderComp from "./ShopOrderComp";



function DashVendorOrderComp() {

	const [order_list, set_order_list] = useState([]);
	const [loading, setLoading] = useState(true);
	const {currentUser} = useContext(AuthContext);

	const [search, set_search] = useState("");

  	useEffect(() => {
    const subscriber = firebase.firestore()
      .collection("users")
      .doc(currentUser.email)
      .collection("sell_order")
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        const order_list_ = [];

        querySnapshot.forEach(doc => {

        	if(doc.data().order_id.includes(search)){
        		order_list_.push({...doc.data(),key:doc.id});
        	}
        	

        	
        });

        set_order_list(order_list_);
        setLoading(false);
      });
  
    return () => subscriber();
  	}, [search]); 




if(loading){
	return(

		<Loading />
	)
}








	return (
		<div className="dash_comp">

			<div className="comp_heading">
				<h1>Your Shop Orders</h1>
			</div>

			<div className="comp_heading">
				<TextField id="standard-read-only-input" style={{width:"100%"}} onChange={(e)=>set_search(e.target.value)}  variant="outlined"
				 label="Search order id"  InputProps={{   readOnly: false, }}/>

			</div>

			<div className="order_list">


			{order_list.map((item,index) => (

					<div className="dash_order">
					<div className="order_head">
				
							<Chip label={"ORDER ID : "+item.key} />

							<Chip label={<p>Ordered On: {moment(item.timestamp).format("LLL")}</p>} />

					</div>

					<ShopOrderComp order_id={item.order_id} />

				</div>


			))}

				

			</div>

			
		</div>
	)
}

export default DashVendorOrderComp
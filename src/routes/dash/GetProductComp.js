import React,{useEffect,useState,useContext} from 'react'
import firebase from './../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";
import moment from "moment";
import GetProductData from "./GetProductData";
import GetAddressUser from "./GetAddressUser";


import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,

  },
}));

function GetProductComp({order_id}) {

	 const classes = useStyles();
	const {currentUser} = useContext(AuthContext);
	const [order_data, set_order_data] = useState({});
	const [loading, setLoading] = useState(true);
	const [order_list, set_order_list] = useState([]);



	useEffect(() => {
    const subscriber = firebase.firestore()
      .collection("order")
      .doc(order_id)
      .onSnapshot(doc => {
        set_order_data({key:doc.id,...doc.data()});
        
      });
  
    return () => subscriber();
  	}, []); 

	useEffect(() => {
    const subscriber = firebase.firestore()
      .collection("order")
      .doc(order_id)
      .collection("product")
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        const order_list_ = [];

        querySnapshot.forEach(doc => {

        		order_list_.push({...doc.data(),key:doc.id});
        	        	

        	
        });

        set_order_list(order_list_);
        setLoading(false);
      });
  
    return () => subscriber();
  	}, []); 



if(loading){
	return(

		<Loading />
	)
}

	return (
		<div className="order_comp">

				<div className="order_details">
					<GetAddressUser user_email={order_data.user_email} address_id={order_data.address_id}/>
				</div>





			<Accordion   >
   		     <AccordionSummary
   		       expandIcon={<ExpandMoreIcon />}
   		       aria-controls="panel1a-content"
   		       id="panel1a-header"
   		     >
   		       <Typography className={classes.heading}>{order_list.length} PRODUCTS</Typography>
   		     </AccordionSummary>
   		        <div >

					{order_list.map((item,index) => (
		
						<div className="order_data">
		
		
						<div className="order_details">

							<div className="shop_order_details" >
							<GetProductData product_id={item.product_id}/>
							</div>

								<div className="shop_order_details" >
									<p>Product {index+1}</p>
									<p>{moment(item.timestamp).format("LLL")}</p>
									<p>Price : {item.product_price}</p>
									<p>Quantity : {item.quantity}</p>
								</div>
									
								<div className="shop_order_details" >
									<p>Status : {item.status}</p>
									<p>Delivery Expected : {moment(item.timestamp).format("LLL")}</p>
								
								</div>
		
							
								
							
		
							</div>
		
						</div>
		
		
		
					))}
				</div>
   		   </Accordion>

			
		</div>
	)
}

export default GetProductComp
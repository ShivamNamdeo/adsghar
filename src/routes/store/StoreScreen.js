import React,{useEffect,useState,useContext} from 'react';
import firebase from '../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";
import "./store.css";
import StoreComp from "./StoreComp";
import TextField from '@material-ui/core/TextField';
import ReactSelect from 'react-select';


function StoreScreen() {


	const {currentUser} = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [product_list, set_product_list] = useState([]);
	const [search, set_search] = useState("");
	const [pin_code, set_pin_code] = useState("");

	const [selected_shop, set_selected_shop] = useState("");
	const [user_list, set_user_list] = useState([]);

	const [shop_id, set_shop_id] = useState("");

useEffect(() => {
  	


	if(selected_shop == ""){
		set_shop_id(null);
	}

    const subscriber = firebase.firestore()

      .collection("users")
      .orderBy('name','asc')
      .onSnapshot(querySnapshot => {
        
        const user_list_ = [];
  
        querySnapshot.forEach(doc => {


        	if(doc.data().name.toLowerCase().includes(selected_shop.toLowerCase())){
        		user_list_.push({
          	 		 ...doc.data(),
          	 		 key: doc.id,
          		});
        	        	
        	}
        		

          	
        });
    
        set_user_list(user_list_);
        
        setLoading(false);
        
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [selected_shop]); 


useEffect(() => {
  
    const subscriber = firebase.firestore()

      .collection("products")
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const product_list_ = [];
  
        querySnapshot.forEach(doc => {

        	if(doc.data().product_title.toLowerCase().includes(search.toLowerCase())){
        		product_list_.push({
          	 		 ...doc.data(),
          	 		 key: doc.id,
          		});
        	}
        	

          	
        });
    
        set_product_list(product_list_);
        
        setLoading(false);
        
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [search,shop_id]); 


useEffect(() => {
  	
  	if(shop_id){
  		 const subscriber = firebase.firestore()

      .collection("products")
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const product_list_ = [];
  
        querySnapshot.forEach(doc => {

        	if(shop_id == doc.data().user_email && doc.data().product_title.toLowerCase().includes(search.toLowerCase())){
        		product_list_.push({
          	 		 ...doc.data(),
          	 		 key: doc.id,
          		});
        	}
        	

          	
        });
    
        set_product_list(product_list_);
        
        setLoading(false);
        
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  	}

   
  }, [shop_id,selected_shop]); 








const set_search_fun = (e)=>{
	set_search(e.target.value);
}

const set_pin_code_fun = (e)=>{
	set_pin_code(e.target.value);
}

const set_select_shop_fun =(key,name)=>{
	set_selected_shop(name);

	set_shop_id(key);
}

const set_selected_shop_fun = (e)=>{

	set_selected_shop(e.target.value);
}


if(loading){
	return(
		<Loading />
	)
}
	

	return (
		<div className="store">
			



			<div className="filter_store">

				<div className="store_head">

					<h1>Search Filters</h1>


					<input type="text" value={search} onChange={set_search_fun} placeholder="Search your product here"/>
					<input type="text" value={selected_shop} onChange={set_selected_shop_fun} placeholder="Select your shop here"/>

					<div className="user_list_modal">
						<div className="user_grid">

							{user_list.map((item,index) => (
							<div className="user" onClick={()=>set_select_shop_fun(item.key,item.name)}>	
								<img src={item.avatar} alt=""/>
								<p>{item.name}</p>
							</div>
							
							))}

						</div>
					</div>



					
					

					 <input
               			value={pin_code} 
               			onChange={set_pin_code_fun}
               			placeholder="Enter your pincode"
               			variant="outlined"
               			pattern="[0-9]*" maxlength="5" required name="zip" id="zip"
						style={{width:"150px",padding:8,fontSize:14}}              			
            		/>



				</div>




				<div className="grid_top">

				<p>{product_list.length} results found</p>
				<div className="store_grid">

					

 					{product_list.map((item,index) => (
 						<StoreComp comp={item} />
 					))}	
				</div>

				</div>
			</div>


		</div>
	)
}

export default StoreScreen
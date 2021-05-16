import React,{useEffect,useState,useContext} from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import firebase from '../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";


const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function CartButton() {


  const {currentUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [cart_list, set_cart_list] = useState([]);
  
  useEffect(() => {
    
    
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
  
   }, []); 









  return (
    <IconButton aria-label="cart">
      {
        currentUser?
           <StyledBadge badgeContent={cart_list.length} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        :
            <ShoppingCartIcon />

      }
     
    </IconButton>
  );
}

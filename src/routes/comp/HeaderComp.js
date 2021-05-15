import React, { useContext,useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../Auth";
import app from "../../base";

import CartButton from "../../routes/cart/CartButton";

import "./Comp.css";
import {Link} from "react-router-dom";

import {useHistory} from "react-router";

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DrawerComp from "./DrawerComp";


function HeaderComp() {


	const {currentUser} = useContext(AuthContext);
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (event) => {
    

    history.push("/DashboardScreen");

  };

  const handleOpenMenu = (event)=>{
  	setAnchorEl(event.currentTarget);
  }

  const handleCloseMenu =()=>{
  	 setAnchorEl(null);
  }

  const handleClose = () => {


    setAnchorEl(null);

    app.auth().signOut()
    
  };

	return (
		<div className="header">

			

			<div className="logo">
				<img src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png" />
				<Link to="/">ADSGHAR</Link>
			</div>
			<Link to="/"> Home</Link>
			<Link to="/BlogScreen"> Article</Link>
			
			<Link to="/StoreScreen">Stores</Link>
		
			<Link to="/">Food</Link>
			<Link to="/"> Services</Link>
			<Link to="/">Freelancers</Link>
			<Link to="/">Medical</Link>
			<Link to="/">Market & Estate</Link>
			<Link to="/">Jobs</Link>
			<Link to="/">Research & survey</Link>
			<Link to="/">Maps</Link>

			{
				currentUser?
					<div className="dash">
					
						<Avatar onClick={handleOpenMenu}>{currentUser.email.substring(0,1)}</Avatar>
		
					 <Menu
    				    id="simple-menu"
    				    anchorEl={anchorEl}
    				    keepMounted
    				    open={anchorEl}
    				    onClose={handleCloseMenu}
    				  >
    				    <MenuItem onClick={handleClick}>Dashboard</MenuItem>
    				    <MenuItem onClick={handleClose} >Logout</MenuItem>
    				  </Menu>

						</div>

					:

					<div className="dash">
					
					
						<Tooltip title="User">
						<Link to="/login">
						<Button aria-label="User">
						 Login
						</Button>
						</Link>
						</Tooltip>

						<Tooltip title="User">
						<Link to="/signup">
						<Button aria-label="User">
						 Signup
						</Button>
						</Link>
						</Tooltip>


					</div>
			

			}


			

			<div className="row_header">
			
			<Link to="/CartScreen">
      		<Tooltip title="Cart">
      			<CartButton />
      		</Tooltip>
      		
      		</Link>
      		<div className="menu_drawer">



      		<DrawerComp />

      		</div>


      		</div>


		</div>
	)
}

export default HeaderComp
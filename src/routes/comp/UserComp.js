import React,{useContext,useState} from 'react'
import "./Comp.css";
import { AuthContext } from "../Auth";
import app from "../base";
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from "react-router-dom";

import Button from '@material-ui/core/Button';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import PermMediaIcon from '@material-ui/icons/PermMedia';

function UserComp() {

		 const {currentUser} = useContext(AuthContext);

	return (
		<div >
			{
				currentUser?
					<div className="row_user">
					<Tooltip title="User">
					<Link to="/DashboardScreen">
					<Button aria-label="User"><PersonPinIcon/> 
					{app.auth().currentUser.email.substring(0,6)}
					</Button>
					</Link>
					</Tooltip>
    					<Tooltip title="Sign Out ">
      		 			 <Button aria-label="Sign Out " color="primary" onClick={() => app.auth().signOut()}>
      		 			 	Sign Out 
      		 			 </Button>
      				</Tooltip>

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
		</div>
	)
}

export default UserComp
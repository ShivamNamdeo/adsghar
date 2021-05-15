import React from 'react'
import HeaderComp from "./comp/HeaderComp";
import "./Routes.css";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import contact from "../assets/contact.png";

function PostNowScreen() {
	return (
		<div >

			<div className="flex">	

			
				<div className="form">

					<div className="form_heading">

						<h1>FORM FOR POSTING AD</h1>
						<h2>CONTACT US</h2>
						<h3>MOBILE NO. : 62616385554</h3>
						<h3>Email : ADSGHAR@gmailcom</h3>
						<img src={contact} />


					</div>

					<form>
						<input type="text" placeholder="Your name"/>
						<input type="text" placeholder="Your address"/>
						<input type="text" placeholder="Your mobile no"/>
						<input type="text" placeholder="Type of store / service"/>


						
						<Tooltip title="Submit The Form" >
      		 			 <Button aria-label="Submit" >
      		 			 	 Submit
      		 			 </Button>
      					</Tooltip>

					</form>
				</div>

			</div>
		</div>
	)
}

export default PostNowScreen
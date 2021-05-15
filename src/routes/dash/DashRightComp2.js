import React,{useContext} from 'react'
import { AuthContext } from "../../Auth";
import app from "../../base";
import f from "../../assets/latest/1.jpg";
import Button from '@material-ui/core/Button';

import s from "../../assets/latest/2.jpg";
import t from "../../assets/latest/3.jpg";
import "../Style.css";

function DashRightComp2() {

	  const {currentUser} = useContext(AuthContext);


	return (

		<div className="dash_comp">
			<div className="dash_section_heading">
				<h2>Profile</h2>
				<Button variant="outlined" color="primary">UPDATE PROFILE</Button>

			</div>


		<div className="dash_section">
			
			<img src="https://storage.googleapis.com/multibhashi-website/website-media/2017/12/person.jpg" alt=""/>
			
			<div className="dash_section">
				<h1>Shivam Namdeo</h1>
				<h3>VENDOR</h3>
				<h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
				incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
				 elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet.</h3>
			</div>
			<div className="dash_section">

			</div>
			
		</div>

		</div>
	)
}

export default DashRightComp2;
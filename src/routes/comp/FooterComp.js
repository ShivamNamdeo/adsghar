import React ,{useContext} from 'react'
import "./Comp.css";
import { AuthContext } from "../../Auth";
import app from "../../base";
import BottomAuthNav from "./BottomAuthNav";


function FooterComp() {

		const {currentUser} = useContext(AuthContext);


	return (
		<div className="footer">
			
		<div className="footer_grid">
			<div className="section">
				<h2>Quick Links</h2>
				<h1>Home</h1>
				<h1>About</h1>
				<h1>My Account</h1>
				<h1>Contact</h1>
			</div>
			<div className="section">
			<h2>For Her</h2>
				<h1>Women Jeans</h1>
				<h1>Tops And Shirts</h1>
				<h1>My Account</h1>
				<h1>Contact</h1>
			</div>

			<div className="section">
			<h2> For Him</h2>
				<h1>Women Jeans</h1>
				<h1>Tops And Shirts</h1>
				<h1>My Account</h1>
				<h1>Contact</h1>
			</div>
			<div className="section">
			<h2>Download Our App</h2>	
				<img src="http://adsghar.in/wp-content/uploads/2018/12/playstore-free-img.png" />
				<img src="http://adsghar.in/wp-content/uploads/2018/12/appstore-free-img.png" />
			</div>


			</div>


			<div className="footer_bottom">
				<h1>Copyright © 2021 adsghar.in</h1>
				<h1>Powered by adsghar.in</h1>
				
			</div>

		</div>
	)
}

export default FooterComp
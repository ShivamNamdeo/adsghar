import React from 'react';
import "./Comp.css";
import vendor from "../../assets/vendor.png";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

function VendorBannerComp() {
	return (
		<div className="full_flex">
			
			<div className="vendor_grid">

				<div className="vendor_box">
					<h1>Limited Time Opportunity</h1>
					<h2>Be independent and earn your income</h2>
					<h3>Become a part of our team. This is an opportunity to earn money and become independent.</h3>
					<h4>Become a vendor now by applying using the button below</h4>
					<Tooltip title="Apply to become a vendor">
      				  <Button aria-label="Apply"> Become a vendor </Button>
      				</Tooltip>
				</div>

				<img src= {vendor}/>

			</div>

		</div>
	)
}

export default VendorBannerComp
import React from 'react'
import cover from "../../assets/cover.png";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from "react-router-dom";

function CoverComp() {
	return (
		<div className="cover">
			

			<div className="cover_heading">	
				<h1>Be Free</h1>
				<h1>Be Digital</h1>
				<h2>Post your advertisement and increase your business</h2>

				<div className="row_cover_button" >	
					<Tooltip title="Post Now" >
      		 		 <Button aria-label="Post Now" >
      		 		 	<Link to="/PostNowScreen">Post Now</Link>
      		 		 </Button>
      				</Tooltip>
					<Tooltip title="Find More" >
      		 		 <Button aria-label="Find More"  style={{marginLeft:16}}>
      		 		 	<Link to="/FaqScreen">Find More</Link>
      		 		 </Button>
      				</Tooltip>

				</div>

			</div>

			<img src={cover} />
		</div>
	)
}

export default CoverComp
import React from 'react'
import "./Comp.css";
import f from "../../assets/latest/1.jpg";

import s from "../../assets/latest/2.jpg";
import t from "../../assets/latest/3.jpg";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

function SliderFstComp() {


	return (

		<div className="slider_fst_grid">
		

			<div className="slider_child">
			  <img src={f}	/>
			  <Tooltip title="Shop Now" >
      		 	 <Button aria-label="Shop Now" >
      		 	 	Shop Now
      		 	 </Button>
      			</Tooltip>
			</div>
			
			<div className="slider_child">
			  <img src={s}	/>
			  <Tooltip title="Shop Now" >
      		 	 <Button aria-label="Shop Now" >
      		 	 	Shop Now
      		 	 </Button>
      			</Tooltip>
			</div>
			

			<div className="slider_child">
			  <img src={t}	/>
			  <Tooltip title="Shop Now" >
      		 	 <Button aria-label="Shop Now" >
      		 	 	Shop Now
      		 	 </Button>
      			</Tooltip>
			</div>
			

		</div>
	)
}

export default SliderFstComp
import React from 'react';
import DashProfileComp  from "./DashProfileComp";
import DashProductComp  from "./DashProductComp";
import DashBlogComp  from "./DashBlogComp";
import DashOrderComp  from "./DashOrderComp";
import DashFeedBackComp  from "./DashFeedBackComp";
import DashActComp  from "./DashActComp";



function DashSwitchComp({ren_comp}) {

	switch(ren_comp){

		case "profile":
			return (<DashProfileComp />);
		case "product":
			return (<DashProductComp />);
		case "blog":
			return (<DashBlogComp />);
		case "order":
			return(<DashOrderComp />);
		case "feedback":
			return(<DashFeedBackComp />);

		case "activity":
			return(<DashActComp />);
			
		default:
			return (<DashProfileComp />);


	}

}

export default DashSwitchComp;
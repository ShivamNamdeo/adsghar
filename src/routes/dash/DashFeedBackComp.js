import React from 'react'
import Button from '@material-ui/core/Button';
import "../Style.css";
import TextField from '@material-ui/core/TextField';

function DashFeedBackComp() {
	return (
		<div className="dash_comp">

			<div className="comp_heading">
				<h1>Feedback To Adsghar</h1>
			</div>
			
			<div className="feedback_block">
					<img src="https://images.squarespace-cdn.com/content/v1/559b2478e4b05d22b1e75b2d/1549568089409-SJ70E6DVG3XTE70232OL/ke17ZwdGBToddI8pDm48kKtXZpJn2rhZW9Hf_3YuFplZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpzAeLsUnXPb8rexT_6kM4nU53ooYt-DRW1mkSbeF6jiMep1D72Ha-6oZXHbQjuahKY/Nesbit.jpg" alt=""/>

					 <form  noValidate autoComplete="off" >
   					    <TextField id="standard-read-only-input"  variant="outlined" label="Your Name" defaultValue="Hello World" InputProps={{   readOnly: false, }}/>
   					    <TextField id="standard-read-only-input" variant="outlined" label="Your Email" defaultValue="Hello World" InputProps={{   readOnly: false, }}/>
						<TextField id="standard-read-only-input"  variant="outlined"label="Your Contact" defaultValue="Hello World" InputProps={{   readOnly: false, }}/>
						<TextField id="standard-read-only-input" variant="outlined" label="Your Feedback" defaultValue="Hello World" InputProps={{   readOnly: false, }}/>

						<Button variant="outlined" color="primary" size="small">SUBMIT</Button>



   					   
   					 </form>


			</div>

		</div>
	)
}


export default DashFeedBackComp
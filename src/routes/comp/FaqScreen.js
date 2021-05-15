import React from 'react'

import "./Routes.css";

function FaqScreen() {
	return (
		<div className="faq_flex">
			<div className="form_heading">

						<div className="flex_between">
							<h1> FAQ's</h1>
							<input type="text" placeholder="Search FAQ's" />
							
						</div>
						<div className="faq_list">

							<div className="ques">
							<h2>1. What type of advertisement we accept?</h2>
							<h2>Ans : We accept all types of advertisement</h2>
							</div>

							<div className="ques">
							<h2>2. What are the charges for posting advertisement?</h2>
							<h2>Ans : Charges are very low cost, as low as 70 rupees per month. For more details write to us.</h2>
							</div>


							<div className="ques">
							<h2>3. Who can post an advertisement?</h2>
							<h2>Ans : Anyone who has attain 18 years of age</h2>
							</div>

							<div className="ques">
							<h2>4. Is Indian nationality important for posting an advertisement?</h2>
							<h2>Ans : No, Indian nationality is not important for posting an advertisement. However any person who is behind barsunder any legal obligations cannot post any advertisement.</h2>
							</div>


							<div className="ques">
							<h2>5. What type of payment system we accept?</h2>
							<h2>Ans: We prefer online payment, but all modes of payments are acceptable.</h2>
							</div>


							<div className="ques">
							<h2>6. How to post an advertisement?</h2>
							<h2>Ans : You can contact any one of our direct seller or you can post advertisement using our online platform.</h2>
							</div>

						</div>


		</div>
		</div>
	)
}

export default FaqScreen
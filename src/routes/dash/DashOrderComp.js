import React from 'react';
import "../Style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MessageIcon from '@material-ui/icons/Message';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import LabelIcon from '@material-ui/icons/Label';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

function DashOrderComp() {
	return (
		<div className="dash_comp">

			<div className="comp_heading">
				<h1>Orders</h1>
			</div>

			<div className="comp_heading">
				<TextField id="standard-read-only-input" style={{width:"100%"}} variant="outlined"
				 label="Search order"  InputProps={{   readOnly: false, }}/>

			</div>

			<div className="order_list">
				
				<div className="dash_order">
					<div className="order_head">
				
							<Chip label="ORDER ID : #165324626651654"  />
							<Chip label="Track Order" />

					</div>

					<div className="order_details">
				
							<img src="http://adsghar.in/wp-content/uploads/2017/12/product-w-jeans4-300x300.jpg" alt=""/>
							<div className="order_details">
				
								<h1>Dark brown jeans</h1>
								<h2>By Thomus Milson</h2>

								<div>
									<h1>Size : 5 </h1>
									<h2>Qty: 1</h2>
								</div>
								<div>
									<h1>Price : 255 INR</h1>
									
								</div>


							</div>
							<div className="order_details">
				
								<h1>Status</h1>
								<h2>In Shipping</h2>

								<div>
									<h1>Delivery Expected</h1>
									<h2>25 january 2020</h2>
								</div>

							</div>
							
					</div>

				</div>
			
				<div className="dash_order">
					<div className="order_head">
				
							<Chip label="ORDER ID : #165324626651654"  />
							<Chip label="Track Order" />

					</div>

					<div className="order_details">
				
							<img src="http://adsghar.in/wp-content/uploads/2017/12/product-w-jeans4-300x300.jpg" alt=""/>
							<div className="order_details">
				
								<h1>Dark brown jeans</h1>
								<h2>By Thomus Milson</h2>

								<div>
									<h1>Size : 5 </h1>
									<h2>Qty: 1</h2>
								</div>
								<div>
									<h1>Price : 255 INR</h1>
									
								</div>


							</div>
							<div className="order_details">
				
								<h1>Status</h1>
								<h2>In Shipping</h2>

								<div>
									<h1>Delivery Expected</h1>
									<h2>25 january 2020</h2>
								</div>

							</div>
							
					</div>
					

					
					
				


            		

					
				</div>
				<div className="dash_order">
					<div className="order_head">
				
							<Chip label="ORDER ID : #165324626651654"  />
							<Chip label="Track Order" />

					</div>

					<div className="order_details">
				
							<img src="http://adsghar.in/wp-content/uploads/2017/12/product-w-jeans4-300x300.jpg" alt=""/>
							<div className="order_details">
				
								<h1>Dark brown jeans</h1>
								<h2>By Thomus Milson</h2>

								<div>
									<h1>Size : 5 </h1>
									<h2>Qty: 1</h2>
								</div>
								<div>
									<h1>Price : 255 INR</h1>
									
								</div>


							</div>
							<div className="order_details">
				
								<h1>Status</h1>
								<h2>In Shipping</h2>

								<div>
									<h1>Delivery Expected</h1>
									<h2>25 january 2020</h2>
								</div>

							</div>
							
					</div>
					

					
					
				


            		

					
				</div>
				<div className="dash_order">
					<div className="order_head">
				
							<Chip label="ORDER ID : #165324626651654"  />
							<Chip label="Track Order" />

					</div>

					<div className="order_details">
				
							<img src="http://adsghar.in/wp-content/uploads/2017/12/product-w-jeans4-300x300.jpg" alt=""/>
							<div className="order_details">
				
								<h1>Dark brown jeans</h1>
								<h2>By Thomus Milson</h2>

								<div>
									<h1>Size : 5 </h1>
									<h2>Qty: 1</h2>
								</div>
								<div>
									<h1>Price : 255 INR</h1>
									
								</div>


							</div>
							<div className="order_details">
				
								<h1>Status</h1>
								<h2>In Shipping</h2>

								<div>
									<h1>Delivery Expected</h1>
									<h2>25 january 2020</h2>
								</div>

							</div>
							
					</div>
					

					
					
				


            		

					
				</div>

			</div>

			
		</div>
	)
}

export default DashOrderComp
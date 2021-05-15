import React from 'react'
import "./Comp.css";
import PublicIcon from '@material-ui/icons/Public';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PhonelinkLockIcon from '@material-ui/icons/PhonelinkLock';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

function StatBoxComp() {
	return (
		<div className="stat_box">
			
		<div className="stat_box_grid">
			<div className="section_stat">

				<PublicIcon />
				<h1>Get Global Attention</h1>
				<h2>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo</h2>
				
			</div>
			<div className="section_stat">

				<EmojiEmotionsIcon />
				<h1>Best Technology</h1>
				<h2>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo</h2>
				
			</div>
			<div className="section_stat">

				<MonetizationOnIcon />
				<h1>Lowest Cost</h1>
				<h2>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo</h2>
				
			</div>
			<div className="section_stat">

				<PhonelinkLockIcon />
				<h1>Secure Payments</h1>
				<h2>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo</h2>
				
			</div>
		
			</div>


		
		</div>
	)
}

export default StatBoxComp
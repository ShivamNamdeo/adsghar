import React from 'react';
import app from "./base.js";

function DashBoard() {
	return (
		<div>
			  <h1>Dashboard</h1>
			  <button onClick={() => app.auth().signOut()}>Sign out</button>

		</div>
	)
}

export default DashBoard
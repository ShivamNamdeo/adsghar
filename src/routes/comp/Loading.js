import React from 'react';
import "./Comp.css";

import LinearProgress from '@material-ui/core/LinearProgress';

function Loading() {
	return (
		<div className="loading">
			<LinearProgress />
		</div>
	)
}

export default Loading
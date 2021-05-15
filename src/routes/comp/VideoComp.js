import React from 'react';
import f from "../../assets/blog/1.jpg";
import s from "../../assets/blog/2.jpg";

import t from "../../assets/blog/3.jpg";

import four from "../../assets/blog/4.jpg";
import "./Comp.css";
import YoutubeEmbed from "./YoutubeEmbed";

function VideoComp() {
	return (
		<div className="blog_grid">

			<div className="blog_child">
      			<YoutubeEmbed embedId="rokGy0huYEA" />
				
			</div>

			<div className="blog_child">
      			<YoutubeEmbed embedId="rokGy0huYEA" />
				
			</div>
			<div className="blog_child">
      			<YoutubeEmbed embedId="rokGy0huYEA" />
				
			</div>
			<div className="blog_child">
      			<YoutubeEmbed embedId="rokGy0huYEA" />
				
			</div>

			
		</div>
	)
}

export default VideoComp;
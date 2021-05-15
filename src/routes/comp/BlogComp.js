import React from 'react';
import f from "../../assets/blog/1.jpg";
import s from "../../assets/blog/2.jpg";

import t from "../../assets/blog/3.jpg";

import four from "../../assets/blog/4.jpg";


function BlogComp() {
	return (
		<div className="blog_grid">

			<div className="blog_child">
				<img src={f}	 />
				<h1> Write your blog and earn money.Write your blog and earn money.</h1>
				<h2>Write your blog and earn money.Write your blog and earn money.Write your blog and earn money.Write your blog and earn money.</h2>
			</div>
			<div className="blog_child">
				<img src={s}	 />
				<h1> Write your blog and earn money.Write your blog and earn money.</h1>
				<h2>Write your blog and earn money.Write your blog and earn money.Write your blog and earn money.Write your blog and earn money.</h2>
			</div>
			<div className="blog_child">
				<img src={t}	 />
				<h1> Write your blog and earn money.Write your blog and earn money.</h1>
				<h2>Write your blog and earn money.Write your blog and earn money.Write your blog and earn money.Write your blog and earn money.</h2>

			</div>
			<div className="blog_child">
				<img src={four}	 />
				<h1> Write your blog and earn money.Write your blog and earn money.</h1>
				<h2>Write your blog and earn money.Write your blog and earn money.Write your blog and earn money.Write your blog and earn money.</h2>

			</div>
		</div>
	)
}

export default BlogComp
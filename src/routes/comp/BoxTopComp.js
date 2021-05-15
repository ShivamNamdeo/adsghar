import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import "./Comp.css"
import cover from '../../assets/cover.png';
import f from '../../assets/1.jpg';


import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import s from '../../assets/2.jpg';

import t from '../../assets/3.jpg';



const tileData = [  
				{    img: f,    title: "../assets/1.jpg",    author: 'author',  },
				{    img: s,    title: 'Image',    author: 'author',  },
				{    img: t,    title: 'Image',    author: 'author',  },
				{    img: f,    title: "../assets/1.jpg",    author: 'author',  },
				{    img: s,    title: 'Image',    author: 'author',  },
				{    img: t,    title: 'Image',    author: 'author',  },
        {    img: f,    title: "../assets/1.jpg",    author: 'author',  },
        {    img: s,    title: 'Image',    author: 'author',  },
        {    img: t,    title: 'Image',    author: 'author',  },
        {    img: t,    title: 'Image',    author: 'author',  },

				];


const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  gridList: {

    padding:16,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:"#fff",
  },
}));


export default function BoxTopComp() {
  const classes = useStyles();

  return (
    <div className="box_top_flex">

    	<h1>Featured Products</h1>

      <div className="slider_fst" cols={3}>
        
        {tileData.map((item) => (


        	

        	<div className="details" key={item.title}>
         	 	
            	<img src={item.img} alt={item.title} />
            	
            	<h1 >Sold By ADSGHAR</h1>
            	<h2 > Dark Drown Jeans</h2>
            	<h3 >Grocery</h3>
            	<h3 >Price :  200 INR </h3>

                 <StarBorderIcon className={classes.title} />
                 <StarBorderIcon className={classes.title} />
                 <StarBorderIcon className={classes.title} />
                 <StarBorderIcon className={classes.title} />

                 <div className="slider_child">
                   <Tooltip title="Add to cart" >
                 <Button aria-label="Add to cart" >
                 Add to cart
                 </Button>
                 </Tooltip>

                 </div>
          </div>
        ))}

      </div>
    </div>
  );
}

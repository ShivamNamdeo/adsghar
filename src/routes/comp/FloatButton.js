import React from 'react';
import "./button.css";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import {Link } from "react-router-dom";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
function FloatButton() {

   const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className="button">
       <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <MenuIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      > 
      <div className="menu">
       <Link to="/"><MenuItem onClick={handleClose}> Home</MenuItem></Link>
        <Link to="/"> <MenuItem onClick={handleClose}>Course</MenuItem></Link>
        <Link to="/"><MenuItem onClick={handleClose}>Events</MenuItem></Link>
        <Link to="/"><MenuItem onClick={handleClose}> Blogs</MenuItem></Link>
        <Link to="/"><MenuItem onClick={handleClose}>About Us</MenuItem></Link>
      </div>
      </Menu>
    </div>
  )
}

export default FloatButton
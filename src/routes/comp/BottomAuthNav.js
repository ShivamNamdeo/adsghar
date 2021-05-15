import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import "./Comp.css";

import MessageIcon from '@material-ui/icons/Message';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
});

function BottomAuthNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {

    setValue(newValue);
     console.log(value);
  };

 

  return (

    <Paper square className={classes.root} className="bottom_nav">
      <Tabs
        value={value}
        onChange={handleChange}
   	
        aria-label="icon label tabs example"
      >
        <Tab icon={<PersonPinIcon />} label="PROFILE" value="1"/>

        <Tab icon={<AddShoppingCartIcon />} label="ORDERS" value="2"/>
        <Tab icon={<MessageIcon />} label="BLOGS" value="3"/>
        <Tab icon={<ListAltIcon />} label="PRODUCTS" value="4" />
      </Tabs>
    </Paper>
  );
}

export default BottomAuthNav
import React,{useContext,useState} from 'react'
import "./Style.css";
import { AuthContext } from "./../Auth";
import app from "./../base";
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
  import PermMediaIcon from '@material-ui/icons/PermMedia';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventIcon from '@material-ui/icons/Event';
import PaymentIcon from '@material-ui/icons/Payment';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import DashSwitchComp  from "./dash/DashSwitchComp";

import DrawerComp from "./comp/DrawerComp";
import GetUserPicComp from "./comp/GetUserPicComp";

import up from "./img/up.png";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DescriptionIcon from '@material-ui/icons/Description';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: "#fff",
  },
}));
function DashboardScreen() {

   const {currentUser} = useContext(AuthContext);
    const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
   const [ren_comp, set_ren_comp] = useState("profile");


  return (
    <div className="dashboard">
      <div className="drawer">
            <div className={classes.root}>
      <AppBar position="static" color="#fff">
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="on"
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
          
          aria-label="scrollable force tabs example"
        >
          <Tab label="Profile" 
           onClick={()=>set_ren_comp("profile")}icon={<PersonPinIcon />} {...a11yProps(0)} />

          <Tab label="Products"onClick={()=>set_ren_comp("product")} icon={<ShoppingBasket />} {...a11yProps(1)} />
           <Tab label="Articles"onClick={()=>set_ren_comp("blog")} icon={<DescriptionIcon />} {...a11yProps(2)} />


          <Tab label="Orders" onClick={()=>set_ren_comp("order")} icon={<ShoppingBasket />} {...a11yProps(3)} />
          <Tab label="Activity" onClick={()=>set_ren_comp("activity")}icon={<HelpIcon />} {...a11yProps(4)} />
          <Tab label="Feedback" onClick={()=>set_ren_comp("feedback")} icon={<HelpIcon />} {...a11yProps(5)} />
        </Tabs>
      </AppBar>
     
    </div>
          </div>
      <div className="dash_grid">


        <div className="dash_menu">
          <MenuItem onClick={()=>set_ren_comp("profile")}>Dashboard</MenuItem>
          <MenuItem onClick={()=>set_ren_comp("product")}>Product List</MenuItem>
          <MenuItem onClick={()=>set_ren_comp("activity")}>Activity</MenuItem>
          <MenuItem onClick={()=>set_ren_comp("blog")}>Blogs</MenuItem>
          <MenuItem onClick={()=>set_ren_comp("order")}>Orders</MenuItem>
          <MenuItem onClick={()=>set_ren_comp("feedback")}>Feedback</MenuItem>

          <div className="col">
            <img src={up} alt=""/>
            <Button variant="outlined" color="primary">UPGRADE</Button>
          </div>
          
        </div>

        
          <DashSwitchComp ren_comp={ren_comp} />
        
      </div>

  

      
    </div>
  )
}

export default DashboardScreen;
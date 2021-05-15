import React ,{useContext}from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import BookIcon from '@material-ui/icons/Book';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import { AuthContext } from "../../Auth";
import app from "../../base";
import {Link} from "react-router-dom"; 
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  

  },
  fullList: {
    width: 'auto',
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function DrawerComp() {




  const classes = useStyles();

    const {currentUser} = useContext(AuthContext);



   const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <div
     className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >       


        
            <List
              className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
              })}
              role="presentation"
            >

            
              <div className="logo">
                <img src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png" />
                <Link to="/">ADSGHAR</Link>
              </div>


             {
              !currentUser?
                 <div>

                    <Link  to="/login">
                         <ListItem button >
                           
                           <ListItemText secondary="Login" />
                         </ListItem>
            
                     </Link>
                     <Link  to="/signup">
                         <ListItem button >
                           
                           <ListItemText secondary="Signup" />
                         </ListItem>
            
                     </Link>
        
                     </div>
                :

                <div>

                  <Link  to="/DashboardScreen">
                     <ListItem button >
                       
                       <ListItemText secondary="Dashboard" />
                     </ListItem>
                   </Link>




                   <ListItem button onClick={() => app.auth().signOut()}>
                           
                           <ListItemText secondary="Sign Out" />
                    </ListItem>
                </div>
             
             }


               <Link  to="/">
                  <ListItem button >
                    <ListItemText secondary="Home" />
                  </ListItem>
              </Link>


                 <Link  to="/DashboardScreen">
                     <ListItem button >
                       
                       <ListItemText secondary="Article" />
                     </ListItem>
                   </Link>


                    <Link  to="/DashboardScreen">
                     <ListItem button >
                       
                       <ListItemText secondary="Stores" />
                     </ListItem>
                   </Link>


                    <Link  to="/DashboardScreen">
                     <ListItem button >
                       
                       <ListItemText secondary="Food" />
                     </ListItem>
                   </Link>

                    <Link  to="/DashboardScreen">
                     <ListItem button >
                       
                       <ListItemText secondary="Services" />
                     </ListItem>
                   </Link>

                   <Link  to="/DashboardScreen">
                     <ListItem button >
                       
                       <ListItemText secondary="Freelancers" />
                     </ListItem>
                   </Link>

                    <Link  to="/DashboardScreen">
                     <ListItem button >
                       
                       <ListItemText secondary="Medical" />
                     </ListItem>
                   </Link>
                    <Link  to="/DashboardScreen">
                     <ListItem button >
                       
                       <ListItemText secondary="Market & EState" />
                     </ListItem>
                   </Link>
                    <Link  to="/DashboardScreen">
                     <ListItem button >
                       
                       <ListItemText secondary="Jobs" />
                     </ListItem>
                   </Link>

              
                    <Link  to="/DashboardScreen">
                     <ListItem button >
                       
                       <ListItemText secondary="Reaseach & Survey" />
                     </ListItem>
                   </Link>


                    <Link  to="/DashboardScreen">
                     <ListItem button >
                       
                       <ListItemText secondary="Maps" />
                     </ListItem>
                   </Link>

                   





         </List>

   
      
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}><MenuIcon /></IconButton>
          <SwipeableDrawer
            anchor="left"
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

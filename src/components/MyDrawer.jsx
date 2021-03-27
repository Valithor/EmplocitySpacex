import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {Home, Favorite} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  drawer:{
    height: '100%',
    backgroundColor: '#2c2c2c',
  },
 
  drawerContent: {
    margin: '5px',
    alignSelf: "left",
    width: '200px',
    color: 'white', 
},
}));

function MyDrawer({open, handleClose}) {
  const classes = useStyles();
  const history = useHistory();

  return (
      <Drawer open={open} onClose={handleClose}>
        <div className={classes.drawer}>
        <List className={classes.drawerContent}>
            <ListItem button onClick={() => history.push('/')}>
              <ListItemIcon style={{color: 'white'}}>
                <Home/> <ListItemText>Home</ListItemText>
              </ListItemIcon>
            </ListItem>
            <ListItem button onClick={() => history.push('/favourites')}>
              <ListItemIcon style={{color: 'white'}}>
                <Favorite/> <ListItemText>Favourites</ListItemText>
              </ListItemIcon>
            </ListItem>
        </List>  
        </div>
      </Drawer>
  );
}
export default MyDrawer;
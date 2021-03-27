import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MyDrawer from './MyDrawer';

function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <div >
      <AppBar position="static" style={{background:"#00003f" }}>
        <Toolbar>
          <IconButton edge="start" onClick={()=>setOpen(true)} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            Spacex Missions
          </Typography>
        </Toolbar>
      </AppBar>
      <MyDrawer open={open} handleClose={()=>setOpen(false)}/>
    </div>
  );
}
export default Header;
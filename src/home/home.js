import React, { Component } from 'react';
import firebase from '../core/firebaseConfig';

import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, CssBaseline, Avatar, CircularProgress, Dialog, DialogTitle, ListItemAvatar } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { loginListener } from '../login/functions/loginListener';
import { logout } from '../login/functions/logout';
import { getUserInformation } from './functions/getUserInformation';

import './home.css';
import componentList from '../shared/componentList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.db = firebase.firestore();

    this.state = {
      userInformation: null,
      mobileDrawer: false,
      menu: false,
      selectedComponent: 0,
    }
  }
  
  componentDidMount() {
    loginListener();

    this._getUserInformation();
  }

  async _getUserInformation() {
    this.setState({
      userInformation: await getUserInformation()
    })
  }

  handleDrawer() {
    this.setState({
      mobileDrawer: !this.state.mobileDrawer
    });
  }

  handleMenu() {
    this.setState({
      menu: !this.state.menu
    });
  }

  selectComponent(index) {
    this.setState({
      selectedComponent: index
    }, () => {this.handleDrawer()});
  }

  render() {
    return (
      <div className='root'>
        <CssBaseline />
        <AppBar position="fixed" className='appBar'>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={() => this.handleDrawer()}
              className='menuButton'
            >
              <MenuIcon />
            </IconButton>
            <div className='spacer'/>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              className='menuButton'
              onClick={() => {this.handleMenu()}} 
            >
              {this.state.userInformation ? 
                <Avatar alt="Remy Sharp" src={this.state.userInformation.photoURL} />
              :
                <Avatar>
                  <CircularProgress className='avatarLoadingCircle' />
                </Avatar>
              }
            </IconButton>
          </Toolbar>
        </AppBar>

        <Dialog 
          onClose={() => {this.handleMenu()}} 
          open={this.state.menu}
        >
          <DialogTitle>
            Configurações
          </DialogTitle>
          <List>
            <ListItem 
              autoFocus 
              button 
              onClick={() => logout()}>
              <ListItemAvatar>
                <Avatar>
                  <ExitToAppIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="LogOut" />
            </ListItem>
          </List>
        </Dialog>

        <nav className='drawer'>
          <Drawer
            variant="temporary"
            open={this.state.mobileDrawer}
            onClose={() => this.handleDrawer()}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <IconButton 
              onClick={() => this.handleDrawer()} 
              className='closeMenuButton'
            >
              <CloseIcon />
            </IconButton>
            <div style={{width: '250px'}} />
            <List>
              {componentList.map((component, index) => (
                <ListItem button onClick={() => this.selectComponent(index)}>
                  <component.icon />
                  <div style={{width: '10px'}} />
                  <ListItemText primary={component.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </nav>
        
        <div className='content'>
          {componentList[this.state.selectedComponent].component}
        </div>
      </div>
    );
  }
}

export default Home;
import React, { Component } from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  ListItemAvatar,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebase from '../../core/firebaseConfig';

import { loginListener } from '../login/functions/loginListener';
import { logout } from '../login/functions/logout';
import { getUserInformation } from './functions/getUserInformation';

import './home.css';
import componentList from '../../shared/componentList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.db = firebase.firestore();

    this.state = {
      userInformation: null,
      mobileDrawer: false,
      menu: false,
      selectedComponent: 0,
    };
  }

  componentDidMount() {
    loginListener();

    this._getUserInformation();
  }

  handleDrawer() {
    const { mobileDrawer } = this.state;
    this.setState({
      mobileDrawer: !mobileDrawer,
    });
  }

  handleMenu() {
    const { menu } = this.state;

    this.setState({
      menu: !menu,
    });
  }

  async _getUserInformation() {
    this.setState({
      userInformation: await getUserInformation(),
    });
  }

  selectComponent(index) {
    this.setState({
      selectedComponent: index,
    });

    this.handleDrawer();
  }

  render() {
    const {
      menu,
      mobileDrawer,
      selectedComponent,
      userInformation,
    } = this.state;
    return (
      <div className="root">
        <CssBaseline />
        <AppBar position="fixed" className="appBar">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={() => this.handleDrawer()}
              className="menuButton"
            >
              <MenuIcon />
            </IconButton>
            <div className="spacer" />
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              className="menuButton"
              onClick={() => {
                this.handleMenu();
              }}
            >
              {userInformation ? (
                <Avatar alt="Remy Sharp" src={userInformation.photoURL} />
              ) : (
                <Avatar>
                  <CircularProgress className="avatarLoadingCircle" />
                </Avatar>
              )}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Dialog
          onClose={() => {
            this.handleMenu();
          }}
          open={menu}
        >
          <DialogTitle>Configurações</DialogTitle>
          <List>
            <ListItem autoFocus button onClick={() => logout()}>
              <ListItemAvatar>
                <Avatar>
                  <ExitToAppIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="LogOut" />
            </ListItem>
          </List>
        </Dialog>

        <nav className="drawer">
          <Drawer
            variant="temporary"
            open={mobileDrawer}
            onClose={() => this.handleDrawer()}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <IconButton
              onClick={() => this.handleDrawer()}
              className="closeMenuButton"
            >
              <CloseIcon />
            </IconButton>
            <div style={{ width: '250px' }} />
            <List>
              {componentList.map((component, index) => (
                <ListItem button onClick={() => this.selectComponent(index)}>
                  <component.icon />
                  <div style={{ width: '10px' }} />
                  <ListItemText primary={component.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </nav>

        <div className="content">
          {componentList[selectedComponent].component}
        </div>
      </div>
    );
  }
}

export default Home;

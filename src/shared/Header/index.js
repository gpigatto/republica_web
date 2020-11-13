import React, { Component } from 'react';
import {
  AppBar,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import { ExitToApp, Menu } from '@material-ui/icons';
import firebase from '../../core/firebaseConfig';
import { getUserInformation } from '../../home/functions/getUserInformation';
import { logout } from '../../login/functions/logout';
import { loginListener } from '../../login/functions/loginListener';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.db = firebase.firestore();

    this.state = {
      userInformation: null,
      menu: false,
    };
  }

  componentDidMount() {
    loginListener();
    this.getUserInformation();
  }

  handleMenu() {
    const { menu } = this.state;
    this.setState({
      menu: !menu,
    });
  }

  async getUserInformation() {
    this.setState({
      userInformation: await getUserInformation(),
    });
  }

  render() {
    const { userInformation, menu } = this.state;
    console.log(userInformation);
    return (
      <>
        <AppBar position="fixed" className="appBar">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={() => this.handleDrawer()}
              className="menuButton"
            >
              <Menu />
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
                  <ExitToApp />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="LogOut" />
            </ListItem>
          </List>
        </Dialog>
      </>
    );
  }
}

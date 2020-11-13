import React, { Component } from 'react';

import { Paper, Button, TextField, Grid, Select, MenuItem, Avatar, InputLabel } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';

import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import firebase from '../../core/firebaseConfig';

import { getUserList } from '../../pages/home/functions/getUserList';
import { insertInFirebaseCollection } from '../../pages/home/functions/insertInFirebaseCollection';

import './addRecurringBill.css';

class AddRecurringBill extends Component {
  constructor(props) {
    super(props);

    this.db = firebase.firestore();
    this.currentDate = new Date().toISOString().split('T')[0];

    this.state = {
      userList: [],
      debtor: 'everyone',
      receiver: 'everyone',
      description: '',
      value: 0,
      date: this.currentDate,
    };
  }

  componentDidMount() {
    this._getUserList();
  }

  async _getUserList() {
    this.setState({
      userList: await getUserList(),
    });
  }

  handleReceiverChange = (event) => {
    this.setState({
      receiver: event.target.value,
    });
  }

  handleDebtorChange = (event) => {
    this.setState({
      debtor: event.target.value,
    });
  }

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  handleValueChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  addTransaction() {
    insertInFirebaseCollection(
      'recurringBills',
      {
        receiver: this.state.receiver,
        debtor: this.state.debtor,
        description: this.state.description,
        value: this.state.value,
      },
    );
  }

  render() {
    return (
      <Paper className="paper">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6} lg={2}>
            <InputLabel className="selectLabel">Receiver</InputLabel>
            <Select
              fullWidth
              variant="outlined"
              onChange={this.handleReceiverChange}
              value={this.state.receiver}
            >
              <MenuItem value="everyone">
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Avatar className="avatarImage">
                      <HomeIcon className="avatarImage" />
                    </Avatar>
                  </Grid>
                  <Grid>
                    Casa
                  </Grid>
                </Grid>
              </MenuItem>
              {
                this.state.userList == null
                  ? <div />
                  : this.state.userList.map(
                    (user) => (
                      <MenuItem value={user.uid}>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                          spacing={2}
                        >
                          <Grid item>
                            <Avatar
                              className="avatarImage"
                              src={user.photoURL}
                            />
                          </Grid>
                          <Grid>
                            {user.displayName}
                          </Grid>
                        </Grid>
                      </MenuItem>
                    ),
                  )
              }
            </Select>
          </Grid>
          <Grid item xs={6} lg={2}>
            <InputLabel className="selectLabel">Debtor</InputLabel>
            <Select
              fullWidth
              variant="outlined"
              onChange={this.handleDebtorChange}
              value={this.state.debtor}
            >
              <MenuItem value="everyone">
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Avatar className="avatarImage">
                      <HomeIcon className="avatarImage" />
                    </Avatar>
                  </Grid>
                  <Grid>
                    Casa
                  </Grid>
                </Grid>
              </MenuItem>
              {
                this.state.userList == null
                  ? <div />
                  : this.state.userList.map(
                    (user) => (
                      <MenuItem value={user.uid}>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                          spacing={2}
                        >
                          <Grid item>
                            <Avatar
                              className="avatarImage"
                              src={user.photoURL}
                            />
                          </Grid>
                          <Grid>
                            {user.displayName}
                          </Grid>
                        </Grid>
                      </MenuItem>
                    ),
                  )
              }
            </Select>
          </Grid>
          <Grid item xs={6} lg={5}>
            <InputLabel className="selectLabel">Description</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="description..."
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={6} lg={2}>
            <InputLabel className="selectLabel">Value</InputLabel>
            <CurrencyTextField
              className="currencyTextField"
              variant="outlined"
              currencySymbol="R$"
              outputFormat="number"
              value={this.state.value}
              onChange={this.handleValueChange}
            />
          </Grid>
          <Grid item xs={12} lg={1}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              <Grid item>
                <Button
                  className="buttonSize"
                  fullWidth
                  onClick={() => { this.addTransaction(); }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddRecurringBill;

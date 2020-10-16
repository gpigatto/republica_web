import React, { Component } from 'react';
import firebase from '../../core/firebaseConfig';

import { Paper, Button, TextField, Grid, Select, MenuItem, Avatar, InputLabel } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';

import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import { getUserList } from '../functions/getUserList';
import { insertInFirebaseCollection } from '../functions/insertInFirebaseCollection';
import { getUserInformation } from '../functions/getUserInformation';
import { getSheetList } from '../functions/getSheetList';

import './addTransaction.css';

class AddTransaction extends Component {
  constructor(props) {
    super(props);

    this.db = firebase.firestore();
    this.currentDate = new Date().toISOString().split('T')[0];

    this.state = {
      userList: [],
      sheetList: [],
      debtor: 'everyone',
      receiver: '',
      description: '',
      value: 0,
      sheet: ''
    }
  }

  componentDidMount() {
    this._getUserList();
    this._getUserAsReceiver();
    this._getSheetList();
  }

  async _getUserList() {
    this.setState({
      userList: await getUserList()
    })
  }

  async _getUserAsReceiver() {
    let _userInformation = await getUserInformation();

    if (_userInformation) {
      this.setState({
        receiver: _userInformation.uid 
      })
    }
  }

  async _getSheetList() {
    this.setState({
      sheetList: await getSheetList()
    }, () => {
      if (this.state.sheetList.length > 0) {
        this.setState({
          sheet: this.state.sheetList[0].id
        })
      }
    })
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

  handleSheetChange = (event) => {
    this.setState({
      sheet: event.target.value,
    });
  };

  addTransaction() {
    insertInFirebaseCollection(
      'transaction',
      {
        receiver: this.state.receiver,
        debtor: this.state.debtor,
        description: this.state.description,
        value: this.state.value,
        sheet: this.state.sheet
      }
    );
  }

  render() {
    return (
      <Paper className='paper'>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6} lg={2}>
            <InputLabel className='selectLabel'>Receiver</InputLabel>
            <Select 
              fullWidth
              variant='outlined'
              onChange={this.handleReceiverChange}
              value={this.state.receiver}
            >
              {
                this.state.userList == null ? 
                  <div />
                :
                  this.state.userList.map(
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
                              className='avatarImage'
                              src={user.photoURL} 
                            />
                          </Grid>
                          <Grid>
                            {user.displayName}  
                          </Grid>
                        </Grid>
                      </MenuItem>
                    )
                  )
              }
            </Select>
          </Grid>
          <Grid item xs={6} lg={2}>
            <InputLabel className='selectLabel'>Debtor</InputLabel>
            <Select  
              fullWidth
              variant='outlined'
              onChange={this.handleDebtorChange}
              value={this.state.debtor}
            >
              <MenuItem value={'everyone'}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Avatar className='avatarImage'>
                      <HomeIcon className='avatarImage' />
                    </Avatar>
                  </Grid>
                  <Grid >
                    Casa  
                  </Grid>
                </Grid>
              </MenuItem>
              {
                this.state.userList == null ?
                  <div /> 
                :
                  this.state.userList.map(
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
                              className='avatarImage'
                              src={user.photoURL}
                            />
                          </Grid>
                          <Grid>
                            {user.displayName}  
                          </Grid>
                        </Grid>
                      </MenuItem>
                    )
                  )
              }
            </Select>
          </Grid>
          <Grid item xs={12} lg={3}>
            <InputLabel className='selectLabel'>Description</InputLabel>
            <TextField 
              variant="outlined" 
              fullWidth
              placeholder="description..."
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={6} lg={2}>
            <InputLabel className='selectLabel'>Value</InputLabel>
            <CurrencyTextField
              className='currencyTextField'
              variant="outlined"
              currencySymbol="R$"
              outputFormat="number"
              value={this.state.value}
              onChange={this.handleValueChange}
            />
          </Grid>
          <Grid item xs={6} lg={2}>
            <InputLabel className='selectLabel'>Sheet</InputLabel>
            <Select 
              fullWidth
              variant='outlined'
              onChange={this.handleSheetChange}
              value={this.state.sheet}
            >
              {
                this.state.sheetList == null ? 
                  <div />
                :
                  this.state.sheetList.map(
                    (sheet) => (
                      <MenuItem value={sheet.id}>
                        {sheet.name}
                      </MenuItem>
                    )
                  )
              }
            </Select>
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
                  className='buttonSize'
                  fullWidth
                  onClick={() => this.addTransaction()}
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

export default AddTransaction;
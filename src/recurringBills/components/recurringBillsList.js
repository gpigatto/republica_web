import React, { Component } from 'react';
import firebase from '../../core/firebaseConfig';

import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Grid, IconButton } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import { deleteInFirebaseCollection } from '../../home/functions/deleteInFirebaseCollection';
import { firebaseCollectionListener } from '../../home/functions/firebaseCollectionListener';
import { getUserList } from '../../home/functions/getUserList';

class RecurringBillClass {
  id;
  receiverDisplayName;
  receiverPhotoURL;
  debtorDisplayName;
  debtorPhotoURL;
  description;
  value;
}

class RecurringBillsList extends Component {
  constructor(props) {
    super(props);

    this.db = firebase.firestore();

    this.state = {
      recurringBillsList: [],
      userList: [],
    }
  }

  componentDidMount() {
    this._getUserList();
  }

  async _getUserList() {
    this.setState({
      userList: await getUserList()
    }, () => {
      this._addCollectionListener();
    })
  }

  _addCollectionListener() {
    let self = this;
    
    firebaseCollectionListener(
      'recurringBills', 
      function(data) {
        let _recurringBillsBase = data.docs.map(doc => ({...doc.data(), id: doc.id}));

        self.setState({
          recurringBillsList: self._generateRecurringBillsList(_recurringBillsBase)
        });
      }
    );
  }
  
  _generateRecurringBillsList(_recurringBillsBase) {
    var _recurringBillList = [];
    
    for(var i = 0; i < _recurringBillsBase.length; i++) {
      var _transaction = new RecurringBillClass();

      _transaction.id = _recurringBillsBase[i].id;

      var _debtorData = this._searchUser(_recurringBillsBase[i].debtor);
      
      if(_debtorData != null) {
        _transaction.debtorDisplayName = _debtorData.displayName;
        _transaction.debtorPhotoURL = _debtorData.photoURL;
      }

      var _receiverData = this._searchUser(_recurringBillsBase[i].receiver);

      if(_receiverData != null) {
        _transaction.receiverDisplayName = _receiverData.displayName;
        _transaction.receiverPhotoURL = _receiverData.photoURL;
      }

      _transaction.description = _recurringBillsBase[i].description;
      _transaction.value = _recurringBillsBase[i].value;

      _recurringBillList.push(_transaction);
    }

    return _recurringBillList;
  }

  _searchUser(userUid){
    var _userList = this.state.userList;

    for (var i = 0; i < _userList.length; i++) {
      if (_userList[i].uid === userUid) {
        return _userList[i];
      }
    }
  }

  _deleteTransaction(id) {
    deleteInFirebaseCollection('recurringBills', id);
  }

  render() {
    return (
      <Paper className='paper table'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Receiver</TableCell>
              <TableCell />
              <TableCell>Debtor</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.recurringBillsList.map((transaction) => (
              <TableRow>
                <TableCell>
                  {transaction.debtorDisplayName != null ? 
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
                          src={transaction.receiverPhotoURL} 
                        />
                      </Grid>
                      <Grid>
                        {transaction.receiverDisplayName}  
                      </Grid>
                    </Grid>                  
                  :
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
                  }
                </TableCell>
                <TableCell>
                  <ArrowBackIcon />
                </TableCell>
                <TableCell>
                  {transaction.debtorDisplayName != null ? 
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
                          src={transaction.debtorPhotoURL} 
                        />
                      </Grid>
                      <Grid>
                        {transaction.debtorDisplayName}  
                      </Grid>
                    </Grid>                  
                  :
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
                  }
                </TableCell>
                <TableCell>
                  {transaction.description}
                </TableCell>
                <TableCell>
                  R$ {transaction.value}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => this._deleteTransaction(transaction.id)}
                    className='menuButton'
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default RecurringBillsList;
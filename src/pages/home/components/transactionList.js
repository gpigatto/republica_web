// eslint-disable-next-line max-classes-per-file
import React, { Component } from 'react';

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Grid,
  IconButton,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import firebase from '../../../core/firebaseConfig';

import { firebaseCollectionListener } from '../functions/firebaseCollectionListener';
import { getUserList } from '../functions/getUserList';
import { deleteInFirebaseCollection } from '../functions/deleteInFirebaseCollection';
import { getSheetList } from '../functions/getSheetList';

import './transactionList.css';

class TransactionClass {
  id;

  debtorDisplayName;

  debtorPhotoURL;

  receiverDisplayName;

  receiverPhotoURL;

  description;

  value;

  sheet;
}

class TransactionList extends Component {
  constructor(props) {
    super(props);

    this.db = firebase.firestore();

    this.state = {
      transactionList: [],
      userList: [],
      sheetList: [],
    };
  }

  componentDidMount() {
    this._getUserList();
    this._getSheetList();
  }

  async _getUserList() {
    this.setState({
      userList: await getUserList(),
    });
    this._addCollectionListener();
  }

  _addCollectionListener() {
    const self = this;

    firebaseCollectionListener('transaction', (data) => {
      const _transactionListBase = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      self.setState({
        transactionList: self._generateTransactionList(_transactionListBase),
      });
    });
  }

  async _getSheetList() {
    this.setState({
      sheetList: await getSheetList(),
    });
  }

  _generateTransactionList(transactionListBase) {
    const _transactionList = [];

    for (let i = 0; i < transactionListBase.length; i += 1) {
      const _transaction = new TransactionClass();

      _transaction.id = transactionListBase[i].id;

      const _debtorData = this._searchUser(transactionListBase[i].debtor);

      if (_debtorData != null) {
        _transaction.debtorDisplayName = _debtorData.displayName;
        _transaction.debtorPhotoURL = _debtorData.photoURL;
      }

      const _receiverData = this._searchUser(transactionListBase[i].receiver);

      if (_receiverData != null) {
        _transaction.receiverDisplayName = _receiverData.displayName;
        _transaction.receiverPhotoURL = _receiverData.photoURL;
      }

      const _sheetData = this._searchSheet(transactionListBase[i].sheet);

      if (_sheetData != null) {
        _transaction.sheet = _sheetData.name;
      }

      _transaction.description = transactionListBase[i].description;
      _transaction.value = transactionListBase[i].value;

      _transactionList.push(_transaction);
    }

    return _transactionList;
  }

  _searchUser(userUid) {
    const _userList = this.state.userList;

    for (let i = 0; i < _userList.length; i++) {
      if (_userList[i].uid === userUid) {
        return _userList[i];
      }
    }
  }

  _searchSheet(sheetID) {
    const _sheetList = this.state.sheetList;

    for (let i = 0; i < _sheetList.length; i++) {
      if (_sheetList[i].id === sheetID) {
        return _sheetList[i];
      }
    }
  }

  _deleteTransaction(id) {
    deleteInFirebaseCollection('transaction', id);
  }

  render() {
    return (
      <Paper className="paper table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Receiver</TableCell>
              <TableCell />
              <TableCell>Debtor</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Sheet</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.transactionList.map((transaction) => (
              <TableRow>
                <TableCell>
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
                        src={transaction.receiverPhotoURL}
                      />
                    </Grid>
                    <Grid>{transaction.receiverDisplayName}</Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <ArrowBackIcon />
                </TableCell>
                <TableCell>
                  {transaction.debtorDisplayName != null ? (
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
                          src={transaction.debtorPhotoURL}
                        />
                      </Grid>
                      <Grid>{transaction.debtorDisplayName}</Grid>
                    </Grid>
                  ) : (
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
                      <Grid>Casa</Grid>
                    </Grid>
                  )}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  R$
                  {transaction.value}
                </TableCell>
                <TableCell>{transaction.sheet}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => this._deleteTransaction(transaction.id)}
                    className="menuButton"
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

export default TransactionList;

import React, { Component } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import firebase from '../../../core/firebaseConfig';

class TotalValue extends Component {
  constructor(props) {
    super(props);

    this.db = firebase.firestore();

    this.state = {

    };
  }

  render() {
    return (
      <Paper className="paper">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="h4" component="h4">
                  Valor Total
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h2" component="h2">
                  R$ 123.45
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="subtitle1">
                  A planilha fecha dia 05/09
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default TotalValue;

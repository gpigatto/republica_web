import * as React from 'react';

import { Grid } from '@material-ui/core';
import Header from '../shared/Header';

export class Total extends React.PureComponent {
  render() {
    return (
      <Grid container direction="column">
        <Header />
      </Grid>
    );
  }
}

export default Total;

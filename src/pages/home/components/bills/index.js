import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import React, { PureComponent } from 'react';

export default class index extends PureComponent {
  render() {
    return (
      <Card className>
        <CardContent>
          <Grid container direction="row" justify="space-between" spacing={2}>
            <Grid item container xs={12} alignItems="center">
              <Typography variant="h4">Contas da Casa</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Aluguel</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="right">R$ 00,00</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Água</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="right">R$ 00,00</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Luz</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="right">R$ 00,00</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Internet</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="right">R$ 00,00</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

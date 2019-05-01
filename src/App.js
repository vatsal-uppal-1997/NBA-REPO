import React, { useState } from 'react';
import Teams from "./components/Teams";
import Games from "./components/Games";
import Typography from '@material-ui/core/Typography';
import { Toolbar, Grid, withStyles, Tabs, Tab, Paper } from '@material-ui/core';


const style = {
  heading: {
    width: "100%",
    textAlign: "center",
    marginTop: "5rem",
    color: "#f16d32"
  },
  tabSelected: {
    background: "#f16d32",
    color: "white"
  }
};

function App(props) {
  const { classes } = props;
  const [currentTab, setCurrentTab] = useState(0);
  function handleTabChange(e, val) {
    setCurrentTab(val);
  }
  return (
    <div className="App">
      <Toolbar>
        <Grid container justify="center" className={classes.heading}>
          <Typography variant="h3" color="inherit">
            NBA REPO
          </Typography>
        </Grid>
      </Toolbar>
      <Grid container justify="center" spacing={40} style={{marginTop:"5rem"}}>
        <Grid item xs={12} lg={9} md={10}>
          <Paper>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="fullWidth"
            centered
            style={{ width: "100%" }}
          >
            <Tab label="NBA Teams" classes={{ selected: classes.tabSelected }} />
            <Tab label="NBA Games" classes={{ selected: classes.tabSelected }} />
          </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={9} md={10}>
          {
            currentTab === 0?<Teams></Teams>:<Games></Games>
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(style)(App);

import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { IconButton, Typography } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menubar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Menu(props) {
  const classes = useStyles();

  return (
    <Navbar collapseOnSelect expand="lg" className={classes.menubar}>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">
            <IconButton>
              <DashboardIcon />
              <Typography> Dashboard</Typography>
            </IconButton>
          </Nav.Link>
          <Nav.Link href="/dashboard">
            <IconButton>
              <ShowChartIcon />
              <Typography>Sentiment Score</Typography>
            </IconButton>
          </Nav.Link>
          <Nav.Link href="/dashboard">
            <IconButton>
              <AccountBoxIcon />
              <Typography>Profile</Typography>
            </IconButton>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;

import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
const useStyles = makeStyles((theme) => ({
  addButton: {
    height: 250,
    width: "100%",
    backgroundColor: "#cbce91"
  }
}));


function AddNewEntryButton(props) {
  const classes = useStyles();

  let handleClick =() =>{
    props.setShowPopup(true);
    props.setModalType("default");
    props.setFormType("add");
  }

  return (
    <Button className={classes.addButton} onClick={() => handleClick()}><AddBoxIcon /><Typography>Add New Entry</Typography></Button>
  )
}

export default AddNewEntryButton

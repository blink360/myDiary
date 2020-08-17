import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from "@material-ui/core";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import banner from "../assets/images/entry_heading_banner.png";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 250,
    cursor:"pointer"
  },
  cardHeader: {
    backgroundImage: `url(${banner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%"
  }
}));

function EntryCard(props) {
  document.title = `Dashboard`;
  const classes = useStyles();

  let handleClick = () => {
    props.setModalData(props.data);
    props.setShowPopup(true);
    props.setModalType("info");
  }

  return (
    <Card variant="outlined" className={classes.card} onClick={() => handleClick()}>
      <CardHeader title={props.title} className={classes.cardHeader} />
      <CardContent>
        <Typography variant="h6">{props.date.split(' ')[0]} <Typography align="right">{props.date.split(' ')[1]} </Typography> </Typography>
        <Typography paragraph>{props.body.substring(0, 150)}...</Typography>
      </CardContent>
    </Card>
  );
}

export default EntryCard;

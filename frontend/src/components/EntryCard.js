import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from "@material-ui/core";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "auto",
  },
  actionIcons: {
    marginLeft: "auto",
    border: 0,
  },
}));

function EntryCard(props) {
  document.title = `Dashboard`;
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.card}>
      <CardActionArea>
        <CardHeader title={props.title} />
        <CardContent>
          <Typography variant="h6">{props.date}</Typography>
          <Typography paragraph>{props.body.substring(0, 150)}...</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default EntryCard;

import React from "react";
import Appbar from "../components/Appbar";
import EntryCard from "../components/EntryCard";
import Menu from "../components/Menu";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import _ from "lodash";
import { usePrevious } from "../functions/usePrevious";

const useStyles = makeStyles((theme) => ({
  cards: {
    marginTop: theme.spacing(2),
  },
}));

function DashboardPage(props) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const classes = useStyles();
  let [diaryEntries, setDiaryEntries] = React.useState([]);
  const prevDiaryEntries = usePrevious(diaryEntries);

  const fetchEntries = async () => {
    await axios
      .post("http://localhost:8000/entries/listAll", {
        userId: sessionStorage.getItem("userId"),
      })
      .then((response) => {
        setDiaryEntries(response.data);
      });
  };

  if (!isLoggedIn) {
    props.history.push("/login");
  }

  React.useEffect(() => {
    if (!_.isEqual(prevDiaryEntries, diaryEntries)) {
      fetchEntries();
      console.log(diaryEntries);
    }
  }, [diaryEntries, prevDiaryEntries]);

  return (
    <>
      <Appbar />
      <Menu />
      <Grid
        container
        className={classes.cards}
        spacing={2}
        direction="row"
        alignItems="flex-start"
        justify="flex-start"
      >
        {diaryEntries.map((item, index) => {
          return (
            <Grid key={index} item xs={12} sm={4}>
              <EntryCard
                key={item.id}
                title={item.title}
                body={item.entry}
                date={item.date}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default DashboardPage;

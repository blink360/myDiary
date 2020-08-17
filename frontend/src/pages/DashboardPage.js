import React from "react";
import Appbar from "../components/Appbar";
import EntryCard from "../components/EntryCard";
import Menu from "../components/Menu";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import _ from "lodash";
import { usePrevious } from "../functions/usePrevious";
import AddNewEntryButton from "../components/AddNewEntryButton";
import Popup from "../components/Popup";

const useStyles = makeStyles((theme) => ({
  cards: {
    marginTop: theme.spacing(2),
  },
}));

function DashboardPage(props) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const classes = useStyles();
  let [diaryEntries, setDiaryEntries] = React.useState([]);
  let [modalData,setModalData] = React.useState([]);
  let [modalType,setModalType] = React.useState("default");
  let [showPopup,setShowPopup] = React.useState(false);
  let [formType,setFormType] = React.useState("add");

  const prevDiaryEntries = usePrevious(diaryEntries);

  const fetchEntries = async () => {
    await axios
      .post("http://localhost:8000/entries/listAll", {
        userId: sessionStorage.getItem("userId"),
      })
      .then((response) => {
        setDiaryEntries(response.data);
        //setDisplayData(response.data);
      });
  };

  if (!isLoggedIn) {
    props.history.push("/login");
  }

  React.useEffect(() => {
    if (!_.isEqual(prevDiaryEntries, diaryEntries)) {
      fetchEntries();
    }
    else{
      return
    }
  }, [diaryEntries,prevDiaryEntries]);

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
        <Grid item xs={12} sm={4} md={3}>
          <AddNewEntryButton setShowPopup={setShowPopup} setModalType={setModalType} setFormType={setFormType}/>
        </Grid>
        {diaryEntries.sort((a,b) => {return (b.id - a.id)}).map((item, index) => {
          return (
            <Grid key={index} item xs={12} sm={4} md={3}>
              <EntryCard
                key={item.id}
                title={item.title}
                body={item.entry}
                date={item.date}
                data = {item}
                setModalData={setModalData}
                showPopup={showPopup} 
                setShowPopup={setShowPopup}
                setModalType={setModalType}
              />
            </Grid>
          );
        })}
      </Grid>
      <Popup showPopup={showPopup} setShowPopup={setShowPopup} type={modalType} data={modalData} setModalType={setModalType} formType={formType} setFormType={setFormType}/>
    </>
  );
}

export default DashboardPage;

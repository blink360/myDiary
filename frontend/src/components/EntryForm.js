import React from 'react'
import { TextField, makeStyles, Button, Typography } from '@material-ui/core'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function EntryForm(props) {
    const [title, setTitle] = React.useState("");
    const [entry, setEntry] = React.useState("");

    let addUrl = "http://localhost:8000/entries/create";
    let updateUrl = "http://localhost:8000/entries/update";
    let handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    let handleEntryChange = (event) => {
        setEntry(event.target.value);
    };

    let submit = () => {
        props.type === "add" ?
            axios.post(addUrl, {
                userId: sessionStorage.getItem("userId"),
                title: title,
                entry: entry,
            })
            :
            axios.put(updateUrl,{
                userId: sessionStorage.getItem("userId"),
                title: title,
                entry: entry,
                entryId: props.formData.id
            })
    };

    let handleKeyPress = (e) => {
        if (e.key === "enter") {
            submit();
        }
    }

    const classes = useStyles();
    return (
        <div>
            <form className={classes.form} noValidate autoComplete="off" >
                <Typography variant="h4" align="center">{props.type === "update" ?"Edit a Diary Entry": "Create a Diary Entry"}</Typography>
                <TextField variant="outlined" id="standard-basic" margin="normal" label="Title" onChange={handleTitleChange} defaultValue={props.type === "update" ? props.formData.title : ""} required fullWidth />
                <TextField variant="outlined" id="standard-basic" margin="normal" label="Entry" onChange={handleEntryChange} defaultValue={props.type === "update" ? props.formData.entry : ""} required fullWidth multiline rows={5} />
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={submit}
                    onKeyDown={(e) => handleKeyPress(e)}
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default EntryForm

import React from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    IconButton
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
const useStyles = makeStyles((theme) => ({
    card: {
        height: "70vh",
        width: "100%"
    },
    buttons: {
        marginLeft: "auto"
    },
    mainContent: {
        height: "60%",
        overflow:"auto"
    },
    sentimentIcon: {
        height: 50,
        width: 50,
    }
}));


function EntryDetails(props) {
    const classes = useStyles();
    let analyzeSentiment = () => {
        let sentimentScore = props.data.sentimentScore;
        switch (true) {
            case sentimentScore > 1:
                return <SentimentVerySatisfiedIcon className={classes.sentimentIcon} style={{ color: "green" }} />
            case sentimentScore >= 0 && sentimentScore < 1:
                return <SentimentSatisfiedIcon className={classes.sentimentIcon} />
            case sentimentScore < 0 && sentimentScore > -1:
                return <SentimentDissatisfiedIcon className={classes.sentimentIcon} />
            case sentimentScore < -1:
                return <SentimentVeryDissatisfiedIcon className={classes.sentimentIcon} style={{ color: "red" }} />
            default:
                return <SentimentSatisfiedIcon className={classes.sentimentIcon} />
        }
    }

    let handleClick = () => {
        props.setModalType("default");
        props.setFormType("update");
    }

    return (
        <Card variant="outlined" className={classes.card}>
            <CardHeader title={props.data.title} className={classes.cardHeader} />
            <CardContent className={classes.mainContent}>
                <Typography variant="h6">{props.data.date}</Typography>
                <Typography paragraph>{props.data.entry}</Typography>
            </CardContent>
            <CardContent>
                <Typography align="center">Sentiment Analysis: </Typography>
                <Typography align="center" > {analyzeSentiment()}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton className={classes.buttons} onClick={() => handleClick()}><EditIcon /></IconButton>
                <IconButton ><DeleteIcon /></IconButton>
            </CardActions>
        </Card>
    );
}

export default EntryDetails

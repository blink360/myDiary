import React from 'react'
import EntryForm from './EntryForm';
import { Modal, makeStyles, Grid } from '@material-ui/core';
import EntryDetails from './EntryDetails';

const useStyles = makeStyles(() => ({
    modal: { display: 'flex', alignItems: 'center', justifyContent: 'center' },

    modalContent: {
        backgroundColor: "white",
        margin: "auto",
        height: "80vh",
        alignSelf: "center",
        justifySelf: "center"
    }
}));

function Popup(props) {
   
    const classes = useStyles();
    const handleClose = () => {
        props.setShowPopup(false);
    };

    return (
        <Modal
            open={props.showPopup}
            onClose={handleClose}
            className={classes.modal}>
            <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                justify="center"
                className={classes.modalContent}
            >
                <Grid item xs={12} sm={6}>
                    {props.type ==="default" ? <EntryForm type={props.formType} formData={props.data}/> : <EntryDetails data={props.data} setModalType={props.setModalType} setFormType={props.setFormType}/>} 
                </Grid>
            </Grid>

        </Modal>


    )
}

export default Popup

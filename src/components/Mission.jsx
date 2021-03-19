import React from 'react';
import { useQuery } from '@apollo/client';
import {MissionQuery} from '../service/mission.service'
import { makeStyles } from '@material-ui/core/styles';
import {ArrowBack, ArrowForward} from '@material-ui/icons';
import {Modal} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  },  
}));

function Mission ({ id, handleClose, open }) { 
  
  const classes = useStyles();

  const { loading, error, data } = useQuery(MissionQuery, { variables: { missionId: id }, }, );
  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return (<div>error</div>);
  }
  if (loading) {
    return (
      <div>
        Loading...
      </div>);
  }  
  else {
    const {name, twitter, website, wikipedia, description, manufacturers}=data.mission;

    const body = (
      <div className={classes.paper}>
      <h2 id="modal-title"><ArrowBack/>{name}<ArrowForward/></h2>
        <p id="modal-description">
          {description}
        </p>
      </div>
    );
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {body}
      </Modal>
    
    )
  }
}

export default Mission;
import React from 'react';
import { useQuery } from '@apollo/client';
import {MissionQuery} from '../service/mission.service'
import { makeStyles } from '@material-ui/core/styles';
import {ArrowBack, ArrowForward, Twitter, Language, FavoriteBorder} from '@material-ui/icons';
import { actionDispatch, stateSelector } from '../store/helpers';
import { useDispatch, useSelector } from 'react-redux';
import {Modal} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 400,
    overflow: 'scroll',
    width: 400,
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  },  
}));



function Mission ({ id, handleClose, open }) { 
  
  const classes = useStyles();
  const {favourites} = useSelector(stateSelector);
  const {setFavourites} = actionDispatch(useDispatch());

  const [page, setPage] = React.useState(48);

  const onClose=()=>{
    setPage(48);
    handleClose();
  }
  const handleAdd = (mission)=>{
    setFavourites(mission);
    setPage(48);
  }
  
  function modalData(data){
    const {name, twitter, website, wikipedia, description, manufacturers}=data.mission;

    const amount = favourites.some(fav=> fav.id===id)?3:4;
    
    const body = (
        <div className={classes.paper}>
        <h2 id="modal-title"><ArrowBack onClick={()=>setPage(page-1)} />{name}<ArrowForward onClick={()=>setPage(page+1)}/></h2>
          <span id="modal-description">
            {Math.abs(page%amount)==0 && description}
            {Math.abs(page%amount)==1 && <div>Created by: {manufacturers.map((producer, id)=>{
            return <div key={id}>{producer}</div>})}</div>}
            {Math.abs(page%amount)==2 && <div>More info can be found on: {twitter && <a href={twitter}><Twitter /></a>}{website && <a href={website}><Language href={website}/></a>}</div>}
            {Math.abs(page%amount)==3 && <div>Follow to be up to date! <FavoriteBorder onClick={()=> handleAdd({name, id})}/></div>}
          </span>
        </div>
    );
    return body;
  }

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

    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {modalData(data)}
      </Modal>
    
    )
  }
}

export default Mission;
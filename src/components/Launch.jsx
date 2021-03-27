import React from 'react';
import { useQuery } from '@apollo/client';
import {LaunchQuery} from '../service/mission.service'
import { makeStyles } from '@material-ui/core/styles';
import {ArrowBack, ArrowForward, FavoriteBorder} from '@material-ui/icons';
import { actionDispatch, stateSelector } from '../store/helpers';
import { useDispatch, useSelector } from 'react-redux';
import {CircularProgress, Modal} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    backgroundColor: '#2c2c2c',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 400,
    overflow: 'auto',
    width: 400,
    top: '30%',
    left: '35%',
  },  
}));



function Mission ({ id, handleClose, open }) { 
  
  const classes = useStyles();
  const {favourites} = useSelector(stateSelector);
  const {setFavourites} = actionDispatch(useDispatch());
  const { loading, error, data } = useQuery(LaunchQuery, { variables: { launchId: id }, }, );

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
    const {details, links, mission_name, launch_success, launch_date_local}=data.launch;

    const amount = favourites.some(fav=> fav.id===id)?3:4;
    const body = (
        <div className={classes.modal}>
        <h2 style={{textAlign: 'center'}} id="modal-title">
          <ArrowBack style={{float: 'left', cursor: 'pointer'}} onClick={()=>setPage(page-1)} />
          {mission_name}
          <ArrowForward style={{float: 'right', cursor: 'pointer'}} onClick={()=>setPage(page+1)}/>
        </h2>
          <span id="modal-description">
            {Math.abs(page%amount)==0 && <div>{details?details:'No details.'}</div>}
            {Math.abs(page%amount)==1 && <div>Launch started {launch_date_local} and was {launch_success? 'successful.': 'unsuccessful.'}</div>}
            {Math.abs(page%amount)==2 && <div>More info can be found on: {Object.keys(links).map((key, id)=>{if(key!=="__typename")
            return <div><a href={links[key]} key={id}>{links[key]}</a></div>})}</div>}
            {Math.abs(page%amount)==3 && <div>Follow to be up to date! <FavoriteBorder className="fav" onClick={()=> handleAdd({name, id})}/></div>}
          </span>
        </div>
    );
    return body;
  }

  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return (<div>error</div>);
  }
  if (loading) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      ><div className={classes.modal}>
        <CircularProgress style={{margin: '30% 30%'}} size={100}/></div>
      </Modal>);
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
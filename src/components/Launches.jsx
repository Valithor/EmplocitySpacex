import React, {useRef, useCallback} from 'react';
import {LaunchesQuery} from '../service/mission.service'
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import { makeStyles, TableCell, TableRow, TableBody, Table, IconButton, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { actionDispatch, stateSelector } from '../store/helpers';


const useStyles = makeStyles((theme) => ({
    tr: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(30),
      },
      '&:hover': {
        cursor: "pointer",
        opacity: 0.9,
     },
    },    
  }));

function Launches ({ handleOpen, type }) {

    const classes = useStyles();
    const { loading, data, error, fetchMore } = useQuery(LaunchesQuery, { variables: { offset: 0, limit: 20 }, },);
    const {favourites} = useSelector(stateSelector);
    const {setFavourites, removeFavourites} = actionDispatch(useDispatch());
    const observer = useRef();  

    const stopProp =(e, item) => {
        e.stopPropagation();
        if(favourites.some(fav=> fav===item))
        removeFavourites(item.id);
        else
        setFavourites(item);
    }

    const loadMore = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && !error) {
            fetchMore({
                variables: {
                  offset: data.launches.length
                },
              })          }
        })
        if (node) observer.current.observe(node)
      }, [loading, data])

    if(loading)
        return <CircularProgress style={{marginLeft: '50%'}} size={100}/>
    else{
        const launches = type==='favs'?favourites:data.launches;
        console.log(favourites)
        return (
                <Table className="missions-table">                 
                    <TableBody>
                        {launches.map(({id, links, mission_name}, i) => {
                            return <TableRow onClick={() => handleOpen(id)} style ={ i % 2? { background : "#00003f" }:{ background : "#000000" } } className={classes.tr} key={i} ref={data.launches.length === i+1 && !error?loadMore:null}>
                                <TableCell style={{color: 'white'}}>{mission_name ? mission_name: "Unnamed"}</TableCell>
                                <TableCell align="center"><div className="fav"><IconButton color="inherit" onClick={(e)=> stopProp(e, data.launches[i])}>{favourites.some(fav=> fav.id===id)?<Favorite/>:<FavoriteBorder/>}</IconButton></div></TableCell>
                                <TableCell align="center"><img className="small-photo" alt={mission_name} src={links.mission_patch_small}/></TableCell>
                            </TableRow>                   
                        })}
                    </TableBody>
                </Table>
        ) }   
}

export default Launches;
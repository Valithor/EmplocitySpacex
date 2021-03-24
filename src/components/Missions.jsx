import React, {useRef, useCallback} from 'react';
import {MissionsQuery} from '../service/mission.service'
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { actionDispatch, stateSelector } from '../store/helpers';


function Missions ({ handleOpen, type }) {

    const { loading, data, error, fetchMore } = useQuery(MissionsQuery, { variables: { offset: 0, limit: 4 }, },);
    const {favourites} = useSelector(stateSelector);
    const {setFavourites, removeFavourites} = actionDispatch(useDispatch());
    const observer = useRef();

    const loadMore = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && !error) {
            fetchMore({
                variables: {
                  offset: data.missions.length
                },
              })          }
        })
        if (node) observer.current.observe(node)
      }, [loading, data])

    if(loading)
        return <div>Loading</div>
    else{
        const missions = type==='favs'?favourites:data.missions;
        return (
            <div>
                <table className="missions-table">                 
                    <tbody>
                        {missions.map(({name, id}, i) => {
                            return <tr key={i} ref={data.missions.length === i+1?loadMore:null}>
                                <td><a onClick={() => handleOpen(id)}>{name == null ? "Unnamed" : name}</a></td>
                                {console.log(favourites)}
                                <td>{favourites.some(fav=> fav.id==id)?<Favorite onClick={()=> removeFavourites(id)}/>:<FavoriteBorder onClick={()=> setFavourites(data.missions[i])}/>}</td>
                                <td><img className="small-photo" src="https://c.files.bbci.co.uk/11459/production/_116054707_spacex.jpg"/></td>
                            </tr>                          
                        })}
                    </tbody>
                </table>
            </div>
        ) }   
}

export default Missions;
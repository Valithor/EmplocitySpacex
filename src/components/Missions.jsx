import React from 'react';
import {MissionsQuery} from '../service/mission.service'
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import { useQuery } from '@apollo/client';

function Missions ({ handleOpen }) {

    const { loading, error, data } = useQuery(MissionsQuery);

    if (loading) {

        return (<div>
            Loading...
        </div>);
    }
    else {
        return (
            <div>
                <table className="missions-table">                 
                    <tbody>
                        {data.missions.map(({name, id}, i) => {
                            return <tr key={i}>
                                <td><div onClick={() => handleOpen(id)}>{name == null ? "Unnamed" : name}</div></td>
                                <td><FavoriteBorder/></td>
                                <td><img className="small-photo" src="https://c.files.bbci.co.uk/11459/production/_116054707_spacex.jpg"/></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Missions;
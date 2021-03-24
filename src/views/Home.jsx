import React from 'react';
import Missions from '../components/Missions';
import Mission from '../components/Mission';

function Home (type) {  
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState();
  
    const handleOpen = (id) =>{
      setOpen(true);
      setId(id);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

        return (
            <div>
                <Missions handleOpen={handleOpen} type={type.type}></Missions>
                {open && <Mission id={id} handleClose={handleClose} open={open}></Mission>}
            </div >
        );
    }


export default Home;
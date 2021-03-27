import React from 'react';
import Launches from '../components/Launches';
import Launch from '../components/Launch';

function Home (type) {  
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState();
  
    const handleOpen = (id) =>{
      setOpen(true);
      setId(id);
    };
        return (
            <div>&nbsp;
                <Launches handleOpen={handleOpen} type={type.type}></Launches>
                {open && <Launch id={id} handleClose={()=>setOpen(false)} open={open}></Launch>}
            </div >
        );
    }


export default Home;
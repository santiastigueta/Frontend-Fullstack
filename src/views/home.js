import React from 'react'
import { Link } from 'react-router-dom';
import SeriesCardContainer from '../components/SeriesCard/SeriesCardContainer';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { createTheme } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const home = () => {
    return (
        <div>
            <Link to="/create">
                <Fab color="primary" aria-label="add">
                    <AddIcon color="color" className='addIcon'></AddIcon>
                </Fab>
            </Link> 
            <SeriesCardContainer></SeriesCardContainer>
        </div>
    );
};

export default home;

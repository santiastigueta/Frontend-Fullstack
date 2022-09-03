import React from 'react'
import { Link } from 'react-router-dom';
import DisplayAllSeries from '../components/SeriesCard/SeriesCard';

const home = () => {
    return (
        <div>
            <Link to="/create">Crear Serie</Link>
            <DisplayAllSeries></DisplayAllSeries>
        </div>
    );
};

export default home;

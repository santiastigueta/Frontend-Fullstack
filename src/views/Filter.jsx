import { Autocomplete } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const Filter = () => {
    // filtros por género, año de estreno y puntuación
    const [genderValue, setGenderValue] = useState(0);
    const [inputGenderValue, setInputGenderValue] = useState('');

    const [estrenoValue, setEstrenoValue] = useState(0);
    const [inputEstrenoValue, setInputEstrenoValue] = useState('');

    const [ratingValue, setRatingValue] = useState(0);
    const [inputRatingValue, setInputRatingValue] = useState('');
  return (
    <Autocomplete
        value={genderValue}
    />
  )
}

export default Filter
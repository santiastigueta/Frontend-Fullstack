import React from 'react'
import Buscador from '../../components/AutoComplete/autoComplete';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  fontSize: 18,
  marginBottom: 15,
  padding: theme.spacing(1),
}));

const Search = () => {
  return (
    <>
      <Div>{"Si no encuentra su serie, búsquela aquí."}</Div>
      <Buscador></Buscador>
    </>
  )
}

export default Search;
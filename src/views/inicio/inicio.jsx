import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../App';

const Inicio = () => {
  const [currentUser] = useContext(UserContext);
  console.log("CURRENT USER: ",currentUser);
  return (
    <h1>Landing Page</h1>
  )
}

export default Inicio
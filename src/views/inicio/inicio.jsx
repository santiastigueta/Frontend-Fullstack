import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../App';

const Inicio = () => {
  const [user] = useContext(UserContext);
  if (!user.accesstoken) return <Redirect from='' to='login' noThrow/>
  return (
    <h1>Contenido! :D</h1>
  )
}

export default Inicio
import { gql } from '@apollo/client';

// eliminar getallseries
export const getAllSeries = gql `
  query GetAllSeries {
    getAllSeries {
      _id
      name
      author
      rating
      releaseDate
      image
      gender
      name_lower
    }
  }
`;
export const getAllseriesUser = gql `
  query GetAllseriesUser($userId: ID) {
    getAllseriesUser(userId: $userId) {
      _id
      author
      gender
      image
      name
      name_lower
      rating
      releaseDate
    }
  }
`;
export const getSerie = gql `
  query GetSerie($idSerie: ID) {
  getSerie(idSerie: $idSerie) {
    _id
    name
    author
    rating
    releaseDate
    image
    gender
  }
}
`;
/* export const getSerieBusqueda = gql `
  query GetSerieBusqueda {
    getSerieBusqueda {
      _id
      name
  }
}
`; */

/* export const getSerieFilter = gql `
  query GetSerieFilter($filter: String!) {
    getSerieFilter(filter: $filter) {
      _id
      name
      author
      rating
      releaseDate
      gender
      image
    }
  }
`; */

export const DELETE_SERIE_FROM_USER = gql `
  mutation DeleteSeriesFromUser($userId: ID!, $serieId: ID!) {
  deleteSeriesFromUser(userId: $userId, serieId: $serieId)
}
`;

export const CREATE_SERIE = gql `
  mutation CreateSerie($nombre: String!, $autor: String, $estrellas: String, $fechaLanzamiento: String, $image: String, $gender: String, $userId: String!) {
  createSerie(nombre: $nombre, autor: $autor, estrellas: $estrellas, fechaLanzamiento: $fechaLanzamiento, image: $image, gender: $gender, userId: $userId) 
}`;

// Solo apto para admins y para el usuario creador. 
export const DELETE_SERIE = gql `
  mutation DeleteSerie($idSerie: ID!) {
  deleteSerie(idSerie: $idSerie) {
    _id
    name
    author
    rating
    releaseDate
    image
    gender
  }
}
`;

export const UPDATE_SERIE = gql `
  mutation UpdateSerie($idSerie: ID, $nombre: String, $autor: String, $estrellas: String, $fechaLanzamiento: String, $image: String, $gender: String) {
  updateSerie(idSerie: $idSerie, nombre: $nombre, autor: $autor, estrellas: $estrellas, fechaLanzamiento: $fechaLanzamiento, image: $image, gender: $gender) {
    _id
    name
    author
    rating
    releaseDate
    image
    gender
  }
}
`;
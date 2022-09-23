import { gql } from '@apollo/client';

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
export const getSerieBusqueda = gql `
  query GetSerieBusqueda {
    getSerieBusqueda {
      _id
      name
  }
}
`;

export const getSerieFilter = gql `
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
`;

export const CREATE_SERIE = gql `
  mutation CreateSerie($nombre: String!, $autor: String, $estrellas: String, $fechaLanzamiento: String, $image: String, $gender: String) {
  createSerie(nombre: $nombre, autor: $autor, estrellas: $estrellas, fechaLanzamiento: $fechaLanzamiento, image: $image, gender: $gender) {
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
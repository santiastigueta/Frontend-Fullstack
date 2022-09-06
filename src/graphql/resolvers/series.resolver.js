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
  }
}
`;

export const CREATE_SERIE = gql `
  mutation CreateSerie($nombre: String!, $autor: String, $estrellas: String, $fechaLanzamiento: String, $image: String) {
  createSerie(nombre: $nombre, autor: $autor, estrellas: $estrellas, fechaLanzamiento: $fechaLanzamiento, image: $image) {
    _id
    name
    author
    rating
    releaseDate
    image
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
  }
}
`;
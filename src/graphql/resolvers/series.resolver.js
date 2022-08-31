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
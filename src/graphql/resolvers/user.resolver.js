import { gql } from "@apollo/client";

export const REGISTER_USUARIO = gql `
  mutation RegisterUsuario(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUsuario(username: $username, email: $email, password: $password) {
      email
      username
      password
    }
  }
`;

export const LOGIN_USUARIO = gql `
  query LoginUsuario($email: String!, $password: String!) {
  loginUsuario(email: $email, password: $password) {
    bio
    email
    image
    password
    series {
      name
    }
  }
}
`;
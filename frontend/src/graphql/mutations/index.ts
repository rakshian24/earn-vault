import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment UserFields on User {
    _id
    username
    email
  }
`;

// --- Mutations ---

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      token
      user {
        ...UserFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const LOGIN_MUTATION = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      token
      user {
        ...UserFields
      }
    }
  }
  ${USER_FRAGMENT}
`;
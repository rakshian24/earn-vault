import gql from "graphql-tag";

// --- Queries ---
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
    }
  }
`;
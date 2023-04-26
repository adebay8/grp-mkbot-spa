import { gql } from "@apollo/client";

export const GET_STORE = gql`
  query GetStore($name: String!) {
    store(name: $name) {
      address
      id
      image
      logo
      name
      rectangularLogo
      description
      category {
        name
      }
    }
  }
`;

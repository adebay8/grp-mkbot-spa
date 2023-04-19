import { gql } from "@apollo/client";

export const GET_STORES = gql`
  query GetStores($name: String) {
    stores(name: $name) {
      id
      image
      logo
      name
    }
  }
`;

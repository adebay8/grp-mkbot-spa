import { gql } from "@apollo/client";

export const GET_STORES = gql`
  query GetStores($name: String) {
    stores: stores(name: $name) {
      id
      image
      logo
      name
      category {
        name
        externalId
      }
    }
    categories: categories(name: $name) {
      name
      externalId
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories($name: String) {
    categories(name: $name) {
      name
      externalId
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_STORES = gql`
  query GetStores($storeName: String, $categoryName: String) {
    stores: stores(name: $storeName, category: $categoryName) {
      id
      image
      logo
      name
      category {
        name
        externalId
      }
    }
    categories: categories(name: $categoryName) {
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

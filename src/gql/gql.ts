/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetStores($storeName: String, $categoryName: String) {\n    stores: stores(name: $storeName, category: $categoryName) {\n      id\n      image\n      logo\n      name\n      category {\n        name\n        externalId\n      }\n    }\n    categories: categories(name: $categoryName) {\n      name\n      externalId\n    }\n  }\n": types.GetStoresDocument,
    "\n  query GetCategories($name: String) {\n    categories(name: $name) {\n      name\n      externalId\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  mutation GetStoreFromSpeech($uri: String!) {\n    getStoreFromSpeech(uri: $uri) {\n      store {\n        id\n        name\n        description\n      }\n    }\n  }\n": types.GetStoreFromSpeechDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStores($storeName: String, $categoryName: String) {\n    stores: stores(name: $storeName, category: $categoryName) {\n      id\n      image\n      logo\n      name\n      category {\n        name\n        externalId\n      }\n    }\n    categories: categories(name: $categoryName) {\n      name\n      externalId\n    }\n  }\n"): (typeof documents)["\n  query GetStores($storeName: String, $categoryName: String) {\n    stores: stores(name: $storeName, category: $categoryName) {\n      id\n      image\n      logo\n      name\n      category {\n        name\n        externalId\n      }\n    }\n    categories: categories(name: $categoryName) {\n      name\n      externalId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCategories($name: String) {\n    categories(name: $name) {\n      name\n      externalId\n    }\n  }\n"): (typeof documents)["\n  query GetCategories($name: String) {\n    categories(name: $name) {\n      name\n      externalId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GetStoreFromSpeech($uri: String!) {\n    getStoreFromSpeech(uri: $uri) {\n      store {\n        id\n        name\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation GetStoreFromSpeech($uri: String!) {\n    getStoreFromSpeech(uri: $uri) {\n      store {\n        id\n        name\n        description\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
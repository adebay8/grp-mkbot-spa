/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
};

export type AddCategory = {
  __typename?: 'AddCategory';
  category?: Maybe<CategoryType>;
  status?: Maybe<Scalars['Boolean']>;
};

export type AddStore = {
  __typename?: 'AddStore';
  status?: Maybe<Scalars['Boolean']>;
};

export type CategoryType = {
  __typename?: 'CategoryType';
  createdAt: Scalars['DateTime'];
  externalId: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  stores: Array<StoreType>;
  updatedAt: Scalars['DateTime'];
};

/** Debugging information for the current query. */
export type DjangoDebug = {
  __typename?: 'DjangoDebug';
  /** Raise exceptions for this API query. */
  exceptions?: Maybe<Array<Maybe<DjangoDebugException>>>;
  /** Executed SQL queries for this API query. */
  sql?: Maybe<Array<Maybe<DjangoDebugSql>>>;
};

/** Represents a single exception raised. */
export type DjangoDebugException = {
  __typename?: 'DjangoDebugException';
  /** The class of the exception */
  excType: Scalars['String'];
  /** The message of the exception */
  message: Scalars['String'];
  /** The stack trace */
  stack: Scalars['String'];
};

/** Represents a single database query made to a Django managed DB. */
export type DjangoDebugSql = {
  __typename?: 'DjangoDebugSQL';
  /** The Django database alias (e.g. 'default'). */
  alias: Scalars['String'];
  /** Duration of this database query in seconds. */
  duration: Scalars['Float'];
  /** Postgres connection encoding if available. */
  encoding?: Maybe<Scalars['String']>;
  /** Whether this database query was a SELECT. */
  isSelect: Scalars['Boolean'];
  /** Whether this database query took more than 10 seconds. */
  isSlow: Scalars['Boolean'];
  /** Postgres isolation level if available. */
  isoLevel?: Maybe<Scalars['String']>;
  /** JSON encoded database query parameters. */
  params: Scalars['String'];
  /** The raw SQL of this query, without params. */
  rawSql: Scalars['String'];
  /** The actual SQL sent to this database. */
  sql?: Maybe<Scalars['String']>;
  /** Start time of this database query. */
  startTime: Scalars['Float'];
  /** Stop time of this database query. */
  stopTime: Scalars['Float'];
  /** Postgres transaction ID if available. */
  transId?: Maybe<Scalars['String']>;
  /** Postgres transaction status if available. */
  transStatus?: Maybe<Scalars['String']>;
  /** The type of database being used (e.g. postrgesql, mysql, sqlite). */
  vendor: Scalars['String'];
};

export type GetStoreFromSpeech = {
  __typename?: 'GetStoreFromSpeech';
  store?: Maybe<StoreType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory?: Maybe<AddCategory>;
  addStore?: Maybe<AddStore>;
  getStoreFromSpeech?: Maybe<GetStoreFromSpeech>;
};


export type MutationAddCategoryArgs = {
  externalId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationGetStoreFromSpeechArgs = {
  uri: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _debug?: Maybe<DjangoDebug>;
  categories?: Maybe<Array<Maybe<CategoryType>>>;
  stores?: Maybe<Array<Maybe<StoreType>>>;
};


export type QueryCategoriesArgs = {
  name?: InputMaybe<Scalars['String']>;
};

export type StoreType = {
  __typename?: 'StoreType';
  address: Scalars['String'];
  category?: Maybe<CategoryType>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  logo: Scalars['String'];
  name: Scalars['String'];
  rectangularLogo: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type GetStoreFromSpeechMutationVariables = Exact<{
  uri: Scalars['String'];
}>;


export type GetStoreFromSpeechMutation = { __typename?: 'Mutation', getStoreFromSpeech?: { __typename?: 'GetStoreFromSpeech', store?: { __typename?: 'StoreType', id: string, name: string, description: string } | null } | null };


export const GetStoreFromSpeechDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetStoreFromSpeech"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uri"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStoreFromSpeech"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uri"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uri"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetStoreFromSpeechMutation, GetStoreFromSpeechMutationVariables>;
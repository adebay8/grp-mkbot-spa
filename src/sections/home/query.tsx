import { gql } from "@apollo/client";

export const GET_STORE_FROM_SPEECH = gql`
  mutation GetStoreFromSpeech($uri: String!) {
    getStoreFromSpeech(uri: $uri) {
      store {
        id
        name
        description
        category {
          name
        }
      }
      transcription
    }
  }
`;

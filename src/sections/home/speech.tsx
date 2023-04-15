import { gql } from "@apollo/client";

export const GET_STORE_FROM_SPEECH = gql`
  mutation GetStoreFromSpeech($recording: Upload, $uri: String) {
    getStoreFromSpeech(recording: $recording, uri: $uri) {
      store {
        id
        name
        description
      }
    }
  }
`;

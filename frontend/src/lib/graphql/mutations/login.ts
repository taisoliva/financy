import { graphql } from "../generated"

export const LOGIN = graphql(`
  mutation Login($data: CreateAuthInput!) {
    login(createAuthInput: $data) {
      access_token
    }
  }
`)
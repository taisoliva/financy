import { graphql } from "../generated"

export const REGISTER = graphql(`
  mutation Register($data: CreateUserInput!) {
    createUser(createUserInput: $data) {
      id
      fullName
      email
    }
  }
`)

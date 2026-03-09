import { graphql } from "../generated";

export const CREATE_TRANSACTION = graphql(`
  mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {
    createTransaction(createTransactionInput: $createTransactionInput) {
      id
      description
      amount
      date
      type
      categoryId
    }
  }
`);

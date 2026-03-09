import { graphql } from "../generated";

export const UPDATE_TRANSACTION = graphql(`
  mutation UpdateTransaction($updateTransactionInput: UpdateTransactionInput!) {
    updateTransaction(updateTransactionInput: $updateTransactionInput) {
      id
      description
      amount
      date
      type
      categoryId
    }
  }
`);

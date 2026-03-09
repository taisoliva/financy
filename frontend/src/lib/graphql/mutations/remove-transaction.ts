import { graphql } from "../generated";

export const REMOVE_TRANSACTION = graphql(`
  mutation RemoveTransaction($id: Int!) {
    removeTransaction(id: $id) {
      id
    }
  }
`);

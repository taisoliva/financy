import { graphql } from "../generated";

export const REMOVE_CATEGORY = graphql(`
  mutation RemoveCategory($id: String!) {
    removeCategory(id: $id) {
      id
    }
  }
`);

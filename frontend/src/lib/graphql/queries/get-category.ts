import { graphql } from "../generated";

export const GET_CATEGORY = graphql(`
  query Category($id: String!) {
    category(id: $id) {
      id
      title
      description
      icon
      color
    }
  }
`);

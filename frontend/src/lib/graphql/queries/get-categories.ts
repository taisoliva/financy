import { graphql } from "../generated";

export const GET_CATEGORIES = graphql(`
  query Categories($skip: Int, $take: Int) {
    categories(skip: $skip, take: $take) {
      data {
        id
        title
        description
        icon
        color
        usageCount
      }
      metadata {
        total: items
      }
    }
  }
`);

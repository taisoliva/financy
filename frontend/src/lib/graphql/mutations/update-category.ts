import { graphql } from "../generated";

export const UPDATE_CATEGORY = graphql(`
  mutation UpdateCategory($data: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $data) {
      id
      title
      description
      icon
      color
    }
  }
`);

import { graphql } from "../generated";

export const CREATE_CATEGORY = graphql(`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(createCategoryInput: $data) {
      id
      title
      description
      icon
      color
    }
  }
`);

import { graphql } from "../generated";

export const GET_CATEGORIES_STATS = graphql(`
  query CategoriesStats {
    categoriesStats {
      totalCategories
      totalTransactions
      mostUsedCategory {
        id
        title
        icon
        color
      }
    }
  }
`);

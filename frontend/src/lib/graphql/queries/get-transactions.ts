import { graphql } from "../generated";

export const GET_TRANSACTIONS = graphql(`
  query Transactions($description: String, $categoryId: String, $type: String, $startDate: DateTime, $endDate: DateTime) {
    transactions(description: $description, categoryId: $categoryId, type: $type, startDate: $startDate, endDate: $endDate) {
      id
      description
      amount
      date
      type
      categoryId
      category {
        id
        title
        icon
        color
      }
    }
  }
`);

export const GET_TRANSACTIONS_STATS = graphql(`
  query TransactionsStats {
    categoriesStats {
      totalTransactions
    }
  }
`);

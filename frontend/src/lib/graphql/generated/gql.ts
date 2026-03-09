/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateCategory($data: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $data) {\n      id\n      title\n      description\n      icon\n      color\n    }\n  }\n": typeof types.CreateCategoryDocument,
    "\n  mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {\n    createTransaction(createTransactionInput: $createTransactionInput) {\n      id\n      description\n      amount\n      date\n      type\n      categoryId\n    }\n  }\n": typeof types.CreateTransactionDocument,
    "\n  mutation Login($data: CreateAuthInput!) {\n    login(createAuthInput: $data) {\n      access_token\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Register($data: CreateUserInput!) {\n    createUser(createUserInput: $data) {\n      id\n      fullName\n      email\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation RemoveCategory($id: String!) {\n    removeCategory(id: $id) {\n      id\n    }\n  }\n": typeof types.RemoveCategoryDocument,
    "\n  mutation RemoveTransaction($id: Int!) {\n    removeTransaction(id: $id) {\n      id\n    }\n  }\n": typeof types.RemoveTransactionDocument,
    "\n  mutation UpdateCategory($data: UpdateCategoryInput!) {\n    updateCategory(updateCategoryInput: $data) {\n      id\n      title\n      description\n      icon\n      color\n    }\n  }\n": typeof types.UpdateCategoryDocument,
    "\n  mutation UpdateTransaction($updateTransactionInput: UpdateTransactionInput!) {\n    updateTransaction(updateTransactionInput: $updateTransactionInput) {\n      id\n      description\n      amount\n      date\n      type\n      categoryId\n    }\n  }\n": typeof types.UpdateTransactionDocument,
    "\n  query CategoriesStats {\n    categoriesStats {\n      totalCategories\n      totalTransactions\n      mostUsedCategory {\n        id\n        title\n        icon\n        color\n      }\n    }\n  }\n": typeof types.CategoriesStatsDocument,
    "\n  query Categories($skip: Int, $take: Int) {\n    categories(skip: $skip, take: $take) {\n      data {\n        id\n        title\n        description\n        icon\n        color\n        usageCount\n      }\n      metadata {\n        total: items\n      }\n    }\n  }\n": typeof types.CategoriesDocument,
    "\n  query Category($id: String!) {\n    category(id: $id) {\n      id\n      title\n      description\n      icon\n      color\n    }\n  }\n": typeof types.CategoryDocument,
    "\n  query GetDashboardStats {\n    dashboardStats {\n      balance\n      incomeOfMonth\n      expenseOfMonth\n    }\n  }\n": typeof types.GetDashboardStatsDocument,
    "\n  query Transactions($description: String, $categoryId: String, $type: String, $startDate: DateTime, $endDate: DateTime) {\n    transactions(description: $description, categoryId: $categoryId, type: $type, startDate: $startDate, endDate: $endDate) {\n      id\n      description\n      amount\n      date\n      type\n      categoryId\n      category {\n        id\n        title\n        icon\n        color\n      }\n    }\n  }\n": typeof types.TransactionsDocument,
    "\n  query TransactionsStats {\n    categoriesStats {\n      totalTransactions\n    }\n  }\n": typeof types.TransactionsStatsDocument,
};
const documents: Documents = {
    "\n  mutation CreateCategory($data: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $data) {\n      id\n      title\n      description\n      icon\n      color\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {\n    createTransaction(createTransactionInput: $createTransactionInput) {\n      id\n      description\n      amount\n      date\n      type\n      categoryId\n    }\n  }\n": types.CreateTransactionDocument,
    "\n  mutation Login($data: CreateAuthInput!) {\n    login(createAuthInput: $data) {\n      access_token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($data: CreateUserInput!) {\n    createUser(createUserInput: $data) {\n      id\n      fullName\n      email\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation RemoveCategory($id: String!) {\n    removeCategory(id: $id) {\n      id\n    }\n  }\n": types.RemoveCategoryDocument,
    "\n  mutation RemoveTransaction($id: Int!) {\n    removeTransaction(id: $id) {\n      id\n    }\n  }\n": types.RemoveTransactionDocument,
    "\n  mutation UpdateCategory($data: UpdateCategoryInput!) {\n    updateCategory(updateCategoryInput: $data) {\n      id\n      title\n      description\n      icon\n      color\n    }\n  }\n": types.UpdateCategoryDocument,
    "\n  mutation UpdateTransaction($updateTransactionInput: UpdateTransactionInput!) {\n    updateTransaction(updateTransactionInput: $updateTransactionInput) {\n      id\n      description\n      amount\n      date\n      type\n      categoryId\n    }\n  }\n": types.UpdateTransactionDocument,
    "\n  query CategoriesStats {\n    categoriesStats {\n      totalCategories\n      totalTransactions\n      mostUsedCategory {\n        id\n        title\n        icon\n        color\n      }\n    }\n  }\n": types.CategoriesStatsDocument,
    "\n  query Categories($skip: Int, $take: Int) {\n    categories(skip: $skip, take: $take) {\n      data {\n        id\n        title\n        description\n        icon\n        color\n        usageCount\n      }\n      metadata {\n        total: items\n      }\n    }\n  }\n": types.CategoriesDocument,
    "\n  query Category($id: String!) {\n    category(id: $id) {\n      id\n      title\n      description\n      icon\n      color\n    }\n  }\n": types.CategoryDocument,
    "\n  query GetDashboardStats {\n    dashboardStats {\n      balance\n      incomeOfMonth\n      expenseOfMonth\n    }\n  }\n": types.GetDashboardStatsDocument,
    "\n  query Transactions($description: String, $categoryId: String, $type: String, $startDate: DateTime, $endDate: DateTime) {\n    transactions(description: $description, categoryId: $categoryId, type: $type, startDate: $startDate, endDate: $endDate) {\n      id\n      description\n      amount\n      date\n      type\n      categoryId\n      category {\n        id\n        title\n        icon\n        color\n      }\n    }\n  }\n": types.TransactionsDocument,
    "\n  query TransactionsStats {\n    categoriesStats {\n      totalTransactions\n    }\n  }\n": types.TransactionsStatsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCategory($data: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $data) {\n      id\n      title\n      description\n      icon\n      color\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($data: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $data) {\n      id\n      title\n      description\n      icon\n      color\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {\n    createTransaction(createTransactionInput: $createTransactionInput) {\n      id\n      description\n      amount\n      date\n      type\n      categoryId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {\n    createTransaction(createTransactionInput: $createTransactionInput) {\n      id\n      description\n      amount\n      date\n      type\n      categoryId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($data: CreateAuthInput!) {\n    login(createAuthInput: $data) {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($data: CreateAuthInput!) {\n    login(createAuthInput: $data) {\n      access_token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($data: CreateUserInput!) {\n    createUser(createUserInput: $data) {\n      id\n      fullName\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation Register($data: CreateUserInput!) {\n    createUser(createUserInput: $data) {\n      id\n      fullName\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCategory($id: String!) {\n    removeCategory(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCategory($id: String!) {\n    removeCategory(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveTransaction($id: Int!) {\n    removeTransaction(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveTransaction($id: Int!) {\n    removeTransaction(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCategory($data: UpdateCategoryInput!) {\n    updateCategory(updateCategoryInput: $data) {\n      id\n      title\n      description\n      icon\n      color\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCategory($data: UpdateCategoryInput!) {\n    updateCategory(updateCategoryInput: $data) {\n      id\n      title\n      description\n      icon\n      color\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTransaction($updateTransactionInput: UpdateTransactionInput!) {\n    updateTransaction(updateTransactionInput: $updateTransactionInput) {\n      id\n      description\n      amount\n      date\n      type\n      categoryId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTransaction($updateTransactionInput: UpdateTransactionInput!) {\n    updateTransaction(updateTransactionInput: $updateTransactionInput) {\n      id\n      description\n      amount\n      date\n      type\n      categoryId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CategoriesStats {\n    categoriesStats {\n      totalCategories\n      totalTransactions\n      mostUsedCategory {\n        id\n        title\n        icon\n        color\n      }\n    }\n  }\n"): (typeof documents)["\n  query CategoriesStats {\n    categoriesStats {\n      totalCategories\n      totalTransactions\n      mostUsedCategory {\n        id\n        title\n        icon\n        color\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Categories($skip: Int, $take: Int) {\n    categories(skip: $skip, take: $take) {\n      data {\n        id\n        title\n        description\n        icon\n        color\n        usageCount\n      }\n      metadata {\n        total: items\n      }\n    }\n  }\n"): (typeof documents)["\n  query Categories($skip: Int, $take: Int) {\n    categories(skip: $skip, take: $take) {\n      data {\n        id\n        title\n        description\n        icon\n        color\n        usageCount\n      }\n      metadata {\n        total: items\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Category($id: String!) {\n    category(id: $id) {\n      id\n      title\n      description\n      icon\n      color\n    }\n  }\n"): (typeof documents)["\n  query Category($id: String!) {\n    category(id: $id) {\n      id\n      title\n      description\n      icon\n      color\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDashboardStats {\n    dashboardStats {\n      balance\n      incomeOfMonth\n      expenseOfMonth\n    }\n  }\n"): (typeof documents)["\n  query GetDashboardStats {\n    dashboardStats {\n      balance\n      incomeOfMonth\n      expenseOfMonth\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Transactions($description: String, $categoryId: String, $type: String, $startDate: DateTime, $endDate: DateTime) {\n    transactions(description: $description, categoryId: $categoryId, type: $type, startDate: $startDate, endDate: $endDate) {\n      id\n      description\n      amount\n      date\n      type\n      categoryId\n      category {\n        id\n        title\n        icon\n        color\n      }\n    }\n  }\n"): (typeof documents)["\n  query Transactions($description: String, $categoryId: String, $type: String, $startDate: DateTime, $endDate: DateTime) {\n    transactions(description: $description, categoryId: $categoryId, type: $type, startDate: $startDate, endDate: $endDate) {\n      id\n      description\n      amount\n      date\n      type\n      categoryId\n      category {\n        id\n        title\n        icon\n        color\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TransactionsStats {\n    categoriesStats {\n      totalTransactions\n    }\n  }\n"): (typeof documents)["\n  query TransactionsStats {\n    categoriesStats {\n      totalTransactions\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
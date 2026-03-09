import { ArgsType } from "@nestjs/graphql";
import { PaginationArgs } from "src/shared/args/pagination.args";

@ArgsType()
export class CategoryArgs extends PaginationArgs {}
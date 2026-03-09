import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gqlAuth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { User } from 'generated/prisma/client';
import { TransactionArgs } from './dto/transaction.args';

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Mutation(() => Transaction)
  @UseGuards(GqlAuthGuard)
  createTransaction(@Args('createTransactionInput') createTransactionInput: CreateTransactionInput, @CurrentUser() user: User) {
    return this.transactionsService.create(createTransactionInput, user);
  }

  @Query(() => [Transaction], { name: 'transactions' })
  @UseGuards(GqlAuthGuard)
  findAll(@Args() args: TransactionArgs, @CurrentUser() user: User) {
    return this.transactionsService.findAll(args, user);
  }

  @Query(() => Transaction, { name: 'transaction' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => String }) id: string, @CurrentUser() user: User) {
    return this.transactionsService.findOne(id, user);
  }

  @Mutation(() => Transaction)
  @UseGuards(GqlAuthGuard)
  updateTransaction(@Args('updateTransactionInput') updateTransactionInput: UpdateTransactionInput, @CurrentUser() user: User) {
    return this.transactionsService.update(updateTransactionInput.id, updateTransactionInput, user);
  }

  @Mutation(() => Transaction)
  removeTransaction(@Args('id', { type: () => Int }) id: number) {
    return this.transactionsService.remove(id);
  }
}

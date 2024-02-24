import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ProductModule } from './domain/products/module';
import { MerchantModule } from './domain/merchants/module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { path: 'schema.gql', federation: 2 },
      include: [ProductModule, MerchantModule],
    }),
    ProductModule,

    MerchantModule,
  ],
  providers: [],
})
export class AppModule {}

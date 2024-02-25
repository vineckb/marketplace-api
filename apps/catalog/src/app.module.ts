import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ProductModule } from './domain/products/module';
import { MerchantModule } from './domain/merchants/module';
import { SectionModule } from './domain/sections/module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { path: 'schema.gql', federation: 2 },
      include: [ProductModule, MerchantModule, SectionModule],
    }),
    ProductModule,

    MerchantModule,
    SectionModule,
  ],
  providers: [],
})
export class AppModule {}

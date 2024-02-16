import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ProductModule } from './products/products.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { path: 'schema.gql', federation: 2 },
      include: [ProductModule],
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'CATALOG_CONNECTION',
      useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect(
          'mongodb://root:topsecret@localhost:27017/marketplace-catalog',
        ),
    },
  ],
})
export class AppModule {}

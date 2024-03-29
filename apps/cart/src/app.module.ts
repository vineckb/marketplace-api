import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './domain/cart/module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { path: './schema2.gql', federation: 2 },
      include: [CartModule],
    }),
    CartModule,
  ],
  providers: [],
})
export class AppModule {}

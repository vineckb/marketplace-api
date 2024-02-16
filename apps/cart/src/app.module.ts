import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/database';
import { AppService } from './app.service';
import { ProductsService } from 'apps/catalog/src/products/products.service';
import mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { path: 'schema.gql', federation: 2 },
    }),
    DatabaseModule,
    ProductsService,
  ],

  controllers: [],
  providers: [
    AppService,
    AppResolver,
    {
      provide: 'MONGO_CONNECTION',
      useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect(
          'mongodb://root:topsecret@localhost:27017/marketplace',
        ),
    },
  ],
})
export class AppModule {}

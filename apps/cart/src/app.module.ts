import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from 'apps/catalog/src/infra/database/database.module';
import { ProductsService } from 'apps/catalog/src/products/service';
import { CartService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CatalogService',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
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
    CartService,
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

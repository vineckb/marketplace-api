import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { products } from '../src/data';
const gql = '/graphql';

describe('GraphQL AppResolver (e2e) {Supertest}', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(gql, () => {
    describe('products', () => {
      it('should get the products array', () => {
        const expectedPayload = products.map(({ _id, title }) => ({
          _id,
          title,
        }));

        return request(app.getHttpServer())
          .post(gql)
          .send({ query: '{products {_id title }}' })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.products).toEqual(expectedPayload);
          });
      });

      describe('one product', () => {
        it('should get a single product', () => {
          const product = {
            _id: products[0]._id,
            title: products[0].title,
          };
          return request(app.getHttpServer())
            .post(gql)
            .send({
              query: `{product(id:"${product._id}"){_id title}}`,
            })
            .expect(200)
            .expect((res) => {
              expect(res.body.data.product).toEqual(product);
            });
        });
        it('should get an error for bad id', () => {
          return (
            request(app.getHttpServer())
              .post(gql)
              .send({
                query: `{product(id:"not-found-id"){_id title}}`,
              })
              .expect(200)
              // break
              .expect((res) => {
                expect(res.body.errors[0].message).toBe(
                  'Product #not-found-id not found',
                );
              })
          );
        });
      });
      it('should create a new product and have it added to the array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: `
              mutation {
                createProduct(data: {
                  title: "Created Product",
                  media: "created-media.jpg",
                  price: 20,
                  promotionalPrice: 18,
                  availableQuantity: 50,
                  merchant: {
                    _id: "1",
                    name: "Merchant",
                    media: "test-media.jpg",
                    lat: 0,
                    lng: 0,
                    address: "test-address",
                  },
                  section: {
                    _id: "1",
                    name: "Section",
                    media: "test-media.jpg",
                  }
                }) { _id }
              }`,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createProduct?._id).toBeDefined();
          })
          .then(() =>
            request(app.getHttpServer())
              .post(gql)
              .send({ query: '{products {_id title}}' })
              .expect(200)
              .expect((res) => {
                expect(
                  res.body.data.products[res.body.data.products.length - 1]
                    .title,
                ).toEqual('Created Product');
              }),
          );
      });
    });
  });
});

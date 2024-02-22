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
        const expectedPayload = products.map(({ id, title }) => ({
          id,
          title,
        }));

        return request(app.getHttpServer())
          .post(gql)
          .send({ query: '{getProducts {id title }}' })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.getProducts).toEqual(expectedPayload);
          });
      });

      describe('one product', () => {
        it('should get a single product', () => {
          const product = {
            id: products[0].id,
            title: products[0].title,
          };
          return request(app.getHttpServer())
            .post(gql)
            .send({
              query: `{getProduct(id:"${product.id}"){id title}}`,
            })
            .expect(200)
            .expect((res) => {
              expect(res.body.data.getProduct).toEqual(product);
            });
        });
        it('should get an error for bad id', () => {
          return (
            request(app.getHttpServer())
              .post(gql)
              .send({
                query: `{getProduct(id:"not-found-id"){id title}}`,
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
                    id: "1",
                    name: "Merchant",
                    media: "test-media.jpg",
                    lat: 0,
                    lng: 0,
                    address: "test-address",
                  },
                  section: {
                    id: "1",
                    name: "Section",
                    media: "test-media.jpg",
                  }
                }) { id }
              }`,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createProduct?.id).toBeDefined();
          })
          .then(() =>
            request(app.getHttpServer())
              .post(gql)
              .send({ query: '{getProducts {id title}}' })
              .expect(200)
              .expect((res) => {
                expect(
                  res.body.data.getProducts[
                    res.body.data.getProducts.length - 1
                  ].title,
                ).toEqual('Created Product');
              }),
          );
      });
    });
  });
});

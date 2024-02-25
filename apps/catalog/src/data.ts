import { faker } from '@faker-js/faker';
import { Product } from './domain/products/entity';
import { Merchant } from './domain/merchants/entity';
import { Section } from './domain/sections/entity';

export const products: Product[] = Array.from({ length: 10 }).map(() => {
  const price = +faker.commerce.price();
  const promotionalPrice = +faker.commerce.price({ max: price });

  const productTitle = faker.commerce.productName();
  const productMedia = faker.image.urlLoremFlickr({
    category: productTitle,
  });

  return {
    _id: faker.database.mongodbObjectId(),
    title: productTitle,
    media: productMedia,
    barcode: faker.commerce.isbn(),
    price,
    promotionalPrice,
    availableQuantity: faker.number.int({ min: 0, max: 999 }),
    merchantId: faker.database.mongodbObjectId(),
    sectionId: faker.database.mongodbObjectId(),
  };
});

export const merchants: Merchant[] = Array.from({ length: 10 }).map(() => {
  return {
    _id: faker.database.mongodbObjectId(),
    name: faker.commerce.department(),
    media: faker.image.avatar(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    lat: faker.location.latitude(),
    lng: faker.location.longitude(),
    withdrawal: faker.datatype.boolean({ probability: 0.2 }),
    delivery: faker.datatype.boolean({ probability: 0.9 }),
  };
});

export const sections: Section[] = Array.from({ length: 10 }).map(() => {
  const sectionName = faker.commerce.productAdjective();
  const sectionMedia = faker.image.urlLoremFlickr({
    category: sectionName,
    width: 350,
    height: 150,
  });

  return {
    _id: faker.database.mongodbObjectId(),
    name: sectionName,
    media: sectionMedia,
  };
});

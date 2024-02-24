import { faker } from '@faker-js/faker';
import { ProductEntity } from './domain/products/entity';
import { MerchantEntity } from './domain/merchants/entity';
import { SectionEntity } from './domain/sections/entity';

export const products: ProductEntity[] = Array.from({ length: 10 }).map(() => {
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

export const merchants: MerchantEntity[] = Array.from({ length: 10 }).map(
  () => {
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
  },
);

export const sections: SectionEntity[] = Array.from({ length: 10 }).map(() => {
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

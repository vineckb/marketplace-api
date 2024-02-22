import { faker } from '@faker-js/faker';
import { ProductEntity } from './products/entity';

export const products: ProductEntity[] = Array.from({ length: 10 }).map(() => {
  const price = +faker.commerce.price();
  const promotionalPrice = +faker.commerce.price({ max: price });

  const productTitle = faker.commerce.productName();
  const productMedia = faker.image.urlLoremFlickr({
    category: productTitle,
  });

  const sectionName = faker.commerce.productAdjective();
  const sectionMedia = faker.image.urlLoremFlickr({
    category: sectionName,
    width: 350,
    height: 150,
  });

  return {
    id: faker.database.mongodbObjectId(),
    title: productTitle,
    media: productMedia,
    barcode: faker.commerce.isbn(),
    price,
    promotionalPrice,
    availableQuantity: faker.number.int({ min: 0, max: 999 }),
    merchant: {
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.department(),
      media: faker.image.avatar(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
      withdrawal: faker.datatype.boolean({ probability: 0.2 }),
      delivery: faker.datatype.boolean({ probability: 0.9 }),
    },
    section: {
      id: faker.database.mongodbObjectId(),
      name: sectionName,
      media: sectionMedia,
    },
  };
});

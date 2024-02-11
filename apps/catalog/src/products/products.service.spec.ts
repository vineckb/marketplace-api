import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { products } from '../data';

describe('ProductsService', () => {
  let service: ProductsService;
  let resolver: ProductsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, ProductsResolver],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    it('should call service.create with the correct arguments', async () => {
      const createProductInput: CreateProductInput = {
        title: 'Test Product',
        media: 'test-media.jpg',
        price: 10,
        promotionalPrice: 9,
        availableQuantity: 100,
        merchant: {
          _id: '1',
          name: 'Merchant',
          media: 'test-media.jpg',
          lat: 0,
          lng: 0,
          address: 'test-address',
        },
        section: {
          _id: '1',
          name: 'Section',
          media: 'test-media.jpg',
        },
      };

      jest.spyOn(service, 'create');
      const { _id, ...createdProduct } =
        await resolver.createProduct(createProductInput);

      expect(service.create).toHaveBeenCalledWith(createProductInput);
      expect(createdProduct).toEqual(createProductInput);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll and return the result', async () => {
      const result = await service.findAll();
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with the correct argument and return the result', async () => {
      const product = products[0];
      const result = await service.findOne(product._id);
      expect(result._id).toEqual(product._id);
      expect(Object.keys(result).includes('title')).toEqual(true);
      expect(Object.keys(result).includes('barcode')).toEqual(true);
      expect(Object.keys(result).includes('section')).toEqual(true);
      expect(Object.keys(result).includes('merchant')).toEqual(true);
      expect(Object.keys(result).includes('price')).toEqual(true);
      expect(Object.keys(result).includes('availableQuantity')).toEqual(true);
    });
  });

  describe('updateProduct', () => {
    it('should call service.update with the correct arguments and return the result', async () => {
      const updateProductInput: UpdateProductInput = {
        _id: '1',
        title: 'Updated Product',
        media: 'updated-media.jpg',
        price: 20,
        promotionalPrice: 18,
        availableQuantity: 50,

        merchant: {
          _id: '1',
          name: 'Merchant',
          media: 'test-media.jpg',
          lat: 0,
          lng: 0,
          address: 'test-address',
        },
        section: {
          _id: '1',
          name: 'Section',
          media: 'test-media.jpg',
        },
      };

      const result = await service.update(
        updateProductInput._id,
        updateProductInput,
      );

      expect(result).toEqual(updateProductInput);
    });
  });

  describe('removeProduct', () => {
    it('should call service.remove with the correct argument', async () => {
      const beforeLength = products.length;
      await service.remove(products[0]._id);

      expect(products.length).toEqual(beforeLength - 1);
    });
  });

  describe('resolveReference', () => {
    it('should call service.findOne with the correct argument and return the result', async () => {
      const product = products[0];
      jest.spyOn(service, 'findOne');

      const result = await resolver.resolveReference({
        __typename: 'Product',
        id: product._id,
      });

      expect(service.findOne).toHaveBeenCalledWith(product._id);
      expect(result).toEqual(product);
    });
  });
});

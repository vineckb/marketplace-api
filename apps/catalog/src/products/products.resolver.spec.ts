import { Test, TestingModule } from '@nestjs/testing';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { ProductEntity } from './entities/product.entity';
import { products } from '../data';
import { UpdateProductInput } from './dto/update-product.input';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;
  let productService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsResolver,
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createProduct', () => {
    it('should call productService.create with the correct arguments', async () => {
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

      const createdProduct: ProductEntity = {
        ...createProductInput,
        _id: '1',
      };

      jest
        .spyOn(productService, 'create')
        .mockResolvedValueOnce(createdProduct);

      const result = await resolver.createProduct(createProductInput);

      expect(productService.create).toHaveBeenCalledWith(createProductInput);
      expect(result).toEqual(createdProduct);
    });
  });

  describe('findAll', () => {
    it('should call productService.findAll and return the result', async () => {
      jest.spyOn(productService, 'findAll').mockResolvedValueOnce(products);

      const result = await resolver.getProducts();

      expect(productService.findAll).toHaveBeenCalled();
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should call productService.findOne with the correct argument and return the result', async () => {
      const product = products[0];
      jest.spyOn(productService, 'findOne').mockResolvedValueOnce(product);

      const result = await resolver.getProduct(product._id);

      expect(productService.findOne).toHaveBeenCalledWith(product._id);
      expect(result).toEqual(product);
    });
  });

  describe('updateProduct', () => {
    it('should call productService.update with the correct arguments and return the result', async () => {
      const updateProductInput: UpdateProductInput = {
        _id: '1',
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

      const updatedProduct = updateProductInput as ProductEntity;

      jest
        .spyOn(productService, 'update')
        .mockResolvedValueOnce(updatedProduct);

      const result = await resolver.updateProduct(updateProductInput);

      expect(productService.update).toHaveBeenCalledWith(
        updateProductInput._id,
        updateProductInput,
      );
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('removeProduct', () => {
    it('should call productService.remove with the correct argument', async () => {
      jest.spyOn(productService, 'remove').mockResolvedValueOnce(undefined);

      await resolver.removeProduct('1');

      expect(productService.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('resolveReference', () => {
    it('should call productService.findOne with the correct argument and return the result', async () => {
      const product = products[0];
      jest.spyOn(productService, 'findOne').mockResolvedValueOnce(product);

      const result = await resolver.resolveReference({
        __typename: 'Product',
        id: '1',
      });

      expect(productService.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(product);
    });
  });
});

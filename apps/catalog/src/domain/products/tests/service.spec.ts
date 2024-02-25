import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../service';
import { ProductRepository } from '../repository';
import { Product } from '../entity';
import { CreateProductInput } from '../dto/create-product.input';

describe('ProductsService', () => {
  let service: ProductsService;
  let repositoryMock: ProductRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: Product.name,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const input: CreateProductInput = {
        title: 'test',
        price: 10,
        media: 'image.jpg',
        availableQuantity: 10,
      };
      //
    });
  });
});

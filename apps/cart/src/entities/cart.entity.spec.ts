import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

describe('CartService', () => {
  let service: CartService;

  const mockCartModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    updateOne: jest.fn(),
    update: jest.fn(),
    deleteOne: jest.fn(),
    populate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getModelToken(Cart.name),
          useValue: mockCartModel,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addProduct', () => {
    it('should create a new merchant if the merchant does not exist', async () => {
      const customer = new Customer();
      const merchant = new Merchant();
      const addProductInput = new AddProductInput();
      addProductInput.merchant = merchant;
      addProductInput.customer = customer;
      addProductInput.quantity = 1;
      addProductInput.price = 10;

      mockCartModel.findOne.mockResolvedValue(null);
      mockCartModel.create.mockResolvedValue(new Cart());
      mockCartModel.save.mockResolvedValue(new Cart());
      mockCartModel.populate.mockResolvedValue(new Cart());

      const result = await service.addProduct(addProductInput);

      expect(result).toBeDefined();
      expect(result.merchants).toHaveLength(1);
      expect(result.merchants[0]).toEqual(merchant);
    });

    it('should add the product to an existing merchant', async () => {
      const customer = new Customer();
      const merchant = new Merchant();
      const addProductInput = new AddProductInput();
      addProductInput.merchant = merchant;
      addProductInput.customer = customer;
      addProductInput.quantity = 1;
      addProductInput.price = 10;

      mockCartModel.findOne.mockResolvedValue(new Cart());
      mockCartModel.create.mockResolvedValue(new Cart());
      mockCartModel.save.mockResolvedValue(new Cart());
      mockCartModel.populate.mockResolvedValue(new Cart());

      const result = await service.addProduct(addProductInput);

      expect(result).toBeDefined();
      expect(result.merchants).toHaveLength(1);
      expect(result.merchants[0].products).toHaveLength(1);
      expect(result.merchants[0].products[0]).toEqual(addProductInput);
    });
  });
});

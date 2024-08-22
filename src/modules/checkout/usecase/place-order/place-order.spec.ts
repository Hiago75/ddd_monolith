import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto } from "./place-order.dto"
import PlaceOrderUsecase from "./place-order.usecase"

const mockDate = new Date(2000, 1, 1);

describe("PlaceOrderUseCase unit test", () => {
  describe("validateProducts method", () => {
    // @ts-expect-error - no params in constructor
    const placeOrderUsecase = new PlaceOrderUsecase()

    it("should throw an error when products are not valid", async () => {
      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: []
      }

      await expect(placeOrderUsecase["validateProducts"](input)).rejects.toThrowError("Products not found")
    })

    it("should throw an error when product is out of stock", async () => {
      const mockProductFacade = {
        checkStock: jest.fn(({ productId }: { productId: string }) =>
          Promise.resolve({
            productId,
            stock: productId === "1" ? 0 : 1
          })
        ),
      }

      // @ts-expect-error - force set productFacade
      placeOrderUsecase["_productFacade"] = mockProductFacade

      let input: PlaceOrderInputDto = {
        clientId: "0",
        products: [{ productId: "1" }]
      }

      await expect(placeOrderUsecase["validateProducts"](input)).rejects.toThrowError("Product 1 is not available in stock")

      input = {
        clientId: "0",
        products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }]
      }

      await expect(placeOrderUsecase["validateProducts"](input)).rejects.toThrowError("Product 1 is not available in stock")
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);
    })
  })

  describe("getProducts method", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern")
      jest.setSystemTime(mockDate)
    })

    // @ts-expect-error - no params in constructor
    const placeOrderUsecase = new PlaceOrderUsecase()

    it("should throw an error when product is not found", async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
      }

      // @ts-expect-error - force set catalogFacade
      placeOrderUsecase["_catalogFacade"] = mockCatalogFacade

      await expect(placeOrderUsecase["getProduct"]("0")).rejects.toThrowError("Product not found")
    })

    it("should return a product", async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue({
          id: "0",
          name: "Product 0",
          description: "Description 0",
          salesPrice: 10,
        }),
      }

      // @ts-expect-error - force set catalogFacade
      placeOrderUsecase["_catalogFacade"] = mockCatalogFacade

      await expect(placeOrderUsecase["getProduct"]("0")).resolves.toEqual(new Product({
        id: new Id("0"),
        name: "Product 0",
        description: "Description 0",
        salesPrice: 10,
      }))

      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
    })

    afterAll(() => {
      jest.useRealTimers();
    })
  })

  describe("execute method", () => {
    const mockProductFacade = {
      checkStock: jest.fn(),
      addProduct: jest.fn(),
    }

    const mockCatalogFacade = {
      find: jest.fn(),
      findAll: jest.fn()
    }

    const mockPaymentFacade = {
      proccess: jest.fn()
    }

    const mockCheckoutRepository = {
      addOrder: jest.fn(),
      findOrder: jest.fn()
    }

    const mockInvoiceFacade = {
      generate: jest.fn().mockResolvedValue({ id: "1i" }),
      find: jest.fn(),
      create: jest.fn(),
    }

    beforeAll(() => {
      jest.useFakeTimers("modern")
      jest.setSystemTime(mockDate)
    })


    it("should throw an error when client is not found", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
        add: jest.fn(),
      }

      const placeOrderUseCase = new PlaceOrderUsecase(mockClientFacade, mockProductFacade, mockCatalogFacade, mockCheckoutRepository, mockInvoiceFacade, mockPaymentFacade)

      const input: PlaceOrderInputDto = {
        clientId: "0",
        products: []
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrowError("Client not found")
    })

    it("should throw an error when products are not valid", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
        add: jest.fn(),
      }

      const placeOrderUseCase = new PlaceOrderUsecase(mockClientFacade, mockProductFacade, mockCatalogFacade, mockCheckoutRepository, mockInvoiceFacade, mockPaymentFacade)
      const mockValidateProducts = jest
        // @ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, "validateProducts")
        // @ts-expect-error - not return never
        .mockRejectedValue(new Error("No products selected"));

      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: []
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrowError("No products selected")
      expect(mockValidateProducts).toHaveBeenCalledTimes(1)
    })

    afterAll(() => {
      jest.useRealTimers();
    })
  })

  describe("place an order", () => {
    const clientProps = {
      id: "1",
      name: "Client 1",
      email: "client@user.com",
      address: {
        street: "Street 1",
        city: "City 1",
        state: "State 1",
        number: "1",
        complement: "Complement 1",
        zipCode: "12345678",
      }
    }

    let mockClientFacade = {
      find: jest.fn().mockResolvedValue(clientProps),
      add: jest.fn()
    }

    let mockPaymentFacade = {
      proccess: jest.fn()
    }

    let mockCheckoutRepository = {
      addOrder: jest.fn(),
      findOrder: jest.fn()
    }

    let mockInvoiceFacade = {
      find: jest.fn(),
      create: jest.fn().mockResolvedValue({ id: "1i" }),
    }

    const placeOrderUseCase = new PlaceOrderUsecase(mockClientFacade, null, null, mockCheckoutRepository, mockInvoiceFacade, mockPaymentFacade)

    const products = {
      "1": new Product({
        id: new Id("1"),
        name: "Product 1",
        description: "Description 1",
        salesPrice: 10,
      }),
      "2": new Product({
        id: new Id("2"),
        name: "Product 2",
        description: "Description 2",
        salesPrice: 20,
      }),
    }

    const mockValidateProducts = jest
      // @ts-expect-error - spy on private method
      .spyOn(placeOrderUseCase, "validateProducts")
      // @ts-expect-error - not return never
      .mockResolvedValue(null)

    const mockGetProduct = jest
      // @ts-expect-error - spy on private method
      .spyOn(placeOrderUseCase, "getProduct")
      // @ts-expect-error - not return never
      .mockImplementation((productId: keyof typeof products) => products[productId])

    it("should not be approved", async () => {
      mockPaymentFacade.proccess = mockPaymentFacade.proccess.mockReturnValue({
        transactionId: "1",
        orderId: "1",
        amount: 100,
        status: "error",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: [{ productId: "1" }, { productId: "2" }]
      }

      let output = await placeOrderUseCase.execute(input);

      expect(output.invoiceId).toBeNull();
      expect(output.total).toBe(30);
      expect(output.products).toStrictEqual([
        { productId: "1" },
        { productId: "2" },
      ])
      expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
      expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1" })
      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
      expect(mockValidateProducts).toHaveBeenCalledWith(input);
      expect(mockGetProduct).toHaveBeenCalledTimes(2);
      expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
      expect(mockPaymentFacade.proccess).toHaveBeenCalledTimes(1);
      expect(mockPaymentFacade.proccess).toHaveBeenCalledWith({
        orderId: output.id,
        amount: output.total
      });
      expect(mockInvoiceFacade.create).toHaveBeenCalledTimes(0);
    })

    it("should be approved", async () => {
      mockPaymentFacade = {
        proccess: jest.fn().mockResolvedValue({ status: "APPROVED" })
      }

      const mockProductFacade = {
        addProduct: jest.fn(),
        checkStock: jest.fn().mockResolvedValue({ stock: 5 })
      }

      const mockCatalogFacade = {
        find: jest.fn().mockReturnValue({ id: "1", ...products["1"] }),
        findAll: jest.fn()
      }

      const placeOrderUseCase = new PlaceOrderUsecase(mockClientFacade, mockProductFacade, mockCatalogFacade, mockCheckoutRepository, mockInvoiceFacade, mockPaymentFacade)

      const mockValidateProducts = jest
        // @ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, "validateProducts")
        // @ts-expect-error - not return never
        .mockResolvedValue(null)

      const mockGetProduct = jest
        // @ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, "getProduct")
        // @ts-expect-error - not return never
        .mockImplementation((productId: keyof typeof products) => products[productId])

      mockPaymentFacade.proccess = mockPaymentFacade.proccess.mockReturnValue({
        transactionId: "1",
        orderId: "1",
        amount: 100,
        status: "approved",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: [{ productId: "1" }, { productId: "2" }]
      }

      let output = await placeOrderUseCase.execute(input);

      expect(output.invoiceId).toBe("1i")
      expect(output.total).toBe(30)
      expect(output.products).toStrictEqual([
        { productId: "1" },
        { productId: "2" },
      ])
      expect(mockClientFacade.find).toHaveBeenCalledTimes(1)
      expect(mockValidateProducts).toHaveBeenCalledWith(input)
      expect(mockGetProduct).toHaveBeenCalledTimes(2)
      expect(mockGetProduct).toHaveBeenCalledTimes(2)
      expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
      expect(mockPaymentFacade.proccess).toHaveBeenCalledTimes(1)
      expect(mockPaymentFacade.proccess).toHaveBeenCalledWith({
        orderId: output.id,
        amount: output.total
      })
      expect(mockInvoiceFacade.create).toHaveBeenCalledTimes(1)
      expect(mockInvoiceFacade.create).toHaveBeenCalledWith({
        name: clientProps.name,
        street: clientProps.address.street,
        number: clientProps.address.number,
        complement: clientProps.address.complement,
        city: clientProps.address.city,
        state: clientProps.address.state,
        zipCode: clientProps.address.zipCode,
        items: [
          {
            id: products["1"].id.id,
            name: products["1"].name,
            price: products["1"].salesPrice
          },
          {
            id: products["2"].id.id,
            name: products["2"].name,
            price: products["2"].salesPrice
          }]
      })
    })
  })
})
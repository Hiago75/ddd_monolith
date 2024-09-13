
import { Sequelize } from "sequelize-typescript"
import Order from "../domain/order.entity"
import Product from "../domain/product.entity"
import ProductOrder from "./product.order.model"
import Id from "../../@shared/domain/value-object/id.value-object"
import Client from "../domain/client.entity"
import OrderModel from "./order.model"
import ClientOrder from "./client.order.model"
import OrderRepository from "./order.repository"
import InvoiceModel from "../../invoice/repository/invoice.model"
import InvoiceItemModel from "../../invoice/repository/invoice-item.model"

describe('order test unit', () => {

  function createOrder(): Order {
    const client = new Client({
      id: new Id('1c'),
      name: 'Client 1',
      email: 'email@email123.com',
    })
    const product = new Product({ description: 'Description 1', id: new Id('p1'), name: 'Product 1', salesPrice: 13 })
    const product1 = new Product({ description: 'Description 2', id: new Id('p2'), name: 'Product 2', salesPrice: 13 })
    const products = [product, product1]

    const order = new Order({
      id: new Id('1'),
      status: 'Approved',
      client: client,
      products: products
    });

    return order;
  }

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([InvoiceModel, InvoiceItemModel, ClientOrder, ProductOrder, OrderModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  function validateResult(result: any) {
    expect(result.id.id).toBe('1')
    expect(result.client.id.id).toBe('1c')
    expect(result.client.name).toBe('Client 1')
    expect(result.client.address).toBeUndefined()
    expect(result.products.length).toBe(2)
    expect(result.products.length).toBe(2)
    expect(result.products[0].id.id).toBe('p1')
    expect(result.products[1].id.id).toBe('p2')
  }

  it('should create an order', async () => {
    const order = createOrder();
    const orderRepository = new OrderRepository();
    const result = await orderRepository.addOrder(order);
    validateResult(result)
  });

  it('should find an order', async () => {
    const order = createOrder();
    const orderRepository = new OrderRepository();
    await orderRepository.addOrder(order);
    const result = await orderRepository.findOrder('1')
    validateResult(result)
  }, 50000)
})
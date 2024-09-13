import Transaction from "../domain/transaction";
import PaymentGateway from "../gateway/payment.gateway";
import TransactionModel from "./payment.model";

export default class TransactionRepository implements PaymentGateway {
  async save(input: Transaction): Promise<Transaction> {
    await TransactionModel.create({
      id: input.id.id,
      amount: input.amount,
      orderId: input.orderId,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    return new Transaction({
      id: input.id,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    })
  }

  public async pay(): Promise<void> {
    console.log("TransactionRepository: pay");
  }
} 
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import Transaction from "../domain/transaction";
import PaymentGateway from "../gateway/payment.gateway";
import { ProccessPaymentInputDto, ProccessPaymentOutputDto } from "./proccess-payment.dto";

export default class ProcessPaymentUsecase implements UseCaseInterface {
  constructor(private transactionRepository: PaymentGateway) { }

  async execute(input: ProccessPaymentInputDto): Promise<ProccessPaymentOutputDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId
    });

    transaction.process();

    const persistedTransaction = await this.transactionRepository.save(transaction);

    return {
      transactionId: persistedTransaction.id.id,
      orderId: persistedTransaction.orderId,
      amount: persistedTransaction.amount,
      status: persistedTransaction.status,
      createdAt: persistedTransaction.createdAt,
      updatedAt: persistedTransaction.updatedAt
    }
  }
}
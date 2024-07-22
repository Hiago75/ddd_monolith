import PaymentFacadeInteface from "../facade/facade.interface";
import PaymentFacade from "../facade/payment.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUsecase from "../usecase/proccess-payment.usecase";

export default class PaymentFacadeFactory {
  static create(): PaymentFacadeInteface {
    const repository = new TransactionRepository();
    const useCase = new ProcessPaymentUsecase(repository);

    return new PaymentFacade(useCase);
  }
}
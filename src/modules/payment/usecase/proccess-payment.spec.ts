import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import ProcessPaymentUsecase from "./proccess-payment.usecase";

const validTransaction = new Transaction({
  id: new Id("1"),
  amount: 99,
  orderId: "1",
  status: "APPROVED"
});

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(validTransaction))
  }
}

const invalidTransation = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
  status: "DECLINED"
});

const MockRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(invalidTransation))
  }
}

describe("Proccess payment usecase unit test", () => {
  it("should process a payment", async () => {
    const paymentRepository = MockRepository();
    const usecase = new ProcessPaymentUsecase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 100
    }

    const result = await usecase.execute(input);

    expect(result.transactionId).toEqual(validTransaction.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.amount).toBe(99);
    expect(result.status).toBe("APPROVED");
    expect(result.orderId).toBe("1");
  });

  it("should decline a payment", async () => {
    const paymentRepository = MockRepositoryDeclined();
    const usecase = new ProcessPaymentUsecase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 50
    }

    const result = await usecase.execute(input);

    expect(result.transactionId).toEqual(invalidTransation.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.amount).toBe(50);
    expect(result.status).toBe("DECLINED");
    expect(result.orderId).toBe("1");
  });
});
import Transaction from "./transaction";

describe("Transaction", () => {
  it("should create a transaction with default status 'PENDING'", () => {
    const transaction = new Transaction({
      amount: 100,
      orderId: "order-123",
    });

    expect(transaction.amount).toEqual(100);
    expect(transaction.orderId).toEqual("order-123");
    expect(transaction.status).toEqual("PENDING");
  });

  it("should throw an error if amount is less than or equal to 0", () => {
    expect(() => {
      new Transaction({
        amount: 0,
        orderId: "order-123",
      });
    }).toThrow("Amount must be greater than 0");

    expect(() => {
      new Transaction({
        amount: -100,
        orderId: "order-123",
      });
    }).toThrow("Amount must be greater than 0");
  });

  it("should approve the transaction if amount is greater than or equal to 100", () => {
    const transaction = new Transaction({
      amount: 100,
      orderId: "order-123",
    });

    transaction.process();

    expect(transaction.status).toEqual("APPROVED");
  });

  it("should decline the transaction if amount is less than 100", () => {
    const transaction = new Transaction({
      amount: 50,
      orderId: "order-123",
    });

    transaction.process();

    expect(transaction.status).toEqual("DECLINED");
  });

  it("should be able to manually approve the transaction", () => {
    const transaction = new Transaction({
      amount: 100,
      orderId: "order-123",
    });

    transaction.approve();

    expect(transaction.status).toEqual("APPROVED");
  });

  it("should be able to manually decline the transaction", () => {
    const transaction = new Transaction({
      amount: 100,
      orderId: "order-123",
    });

    transaction.decline();

    expect(transaction.status).toEqual("DECLINED");
  });
});